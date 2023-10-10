const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')
const { messageConfig } = require('./messageConfig')

class User {
	constructor(id, lastMessageTimeStamp) {
		this.id = id
		this.lastMessageTimeStamp = lastMessageTimeStamp
	}
}

const users = []

bot.on(Events.MessageCreate, async (msg) => {
	const userIndex = users.findIndex((user) => user.id === msg.author.id)
	if (userIndex === -1) {
		users.push(new User(msg.author.id, msg.createdTimestamp))
		return
	}

	const newMessageTimeStamp = msg.createdTimestamp
	const lastMessageTimeStamp = users[userIndex].lastMessageTimeStamp
	const timeDiff = newMessageTimeStamp - lastMessageTimeStamp
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	const giveRewards = timeDiffMinutes >= messageConfig.spamProtectionInMinutes
	if (!giveRewards) return

	users[userIndex].lastMessageTimeStamp = msg.createdTimestamp
	const guild = await bot.guilds.fetch(msg.guildId)
	const guildMember = await guild.members.fetch(msg.author.id)

	const existingPoints = await pointsApi.getPoints(guildMember.user.id)
	if (existingPoints === null) {
		await pointsApi.postPoints(guildMember, messageConfig.msgReward)
	} else {
		const updatedPoints = existingPoints + messageConfig.msgReward
		await pointsApi.updatePoints(guildMember, updatedPoints)
	}
})
