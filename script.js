var game = document.getElementById('game');
var ctx = game.getContext('2d');
var food_y, food_x;

function spawnFood() {
    food_y = rand(0, 24) * 20;
    food_x = rand(0, 24) * 20;
    ctx.fillStyle = '#8f1b57';
    ctx.fillRect(food_y, food_x, 20, 20);
}

class Snake {
    constructor() {
        this.y = rand(0, 24) * 20;
        this.x = rand(0, 24) * 20;
        this.x_speed = 0;
        this.y_speed = 0;
    }

    move() {
        this.y += this.y_speed;
        this.x += this.x_speed;

        if (this.y < 0) this.y = 480;
        if (this.x < 0) this.x = 480;
        if (this.y > 480) this.y = 0;
        if (this.x > 480) this.x = 0;

        this.draw()
    }

    draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(this.y, this.x, 20, 20);
    }

    changeDirection(y, x) {
        this.x_speed = x;
        this.y_speed = y;
    }

    eat() {
        if (this.x == food_x && this.y == food_y)
            spawnFood();
    }
}

var snake = new Snake();
spawnFood();

setInterval(() => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);

    ctx.fillStyle = '#8f1b57';
    ctx.fillRect(food_y, food_x, 20, 20);

    snake.move();
    snake.eat();
}, 100);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener('keydown', (event) => {
    if (event.key == 'w') snake.changeDirection(0, -20)
    if (event.key == 'a') snake.changeDirection(-20, 0)
    if (event.key == 's') snake.changeDirection(0, 20)
    if (event.key == 'd') snake.changeDirection(20, 0)
})