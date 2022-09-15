const express = require('express');
const path = require('path')
const app = express();
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
app.use(express.static(path.join(__dirname, "..", "frontend")))

const gameState = require('./gameState.js')

server.listen(3000, () => {
    console.log("listening on 3000")
})

let decideInterval = true;

io.on('connection', (socket) => {

    gameState.createNewSnake(socket.id)

    if (decideInterval) {
        startGameInterval()
        decideInterval = false
    }
    socket.on('direction', (snakeDirection) => {
        gameState.updateSnakeDirection(snakeDirection)
    })
    //den här är skakig men funkar?
    socket.on('disconnect', (client) => {

        gameState.handleDisconnect(client)
    })

})

function startGameInterval() {

    const intervalId = setInterval(() => {

        gameState.updateSnakes();
        io.emit("snakeUpdate", gameState.getSnakes())

    }, 1000)
}
