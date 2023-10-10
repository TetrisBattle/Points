require('dotenv').config()
require('./slashCommands')

const { client } = require('./client')
client.login(process.env.DISCORD_TOKEN)
