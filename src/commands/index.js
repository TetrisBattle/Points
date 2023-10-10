require('dotenv').config()
const { REST, Routes } = require('discord.js')
const { client } = require('../client')
const { commands } = require('./slash')

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
const commandsBody = [
	commands.add.command,
	commands.give.command,
	commands.points.command,
	commands.subtract.command,
]

console.log('Registering commands...')
rest.put(
	Routes.applicationGuildCommands(
		process.env.CLIENT_ID,
		process.env.GUILD_ID
	),
	{ body: commandsBody }
)
	.then(() => {
		console.log('Commands registered!')
	})
	.catch((error) => {
		console.error(error)
	})

client.on('interactionCreate', (interaction) => {
	if (!interaction.isChatInputCommand()) return

	switch (interaction.commandName) {
		case 'add': {
			commands.add.function(interaction)
			break
		}
		case 'give': {
			commands.give.function(interaction)
			break
		}
		case 'points': {
			commands.points.function(interaction)
			break
		}
		case 'subtract': {
			commands.subtract.function(interaction)
			break
		}
	}
})
