const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

const subtractCommand = new SlashCommandBuilder()
	.setName('subtract')
	.setDescription('Subtract points from user')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addUserOption((option) =>
		option
			.setName('user')
			.setDescription('The user to subtract points from')
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName('points')
			.setDescription('The amount of points to subtract')
			.setRequired(true)
	)

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
