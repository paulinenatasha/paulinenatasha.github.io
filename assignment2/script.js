// Realtime Clock
function updateClock() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// Control Functions
const myAudio = document.querySelector("#custom-audio-player");
console.log(myAudio);
const playPauseBtn = document.querySelector("#play-pause-btn");
console.log(playPauseBtn);
const muteUnmuteBtn = document.querySelector("#mute-unmute-btn");

playPauseBtn.addEventListener("click", togglePlayPause);
muteUnmuteBtn.addEventListener("click", toggleAudio);

function togglePlayPause() {
  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
    playPauseBtn.src = "https://img.icons8.com/ios-glyphs/100/pause--v1.png";
  } else {
    myAudio.pause();
    playPauseBtn.src = "https://img.icons8.com/plumpy/100/play--v1.png";
  }
}

// Additional Background Sounds Functions
// Rain Sound
const rainBtn = document.querySelector("#rain-button");
console.log(rainBtn);
const rainSound = document.querySelector("#rain-sound");
console.log(rainSound);
rainSound.addEventListener("click", toggleRainSound);

function toggleRainSound() {
  if (rainSound.paused) {
    rainSound.play();
  } else {
    rainSound.pause();
  }
}

// Wave Sound
const waveBtn = document.querySelector("#wave-button");
const waveSound = document.querySelector("#wave-sound");
waveBtn.addEventListener("click", toggleWaveSound);

function toggleWaveSound() {
  if (waveSound.paused) {
    waveSound.play();
  } else {
    waveSound.pause();
  }
}

// Bird Sound
const birdBtn = document.querySelector("#bird-button");
const birdSound = document.querySelector("#bird-sound");
birdBtn.addEventListener("click", toggleBirdSound);

function toggleBirdSound() {
  if (birdSound.paused) {
    birdSound.play();
  } else {
    birdSound.pause();
  }
}

// Fire Sound
const fireBtn = document.querySelector("#fire-button");
const fireSound = document.querySelector("#fire-sound");
fireBtn.addEventListener("click", toggleFireSound);

function toggleFireSound() {
  if (fireSound.paused) {
    fireSound.play();
  } else {
    fireSound.pause();
  }
}

// Main Sound
