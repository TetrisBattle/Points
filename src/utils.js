const getName = (guildMember) => {
	return (
		guildMember.nickname ??
		guildMember.user.globalName ??
		guildMember.user.username
	)
}

exports.getName = getName
