// I organized each functions in different javascript files to make the whole file setup neater
import Player from "./Player.js";
import Ground from "./Ground.js";
import CaneController from "./CaneController.js";
import Score from "./Score.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// The speed of the game will increase constantly
const GAME_SPEED_START = 1;
const GAME_SPEED_INCREMENT = 0.00001;

// Game functions
const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 94 / 1.5;
const PLAYER_HEIGHT = 70 / 1.5;
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 15;
const GROUND_AND_CANE_SPEED = 0.5;

// Randomized candy cane height and width for variation
const CANE_CONFIG = [
  { width: 48 / 1.5, height: 100 / 1.5, image: "images/cane.png" },
  { width: 98 / 1.5, height: 100 / 1.5, image: "images/cane2.png" },
  { width: 42 / 1.5, height: 70 / 1.5, image: "images/cane.png" },
];

//Game Objects
let player = null;
let ground = null;
let caneController = null;
let score = null;

// Game State
let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;
let gameOver = false;
let hasAddedEventListenersForRestart = false;
let waitingToStart = true;

// Game Screen Setup
// This initializes the correct dimensions for each game objects
function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;
  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(
    ctx,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  ground = new Ground(
    ctx,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CANE_SPEED,
    scaleRatio
  );

  const caneImages = CANE_CONFIG.map((cane) => {
    const image = new Image();
    image.src = cane.image;
    return {
      image: image,
      width: cane.width * scaleRatio,
      height: cane.height * scaleRatio,
    };
  });

  caneController = new CaneController(
    ctx,
    caneImages,
    scaleRatio,
    GROUND_AND_CANE_SPEED
  );

  score = new Score(ctx, scaleRatio);
}

// Screen width and height scaling
function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  createSprites();
}

setScreen();
if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );

  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  // additional scaling for the window if it is wider than the game width
  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

// Game Over and Reset Functions
// After players hit the object, a Game Over text will pop up and players can simply reset by pressing the space key
function showGameOver() {
  const fontSize = 95 * scaleRatio;
  ctx.font = `${fontSize}px 'Cute Font'`;
  ctx.fillStyle = "salmon";
  ctx.textBaseline = "middle";
  const x = canvas.width / 3.5;
  const y = canvas.height / 2;
  ctx.fillText("GAME OVER", x, y);
}

function setupGameReset() {
  if (!hasAddedEventListenersForRestart) {
    hasAddedEventListenersForRestart = true;

    setTimeout(() => {
      window.addEventListener("keyup", reset, { once: true });
      window.addEventListener("touchstart", reset, { once: true });
    }, 1000);
  }
}

// This will reset the game state, including ground, canes, score, and game speed
function reset() {
  hasAddedEventListenersForRestart = false;
  gameOver = false;
  waitingToStart = false;
  ground.reset();
  caneController.reset();
  score.reset();
  gameSpeed = GAME_SPEED_START;
}

// Game Start and Update Functions
function showStartGameText() {
  const fontSize = 60 * scaleRatio;
  ctx.font = `${fontSize}px 'Cute Font'`;
  ctx.fillStyle = "Salmon";
  ctx.textBaseline = "middle";
  const x = canvas.width / 14;
  const y = canvas.height / 2;
  ctx.fillText("Tap Screen or Press Any Key To Start!", x, y);
}

// To gradually increase the game speed over time
function updateGameSpeed(frameTimeDelta) {
  gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
}

// // In order to loop the game, I need to add a clear screen function to remove the old drawing and replace it with the new one
let bgX = 0;
const backgroundImage = new Image();
backgroundImage.src = "images/background.png";

function clearScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // to clear the entire canvas
  bgX -= gameSpeed * 0.2;

  // Reset the background position when it's fully off-screen
  if (bgX <= -canvas.width) {
    bgX += canvas.width;
  }

  // To create a seamless loop, I drew the background twice
  ctx.drawImage(backgroundImage, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    bgX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );
}

// Main Game Loop
function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();
  if (!gameOver && !waitingToStart) {
    // Update game objects
    ground.update(gameSpeed, frameTimeDelta);
    caneController.update(gameSpeed, frameTimeDelta);
    player.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    updateGameSpeed(frameTimeDelta);
  }

  if (!gameOver && caneController.collideWith(player)) {
    gameOver = true;
    setupGameReset();
    score.setHighScore();
  }

  //Draw game objects
  ground.draw();
  caneController.draw();
  player.draw();
  score.draw();

  if (gameOver) {
    showGameOver();
  }

  if (waitingToStart) {
    showStartGameText();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });

// Background sound and effects
window.addEventListener("load", function () {
  const audio = document.querySelector("#bg-music");
  audio.loop = true;
  audio.volume = 0.5;
});
