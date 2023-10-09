const { db } = require('./database')

const getUsers = async () => {
	const { data, error } = await db.from('users').select('*')
	if (error) console.error('error', error)
	return data
}

const getUser = async (userId) => {
	const { data, error } = await db.from('users').select('*').eq('id', userId)
	if (error) console.error('error', error)
	return data.length ? data[0] : null
}

const deleteUser = async (userId) => {
	const { error } = await db.from('users').delete().eq('id', userId)
	if (error) console.error(error)
}

const usersApi = {
	getUsers,
	getUser,
	deleteUser,
}

exports.usersApi = usersApi
