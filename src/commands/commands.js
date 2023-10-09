require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js')
const { client } = require('../client')
const { pointsApi } = require('../database/pointsApi')

const commands = [
	{
		name: 'points',
		description: 'Check the balance of given user',
		options: [
			{
				name: 'user',
				description: 'The user to check the balance of',
				type: ApplicationCommandOptionType.User,
			},
		],
	},
	{
		name: 'add',
		description: 'Add points to user',
		options: [
			{
				name: 'user',
				description: 'The user to check the balance of',
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
	},
]

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return

	switch (interaction.commandName) {
		case 'points': {
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
			break
		}
		case 'add': {
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
					`Transaction complete!\n${name} has ${newPoints} points`
				)
			})
			break
		}
	}
})

exports.commands = commands
