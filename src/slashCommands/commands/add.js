const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

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

const addFunction = async (interaction) => {
	const addPoints = async (guildMember, newPoints) => {
		const existingPoints = await pointsApi.getPoints(guildMember.user.id)

		if (existingPoints === null) {
			await pointsApi.postPoints(guildMember, newPoints)
			return newPoints
		} else {
			const updatedPoints = existingPoints + newPoints
			await pointsApi.updatePoints(guildMember, updatedPoints)
			return updatedPoints
		}
	}

	const guildMember = interaction.options.getMember('user')
	const newPoints = interaction.options.getInteger('points')

	const points = await addPoints(guildMember, newPoints)
	const name = getName(guildMember)
	interaction.reply(`${name} has ${points} points`)
}

const add = {
	command: addCommand,
	function: addFunction,
}

exports.add = add
