const socket = io()
const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

const canvas = document.getElementById("canvas")
canvas.width = WINDOW_WIDTH
canvas.height = WINDOW_HEIGHT
const context = canvas.getContext("2d")
socket.emit("new player")

socket.on("state", (players) => {
	context.beginPath()
	context.fillStyle = "black"
	context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT)
	context.closePath()
	for (const id in players) {
		const player = players[id]
		drawPlayer(context, player)
	}
})
