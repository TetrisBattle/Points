require('dotenv').config()
require('./listeners')

const { client } = require('./client')

client.login(process.env.DISCORD_TOKEN)
