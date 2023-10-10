const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')

const reactionConfig = {
	reactionReward: 1,
	spamProtectionInMinutes: 5,
}

const users = []

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
	if (message.author.bot) return

	const userIndex = users.findIndex((user) => user.id === reaction.message.author.id)
	if (userIndex === -1) {
		users.push({
			id: reaction.message.author.id,
			lastMessageTimeStamp: reaction.message.createdTimestamp,
		})
		return
	}

	const timeDiff =
		reaction.message.createdTimestamp - users[userIndex].lastMessageTimeStamp
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	if (timeDiffMinutes < reactionConfig.spamProtectionInMinutes) return

	users[userIndex].lastMessageTimeStamp = reaction.message.createdTimestamp
	const guild = await bot.guilds.fetch(reaction.message.guildId)
	const guildMember = await guild.members.fetch(user.id)
	await pointsApi.addPoints(guildMember, reactionConfig.reactionReward)
})
