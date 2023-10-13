const { SlashCommandBuilder } = require('discord.js')
const { pointsApi } = require('../../database/pointsApi')
const { getName } = require('../../utils')

const dailyReward = 50

const dailyCommand = new SlashCommandBuilder()
	.setName('daily')
	.setDescription('Get daily points')

const dailyFunction = async (interaction) => {
	const points = await pointsApi.addPoints(interaction, dailyReward)
	const name = getName(interaction)
	interaction.reply(
		`${name} has claimed daily reward. ${name} has ${points} points`
	)
}

const daily = {
	command: dailyCommand,
	function: dailyFunction,
}

exports.daily = daily
