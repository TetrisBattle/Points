require('dotenv').config()
require('./slashCommands')
require('./messageHandler')

const { client } = require('./client')
client.login(process.env.DISCORD_TOKEN)
