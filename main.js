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

//contructor snake
function addSnake(x,y){
    this.x = x;
    this.y = y
}

arr[snake[snake.length - 1].y][snake[snake.length - 1].x] = 'active';

let snakeMove = 'right'

foodRespawn()

let refresh = setInterval(() => {

    move()

    if(ateFood()){
        foodRespawn()
    }

    refreshGameScreen()

}, 200)


//Snake move
function move() {
    if (snake[snake.length - 1].x >= 20 || snake[snake.length - 1].x < 0 ||
        snake[snake.length - 1].y >= 20 || snake[snake.length - 1].y < 0) {
        gameOver()
        return
    }
    
    updateSnake()

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
    
    updateArr()
}

//Update snake X Y
function updateSnake(){
    for (let i = 0 ; i < snake.length ; i++) {
        if (i + 1 < snake.length) {
            snake[i] = {... snake[i+1]}
        }
    }
}

//Update arr
function updateArr(){
    for(let y in arr){
        for(let x in arr[y]){
            for(let s of snake){
                if(y==s.y && x==s.x){
                    arr[y][x]='active'
                    break
                }
                else if(arr[y][x]=='food'){}
                else{
                    arr[y][x]=''
                }
            }
        }
    }
}

// Check if the snake has eaten food
function ateFood(){
    if(snake[snake.length-1].x==foodX && snake[snake.length-1].y==foodY){
        snake.unshift(new addSnake(snake[0].x,snake[0].y))
        return true
    }
    return false
}

// Food respawn
function foodRespawn(){
    foodX = Math.floor(Math.random() * 20);
    foodY = Math.floor(Math.random()*20);

    arr[foodY][foodX] = 'food';
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

//game over
function gameOver() {
    clearInterval(refresh)
    alert("game over")
}