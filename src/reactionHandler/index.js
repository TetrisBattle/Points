const { Events } = require('discord.js')
const { bot } = require('../bot')
const { pointsApi } = require('../database/pointsApi')

const reactionConfig = {
	reactionReward: 1,
}

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
	const guild = await bot.guilds.fetch(reaction.message.guildId)
	const guildMember = await guild.members.fetch(user.id)

	const existingPoints = await pointsApi.getPoints(guildMember.user.id)
	if (existingPoints === null) {
		await pointsApi.postPoints(guildMember, reactionConfig.reactionReward)
	} else {
		const updatedPoints = existingPoints + reactionConfig.reactionReward
		await pointsApi.updatePoints(guildMember, updatedPoints)
	}
})
