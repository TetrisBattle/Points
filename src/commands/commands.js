require('dotenv').config()
const { ApplicationCommandOptionType } = require('discord.js')
const { client } = require('../client')

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'points',
		description: 'Check the balance of given user',
		options: [
			{
				name: 'user',
				description: "The user to check the balance of",
				type: ApplicationCommandOptionType.User,
			},
		],
	},
]

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return

	switch (interaction.commandName) {
		case 'ping': {
			interaction.reply('Pong!')
			break
		}
		case 'points': {
			const user = interaction.options.getMember('user')
			if (!user) interaction.reply(`${interaction.user.globalName} has 0 points`)
			else interaction.reply(`${user.user.globalName} has 0 points`)
			break
		}
	}
})

exports.commands = commands
