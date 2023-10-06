const { Client, IntentsBitField } = require('discord.js')

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
})

client.on('ready', () => {
	console.log(`✅ ${client.user.username} is online!`)
})

exports.client = client
