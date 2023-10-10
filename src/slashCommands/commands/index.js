const { add } = require('./add')
const { give } = require('./give')
const { points } = require('./points')
const { subtract } = require('./subtract')

const commands = { add, give, points, subtract }

exports.commands = commands
