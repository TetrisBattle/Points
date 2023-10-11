const { SlashCommandBuilder } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')

const giveCommand = new SlashCommandBuilder()
	.setName('give')
	.setDescription('Give points to user')
	.addUserOption((option) =>
		option
			.setName('user')
			.setDescription('The user to give points to')
			.setRequired(true)
	)
	.addIntegerOption((option) =>
		option
			.setName('points')
			.setDescription('The amount of points to give')
			.setRequired(true)
	)

const giveFunction = async (interaction) => {
	const guildMember = interaction.options.getMember('user')
	const points = interaction.options.getInteger('points')
	const giversPoints = await pointsApi.getPoints(interaction.user.id)
	const receiversPoints = await pointsApi.getPoints(guildMember.user.id)

	if (giversPoints === null || giversPoints < points) {
		interaction.reply(
			`You don't have enought points\nYour current balance is ${
				giversPoints ?? 0
			} points`
		)
	}

	const updatedGiversPoints = giversPoints - points
	const updatedReceiversPoints = receiversPoints + points
	await pointsApi.subtractPoints(interaction, updatedGiversPoints)
	await pointsApi.addPoints(guildMember, updatedReceiversPoints)
	interaction.reply('Transaction complete!')
}

const give = {
	command: giveCommand,
	function: giveFunction,
}

exports.give = give
