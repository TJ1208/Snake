var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var showRetry = false;
var grid = 10;
var count = 0;
var highscore = localStorage.getItem("highscore");

var snake = {
    x: 160,
    y: 160,

    // snake velocity. moves one grid length every frame in either the x or y direction
    dx: grid,
    dy: 0,

    // keep track of all grids the snake body occupies
    cells: [],

    // length of the snake. grows when eating an apple
    maxCells: 4
};
var apple = {
    x: 320,
    y: 320
};

// get random whole numbers in a specific range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
    requestAnimationFrame(() => {
        if (showRetry) {
            snake.x = 160;
            snake.y = 160;
            return;
        } else {
            loop()
        }
    });
    while (!showRetry) {
        document.getElementById("score").innerText = "Score: " + snake.maxCells;
        if (highscore != null) {
            document.getElementById("highscore").innerText = "High Score: " + localStorage.getItem("highscore");
        } else {
            document.getElementById("highscore").innerText = "High Score: " + 4;
        }
        // slow game loop to 15 fps instead of 60 (60/15 = 4)
        if (++count < 4) {
            return;
        }

        count = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        // move snake by it's velocity
        snake.x += snake.dx;
        snake.y += snake.dy;

        // displays reset when border is hit
        if ((snake.x < 0 || snake.y < 0) || (snake.x >= canvas.width || snake.y >= canvas.height)) {
            displayRetry();
        }

        // keep track of where snake has been. front of the array is always the head
        snake.cells.unshift({ x: snake.x, y: snake.y });

        // remove cells as we move away from them
        if (snake.cells.length > snake.maxCells) {
            snake.cells.pop();
        }

        // draw apple
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

        // draw snake one cell at a time
        context.fillStyle = 'green';
        snake.cells.forEach(function (cell, index) {

            // drawing 1 px smaller than the grid creates a grid effect in the snake body so you can see how long it is
            context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

            // snake ate apple
            if (cell.x === apple.x && cell.y === apple.y) {
                snake.maxCells++;

                // canvas is 400x400 which is 25x25 grids 
                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }

            // check collision with all cells after this one (modified bubble sort)
            for (var i = index + 1; i < snake.cells.length; i++) {

                // snake occupies same space as a body part. reset game
                if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                    displayRetry();
                }
            }
        });
    }
}

function displayRetry() {
    if (highscore == null) {
        highscore = snake.maxCells;
    }
    if (snake.maxCells >= highscore) {
        highscore = snake.maxCells;
        localStorage.setItem("highscore", highscore);
        document.getElementById("highscore").innerText = "High Score: " + localStorage.getItem("highscore");
    }
    // creates retry title
    let newH1 = document.createElement("h1")
    newH1.setAttribute("id", "retry-h1");
    let h1Content = document.createTextNode("You Lost");
    newH1.appendChild(h1Content);
    document.body.appendChild(newH1);
    // creates retry button
    let newBtn = document.createElement("button")
    newBtn.setAttribute("class", "btn btn-light");
    newBtn.setAttribute("id", "retry-btn")
    newBtn.setAttribute("onclick", "restart()");
    let btnContent = document.createTextNode("Retry");
    newBtn.appendChild(btnContent);
    document.body.appendChild(newBtn);
    showRetry = true;

}

function restart() {
    document.getElementById("retry-h1").remove();
    document.getElementById("retry-btn").remove();
    requestAnimationFrame(loop);
    showRetry = false;
    // Resets snake position
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 4;
    snake.dx = grid;
    snake.dy = 0;

    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
}

// listen to keyboard events to move the snake
document.addEventListener('keydown', function (e) {
    // prevent snake from backtracking on itself by checking that it's 
    // not already moving on the same axis (pressing left while moving
    // left won't do anything, and pressing right while moving left
    // shouldn't let you collide with your own body)

    // left arrow key
    if ((e.which === 37 || e.which === 65) && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // up arrow key
    else if ((e.which === 38 || e.which === 87) && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
    // right arrow key
    else if ((e.which === 39 || e.which === 68) && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // down arrow key
    else if ((e.which === 40 || e.which === 83) && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
    else if (e.which == 32 && showRetry) {
        restart();
    }
});

// start the game
requestAnimationFrame(loop);

