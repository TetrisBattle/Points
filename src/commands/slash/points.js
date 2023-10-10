const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

const pointsCommand = {
	name: 'points',
	description: 'Check the balance of given user',
	options: [
		{
			name: 'user',
			description: 'The user to check the balance of',
			type: ApplicationCommandOptionType.User,
		},
	],
}

const pointsFunction = async (interaction) => {
	const guildMember = interaction.options.getMember('user')

	if (guildMember) {
		const points = await pointsApi.getPoints(guildMember.user.id)
		const name = getName(guildMember)
		interaction.reply(`${name} has ${points ?? 0} points`)
	} else {
		const points = await pointsApi.getPoints(interaction.user.id)
		const name = getName(interaction)
		interaction.reply(`${name} has ${points ?? 0} points`)
	}
}

const points = {
	command: pointsCommand,
	function: pointsFunction,
}

exports.points = points
