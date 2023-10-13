const { add } = require('./add')
const { daily } = require('./daily')
const { give } = require('./give')
const { points } = require('./points')
const { subtract } = require('./subtract')

const commands = { add, daily, give, points, subtract }

exports.commands = commands
