const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;

let dX = 4;
let dY = -4;

const ballRadius = 10;

let paddleWidth = 85;
const paddleHeight = 12;
let paddleXposition = (canvas.width - paddleWidth) / 2;
const paddleYposition = canvas.height - paddleHeight;
let rightPress = false;
let leftPress = false;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#4f90f7';
  ctx.fill();
  // ctx.strokeStyle = 'rgba(0, 0, 255, 0.5)';
  // ctx.stroke();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleXposition, paddleYposition, paddleWidth, paddleHeight);
  ctx.fillStyle = 'black';
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function keyDownHandler(e) {
  if (e.key === 'right' || e.key === 'ArrowRight') {
    rightPress = true;
  }

  if (e.key === 'left' || e.key === 'ArrowLeft') {
    leftPress = true;
  }
}

function keyUpHandler(e) {
  if (e.key === 'right' || e.key === 'ArrowRight') {
    rightPress = false;
  }

  if (e.key === 'left' || e.key === 'ArrowLeft') {
    leftPress = false;
  }
}

function gameOver() {
  document.location.reload();
}

function draw() {
  // drawing code
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();

  x += dX;
  y += dY;

  if (x + dX > canvas.width - ballRadius || x + dX < ballRadius) {
    dX = -dX;
  }

  if (y + dY < ballRadius) {
    dY = -dY;
  } else if (y + dY > canvas.height - ballRadius * 2) {
    if (x > paddleXposition && x < paddleXposition + paddleWidth) {
      dY = -dY;
      paddleWidth -= 10;
      if (y > paddleYposition && y < paddleYposition + paddleHeight) {
        dX = -dX / dY;
      }
    } else if (y + dY > canvas.height) {
      gameOver();
    }
  }

  if (rightPress) {
    paddleXposition += 10;
    if (paddleXposition + paddleWidth > canvas.width) {
      paddleXposition = canvas.width - paddleWidth;
    }
  }

  if (leftPress) {
    paddleXposition -= 10;
    if (paddleXposition < 0) paddleXposition = 0;
  }
  requestAnimationFrame(draw);
}

// intervalId = setInterval(draw, 5);
draw();

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
