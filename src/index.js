require('dotenv').config()
require('./slashCommands')
require('./messageHandler')

const { bot } = require('./bot')
bot.login(process.env.DISCORD_TOKEN)
