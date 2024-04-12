let arr = new Array(20).fill('');
for (let i in arr) {
    arr[i] = new Array(20).fill('');
}

arr[9][9] = 'active';

let snakeMove = 'right'

setInterval(() => {

    let html = ``
    for (let i in arr) {
        for (let j in arr[i]) {
            let box = arr[i][j];
            html += `<span class="box ${box}" data-X="${i}" data-Y="${j}"></span>`
        }
    }

    document.querySelector("#gameScreen").innerHTML = html
}, 200)



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