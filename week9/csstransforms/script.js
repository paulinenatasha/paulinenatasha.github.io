// first let us fetch the ball that we want to interact

const ball = document.querySelector(".ball");
console.log(ball);
// ---------------------------------------------

// get access to the outer box
const outer = document.querySelector(".outer");
console.log(outer);

// translate or move logic, need button
const moveButton = document.querySelector("#move-button");
console.log(moveButton);
moveButton.addEventListener("click", moveBall);

let distanceMoved = 0;
function moveBall() {
  const outerWidth = outer.clientWidth / 2;
  const maxDistance = outerWidth - 50;
  if (distanceMoved < maxDistance) {
    distanceMoved += 10;
    distanceMoved = Math.min(distanceMoved, maxDistance);
  }
  updateBallTransform();
}

function updateBallTransform() {
  ball.style.transform = `translateX(${distanceMoved}px) rotate(${rotation}deg) scale(${scale})`;
}
// rotate
const rotateButton = document.querySelector("#rotate-button");
rotateButton.addEventListener("click", rotateBall);
let rotation = 0;
function rotateBall() {
  rotation += 45; // Increased rotation angle for more noticeable effect
  updateBallTransform();
}

// scale logic, need scale button
const scaleButton = document.querySelector("#scale-button");
scaleButton.addEventListener("click", scaleBall);
let scale = 1;
function scaleBall() {
  if (scale > 0.2) {
    scale -= 0.1;
    scale = Math.max(scale, 0.2); // Prevent scale from going below 0.2
  }
  updateBallTransform();
}

// reset
const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetBall);
function resetBall() {
  distanceMoved = 0;
  rotation = 0;
  scale = 1;
  updateBallTransform();
}
