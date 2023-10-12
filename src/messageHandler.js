const { Events } = require('discord.js')
const { bot } = require('./bot')
const { pointsApi } = require('./database/pointsApi')

const messageReward = 5
const messageSpamProtectionDelay = 5
const messageTracker = []

const reactionReward = 10
const reactionSpamProtectionDelay = 5
const reactionTracker = []

bot.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return

	const userIndex = messageTracker.findIndex(
		(user) => user.id === message.author.id
	)
	const isNewUser = userIndex === -1

	if (
		!isNewUser &&
		isSpam(
			messageTracker[userIndex].prevMsgTime,
			messageSpamProtectionDelay
		)
	) {
		return
	}

	track(messageTracker, userIndex, message)
	await giveReward(message, message.author.id, messageReward)
})

bot.on(Events.MessageReactionAdd, async (reaction, user) => {
	const { message } = reaction
	if (message.author.bot) return

	const userIndex = reactionTracker.findIndex(
		(user) => user.id === message.author.id
	)
	const isNewUser = userIndex === -1

	if (
		!isNewUser &&
		isSpam(
			reactionTracker[userIndex].prevMsgTime,
			reactionSpamProtectionDelay
		)
	) {
		return
	}

	track(reactionTracker, userIndex, message)
	await giveReward(message, user.id, reactionReward)
})

function track(tracker, userIndex, message) {
	if (userIndex === -1) {
		tracker.push({
			id: message.author.id,
			prevMsgTime: Date.now(),
		})
	} else tracker[userIndex].prevMsgTime = Date.now()
}

const isSpam = (prevTime, spamProtectionDelay) => {
	const defaultSpamProtectionTime = 5
	const timeDiff = Date.now() - prevTime
	const timeDiffMinutes = Math.abs(timeDiff / 1000 / 60)
	return timeDiffMinutes < (spamProtectionDelay ?? defaultSpamProtectionTime)
}

async function giveReward(message, userId, reward) {
	const guild = await bot.guilds.fetch(message.guildId)
	const guildMember = await guild.members.fetch(userId)
	await pointsApi.addPoints(guildMember, reward)
}
