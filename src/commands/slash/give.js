const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')

const giveCommand = {
	name: 'give',
	description: 'Give points to user',
	options: [
		{
			name: 'user',
			description: 'The user to check the balance of',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'points',
			description: 'The amount of points to give',
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
	],
}

const giveFunction = async (interaction) => {
	const guildMember = interaction.options.getMember('user')
	const points = interaction.options.getInteger('points')
	const giversPoints = await pointsApi.getPoints(interaction.user.id)
	const receiversPoints = await pointsApi.getPoints(guildMember.user.id)

	if (giversPoints === null || giversPoints < points) {
		interaction.reply(
			`You don't have enought points\nCurrent balance is ${
				giversPoints ?? 0
			} points`
		)
	}

	const updatedGiversPoints = giversPoints - points
	const updatedReceiversPoints = receiversPoints + points
	await pointsApi.updatePoints(interaction, updatedGiversPoints)
	await pointsApi.updatePoints(guildMember, updatedReceiversPoints)
	interaction.reply('Transaction complete!')
}

const give = {
	command: giveCommand,
	function: giveFunction,
}

exports.give = give
