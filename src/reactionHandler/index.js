const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')

const reactionConfig = {
	reward: 1,
	spamProtectionInMinutes: 5,
}

const users = []

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
	if (reaction.message.author.bot) return
	const userIndex = users.findIndex(
		(user) => user.id === reaction.message.author.id
	)
	if (!isSpam(userIndex, reaction)) return
	await giveReward(userIndex, reaction, user)
})

function isSpam(userIndex) {
	if (userIndex === -1) return false

	const timeDiff = Date.now() - users[userIndex].lastMessageTimeStamp
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	return timeDiffMinutes < reactionConfig.spamProtectionInMinutes
		? true
		: false
}

async function giveReward(userIndex, reaction, user) {
	if (userIndex === -1) {
		users.push({
			id: reaction.message.author.id,
			lastMessageTimeStamp: Date.now(),
		})
	} else users[userIndex].lastMessageTimeStamp = Date.now()

	const guild = await bot.guilds.fetch(reaction.message.guildId)
	const guildMember = await guild.members.fetch(user.id)
	await pointsApi.addPoints(guildMember, reactionConfig.reward)
}
