//Array 20x20
let arr = new Array(20).fill('');
for (let i in arr) {
    arr[i] = new Array(20).fill('');
}

//Snake property
let snake = [
    {
        x: 7,
        y: 9
    },
    {
        x: 8,
        y: 9
    },
    {
        x: 9,
        y: 9
    }
]

arr[snake[snake.length - 1].y][snake[snake.length - 1].x] = 'active';

let snakeMove = 'right'


let refresh = setInterval(() => {

    move()

    refreshGameScreen()

}, 150)


//Snake move
function move() {
    if (snake[snake.length - 1].x == 20 || snake[snake.length - 1].x < 0 ||
        snake[snake.length - 1].y == 20 || snake[snake.length - 1].y < 0) {
        gameOver()
        return
    }
    arr[snake[0].y][snake[0].x] = ''
    
    for (let i = 0 ; i < snake.length ; i++) {
        arr[snake[i].y][snake[i].x] = '';
        console.log(arr[snake[i].y][snake[i].x])

        if (i + 1 < snake.length) {
            snake[i] = snake[i + 1]
        }

        arr[snake[i].y][snake[i].x] = 'active';
    }

    switch (snakeMove) {
        case 'right': {
            snake[snake.length - 1].x++
            break
        }
        case 'left': {
            snake[snake.length - 1].x--
            break
        }
        case 'up': {
            snake[snake.length - 1].y--
            break
        }
        case 'down': {
            snake[snake.length - 1].y++
            break
        }
    }
    arr[snake[snake.length - 1].y][snake[snake.length - 1].x] = 'active';
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
    if (event.key == 'w' || event.key == 'W') {
        snakeMove = 'up'
    }
    if (event.key == 'd' || event.key == 'D') {
        snakeMove = 'right'
    }
    if (event.key == 's' || event.key == 'S') {
        snakeMove = 'down'
    }
    if (event.key == 'a' || event.key == 'A') {
        snakeMove = 'left'
    }
})


function gameOver() {
    clearInterval(refresh)
    alert("game over")
}