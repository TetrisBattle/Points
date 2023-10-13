require('dotenv').config()
const { REST, Routes, Events } = require('discord.js')
const { bot } = require('../bot')
const { commands } = require('./commands')

const commandsBody = [
	commands.add.command,
	commands.daily.command,
	commands.give.command,
	commands.points.command,
	commands.subtract.command,
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)
rest.put(
	Routes.applicationGuildCommands(
		process.env.CLIENT_ID,
		process.env.GUILD_ID
	),
	{ body: commandsBody }
).catch((error) => {
	console.error(error)
})

bot.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()) return

	switch (interaction.commandName) {
		case 'add': {
			commands.add.function(interaction)
			break
		}
		case 'daily': {
			commands.daily.function(interaction)
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
