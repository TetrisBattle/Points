const { db } = require('./database')

const getPoints = async (userId) => {
	const { data, error } = await db
		.from('users')
		.select('points')
		.eq('id', userId)
	if (error) {
		console.error(error)
		return null
	} else {
		return data.length ? data[0].points : null
	}
}

const postPoints = async (guildMember, points) => {
	const { error } = await db.from('users').insert({
		id: guildMember.user.id,
		globalName: guildMember.user.globalName,
		nickName: guildMember.nickName,
		points: points,
	})
	if (error) console.error(error)
}

const updatePoints = async (guildMember, points) => {
	const { error } = await db
		.from('users')
		.update({
			globalName: guildMember.user.globalName,
			nickName: guildMember.nickName,
			points: points,
		})
		.eq('id', guildMember.user.id)
	if (error) console.error(error)
}

const addPoints = async (guildMember, newPoints) => {
	const existingPoints = await getPoints(guildMember.user.id)

	if (existingPoints === null) {
		await postPoints(guildMember, newPoints)
		return newPoints
	} else {
		const updatedPoints = existingPoints + newPoints
		await updatePoints(guildMember, updatedPoints)
		return updatedPoints
	}
}

const subtractPoints = async (guildMember, newPoints) => {
	const existingPoints = await pointsApi.getPoints(guildMember.user.id)

	if (existingPoints === null) {
		await pointsApi.postPoints(guildMember, newPoints * -1)
		return newPoints
	} else {
		const updatedPoints = existingPoints - newPoints
		await pointsApi.updatePoints(guildMember, updatedPoints)
		return updatedPoints
	}
}

const pointsApi = {
	getPoints,
	// postPoints,
	// updatePoints,
	addPoints,
	subtractPoints,
}

exports.pointsApi = pointsApi
