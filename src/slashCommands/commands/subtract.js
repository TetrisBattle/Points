const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

const subtractCommand = {
	name: 'subtract',
	description: 'Subtract points from user',
	options: [
		{
			name: 'user',
			description: 'The user to subtract points from',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'points',
			description: 'The amount of points to subtract',
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
	],
}

const subtractFunction = async (interaction) => {
	const guildMember = interaction.options.getMember('user')
	const newPoints = interaction.options.getInteger('points')

	const points = await pointsApi.subtractPoints(guildMember, newPoints)
	const name = getName(guildMember)
	interaction.reply(`${name} has ${points} points`)
}

const subtract = {
	command: subtractCommand,
	function: subtractFunction,
}

exports.subtract = subtract
