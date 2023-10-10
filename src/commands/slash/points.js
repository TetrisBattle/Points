const { ApplicationCommandOptionType } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')

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

const pointsFunction = (interaction) => {
	const guildMember = interaction.options.getMember('user')

	if (guildMember) {
		pointsApi.getPoints(guildMember.user.id).then((points) => {
			const name =
				guildMember.nickname ?? guildMember.user.globalName
			interaction.reply(`${name} has ${points ?? 0} points`)
		})
	} else {
		pointsApi.getPoints(interaction.user.id).then((points) => {
			const name =
				interaction.nickname ?? interaction.user.globalName
			interaction.reply(`${name} has ${points ?? 0} points`)
		})
	}
}

const points = {
	command: pointsCommand,
	function: pointsFunction,
}

exports.points = points
