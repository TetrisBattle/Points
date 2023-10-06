const { client } = require('./client')

client.on('messageCreate', (msg) => {
	console.log(msg.content)
	if (msg.content === 'ping') {
		msg.reply('Pong!')
	}
})
