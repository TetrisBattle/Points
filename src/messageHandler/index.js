const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')

const messageConfig = {
	reward: 1,
	spamProtectionInMinutes: 15,
}

const users = []

bot.on(Events.MessageCreate, async (msg) => {
	if (msg.author.bot) return

	const userIndex = users.findIndex((user) => user.id === msg.author.id)
	if (userIndex === -1) {
		users.push({
			id: msg.author.id,
			lastMessageTimeStamp: msg.createdTimestamp,
		})
		return
	}

	const timeDiff =
		msg.createdTimestamp - users[userIndex].lastMessageTimeStamp
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	if (timeDiffMinutes < messageConfig.spamProtectionInMinutes) return

	users[userIndex].lastMessageTimeStamp = msg.createdTimestamp
	const guild = await bot.guilds.fetch(msg.guildId)
	const guildMember = await guild.members.fetch(msg.author.id)
	await pointsApi.addPoints(guildMember, messageConfig.reward)
})
