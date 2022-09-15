const Snake = require('./Snake.js');

let allSnakes = []
let allTakenPositions = []

function createNewSnake(socketid) {

    let newSnake = new Snake(60, 20, [{ x: 20, y: 20 }, { x: 40, y: 20 }, { x: 60, y: 20 }], socketid)
    allSnakes.push(newSnake)

}

function updateSnakes() {


    allSnakes.forEach((snake) => {

        let lastBlock = snake.body.length - 1;  

        let snakeBody = snake.body[lastBlock]

        snake.checkCollision(allTakenPositions);

        snake.updatePosition();


        allTakenPositions.push({ x: snakeBody.x, y: snakeBody.y })

    })

}

function updateSnakeDirection(snakeDirection) {

    allSnakes.forEach((snake) => {
        snake.handleDirection(snakeDirection)
    })
}

function getSnakes() {
    return allSnakes;
}

function handleDisconnect(clientID) {

    index = allSnakes.map((snake) => {
        return snake.id
    }).indexOf(clientID)

    allSnakes.splice(index, 1)
}

module.exports = {

    createNewSnake,

    updateSnakes,
    updateSnakeDirection,
    getSnakes,
    handleDisconnect

}