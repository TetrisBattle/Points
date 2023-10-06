require('dotenv').config()
require('./commands')

const { client } = require('./client')
client.login(process.env.DISCORD_TOKEN)
