const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')

const messageConfig = {
	reward: 1,
	spamProtectionInMinutes: 15,
}

const users = []

bot.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return
	const userIndex = users.findIndex((user) => user.id === message.author.id)
	if (isSpam(userIndex, message)) return
	await giveReward(userIndex, message)
})

function isSpam(userIndex) {
	if (userIndex === -1) return false

	const timeDiff = Date.now() - users[userIndex].lastMessageTimeStamp
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	return timeDiffMinutes < messageConfig.spamProtectionInMinutes
		? true
		: false
}

async function giveReward(userIndex, message) {
	if (userIndex === -1) {
		users.push({
			id: message.author.id,
			lastMessageTimeStamp: Date.now(),
		})
	} else users[userIndex].lastMessageTimeStamp = Date.now()

	const guild = await bot.guilds.fetch(message.guildId)
	const guildMember = await guild.members.fetch(message.author.id)
	await pointsApi.addPoints(guildMember, messageConfig.reward)
}
