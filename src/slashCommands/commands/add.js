const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

const addCommand = new SlashCommandBuilder()
	.setName('add')
	.setDescription('Add points to user')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
	.addUserOption((option) =>
		option
			.setName('user')
			.setDescription('The user to add points to')
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName('points')
			.setDescription('The amount of points to add')
			.setRequired(true)
	)

const addFunction = async (interaction) => {
	const guildMember = interaction.options.getMember('user')
	const newPoints = interaction.options.getInteger('points')

	const points = await pointsApi.addPoints(guildMember, newPoints)
	const name = getName(guildMember)
	interaction.reply(`${name} has ${points} points`)
}

const add = {
	command: addCommand,
	function: addFunction,
}

exports.add = add
