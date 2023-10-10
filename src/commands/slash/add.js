const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')

const addCommand = {
	name: 'add',
	description: 'Add points to user',
	options: [
		{
			name: 'user',
			description: 'The user to add points to',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'points',
			description: 'The amount of points to add',
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
	],
}

const addFunction = (interaction) => {
	const addPoints = async (guildMember, newPoints) => {
		const existingPoints = await pointsApi.getPoints(guildMember.user.id)

		if (existingPoints === null) {
			pointsApi.postPoints(guildMember, newPoints)
			return newPoints
		} else {
			const updatedPoints = existingPoints + newPoints
			pointsApi.updatePoints(guildMember, updatedPoints)
			return updatedPoints
		}
	}

	const guildMember = interaction.options.getMember('user')
	const newPoints = interaction.options.getInteger('points')

	addPoints(guildMember, newPoints).then((newPoints) => {
		const name = guildMember.nickname ?? guildMember.user.globalName
		interaction.reply(
			`${name} has ${newPoints} points`
		)
	})
}

const add = {
	command: addCommand,
	function: addFunction,
}

exports.add = add
