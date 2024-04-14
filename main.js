//Array 20x20
let arr = new Array(20).fill('');
for (let i in arr) {
    arr[i] = new Array(20).fill('');
}

//Snake property
let snake = [
    {
        x: 9,
        y: 9
    },
    {
        x: 8,
        y: 9
    },
    {
        x: 7,
        y: 9
    }
]

//Food property
let food = {
    x: Math.floor(Math.random() * 20),
    y: Math.floor(Math.random() * 20)
}

let emptyPlace = [{}]
updateArr()

//contructor snake
function addSnake(x, y) {
    this.x = x;
    this.y = y
}

arr[snake[0].y][snake[0].x] = 'body';

let snakeMove = 'right'

foodRespawn()

let refresh = setInterval(() => {

    if (move()) {

        if (ateFood()) {
            foodRespawn()
        }

        refreshGameScreen()
    }

}, 100)


//Snake move
function move() {

    updateSnake()

    switch (snakeMove) {
        case 'right': {
            snake[0].x++
            break
        }
        case 'left': {
            snake[0].x--
            break
        }
        case 'up': {
            snake[0].y--
            break
        }
        case 'down': {
            snake[0].y++
            break
        }
    }

    // If the snake hit the wall 
    if (snake[0].x >= 20 || snake[0].x < 0 ||
        snake[0].y >= 20 || snake[0].y < 0) {
        gameOver()
        return false
    }

    // If the snake has eaten itself
    if (snake.find((s, i) => { return i > 0 && s.x == snake[0].x && s.y == snake[0].y })) {
        gameOver()
        return false
    }

    updateArr()

    return true
}

//Update snake X Y
function updateSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        snake[i] = { ...snake[i - 1] }
    }
}

//Update arr
function updateArr() {
    for(let i in arr){
        arr[i].fill('')
    }

    arr[food.y][food.x] = 'food'

    for (s of snake) {
        arr[s.y][s.x] = 'body'
    }

    emptyPlace = []
    for (let y in arr) {
        for (let x in arr[y]) {
            if (arr[y][x] != 'body') {
                emptyPlace.push({ x: x, y: y })
            }
        }
    }

}

// If the snake has eaten food
function ateFood() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        snake.push(new addSnake(snake[snake.length - 1].x, snake[snake.length - 1].y))
        return true
    }
    return false
}

// Food respawn
function foodRespawn() {
    if (emptyPlace.length === 0) {
        alert("win")
        return
    }
    else {
        let randomIndex = Math.floor(Math.random() * emptyPlace.length)
        let randomPlace = emptyPlace[randomIndex]

        food = {
            x: randomPlace.x,
            y: randomPlace.y
        }
    }
}

// Refresh the game screen every 200 milliseconds
function refreshGameScreen() {
    let html = ``
    for (let i in arr) {
        for (let j in arr) {
            let box = arr[i][j];
            html += `<span class="box ${box}"></span>`
        }
    }

    document.querySelector("#gameScreen").innerHTML = html
}


// add event keypress
window.addEventListener('keypress', function (event) {
    if ((event.key == 'w' || event.key == 'W') && snakeMove != 'down') {
        snakeMove = 'up'
    }
    if ((event.key == 'd' || event.key == 'D') && snakeMove != 'left') {
        snakeMove = 'right'
    }
    if ((event.key == 's' || event.key == 'S') && snakeMove != 'up') {
        snakeMove = 'down'
    }
    if ((event.key == 'a' || event.key == 'A') && snakeMove != 'right') {
        snakeMove = 'left'
    }
})

//game over
function gameOver() {
    clearInterval(refresh)
    alert("game over")
}