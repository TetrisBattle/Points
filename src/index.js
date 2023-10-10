require('dotenv').config()
require('./slashCommands')
require('./messageHandler')
require('./reactionHandler')

const { bot } = require('./bot')
bot.login(process.env.DISCORD_TOKEN)
