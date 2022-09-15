
let socket = io();
let ctx = document.getElementById("gameScreen").getContext("2d")
ctx.fillStyle = "black"

let screenWidth = 1000
let screenHeight = 500;

let blockSize = 20;

let allTakenPositions = []

function drawSnake(snake) {

    snake.body.forEach((p) => {
        ctx.fillRect(p.x, p.y, blockSize - 1, blockSize - 1)
    })
}

socket.on("snakeUpdate", (snakeArr) => {

    ctx.clearRect(0, 0, screenWidth, screenHeight)

    snakeArr.forEach((snake) => {
        drawSnake(snake)
    })
})

window.addEventListener('keydown', (e) => {

    let directionObject = { direction: "x", clientID: socket.id }

    if (e.key == "ArrowRight") {
        directionObject.direction = "e"
        socket.emit("direction", directionObject)
    }
    if (e.key == "ArrowLeft") {
        directionObject.direction = "w"
        socket.emit("direction", directionObject)
    }
    if (e.key == "ArrowUp") {
        directionObject.direction = "n"
        socket.emit("direction", directionObject)
    }
    if (e.key == "ArrowDown") {
        directionObject.direction = "s"
        socket.emit("direction", directionObject)
    }
})

