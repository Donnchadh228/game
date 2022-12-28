require("dotenv").config()
const express = require("express")
const http = require("http")
const path = require("path")
const socketIO = require("socket.io")

const getPlayers = require("./players").getPlayers
const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.set("port", process.env.PORT)
app.use("/static", express.static(path.dirname(__dirname) + "/static"))

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"))
})

server.listen(process.env.PORT, () => {
	console.log(`work on port ${process.env.PORT}`)
})
let players = null
io.on("connection", (socket) => {
	players = getPlayers(socket)

	setTimeout(() => {
		console.log(players)
	}, 1000)
})
const gameLoop = (players, io) => {
	io.sockets.emit("state", players)
}

setInterval(() => {
	if (players && io) {
		gameLoop(players, io)
	}
}, 1000 / 60)
