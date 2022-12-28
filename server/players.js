const players = {}

class Player {
	constructor(props) {
		this._name = props.name
		this._id = props.id
		this._playerRadius = 30

		this.positionX = 300
		this.positionY = 300
	}
}

module.exports.getPlayers = (socket) => {
	socket.on("new player", () => {
		players[socket.id] = new Player({
			id: socket.id,
			name: Object.keys(players).length,
		})
	})
	socket.on("movement", (move) => {
		const player = players[socket.id] || {}

		if (move.left) {
			player.positionX -= 5
		}
		if (move.up) {
			player.positionY -= 5
		}
		if (move.right) {
			player.positionX += 5
		}
		if (move.top) {
			player.positionY += 5
		}
	})
	socket.on("disconnect", () => {
		delete players[socket.id]
	})
	return players
}
