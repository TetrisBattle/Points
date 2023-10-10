const { Client, IntentsBitField } = require('discord.js')

const bot = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildMessageReactions,
	],
})

bot.on('ready', () => {
	console.log(`✅ ${bot.user.username} bot is online!`)
})

exports.bot = bot
