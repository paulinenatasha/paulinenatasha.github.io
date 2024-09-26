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
console.log(muteUnmuteBtn);
const volumeSlider = document.querySelector("#volume-slider");
console.log(volumeSlider);

let previousVolume = 0.5;

playPauseBtn.addEventListener("click", togglePlayPause);
muteUnmuteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", toggleVolume);

function togglePlayPause() {
  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
    playPauseBtn.src = "https://img.icons8.com/ios-glyphs/100/pause--v1.png";
  } else {
    myAudio.pause();
    playPauseBtn.src = "https://img.icons8.com/plumpy/100/play--v1.png";
  }
}

function toggleMute() {
  if (myAudio.muted) {
    myAudio.muted = false;
    myAudio.volume = previousVolume;
    volumeSlider.value = previousVolume;
    updateMuteBtn();
  } else {
    previousVolume = myAudio.volume;
    myAudio.muted = true;
    volumeSlider.value = 0;
    updateMuteBtn();
  }
}

function toggleVolume() {
  const volume = parseFloat(volumeSlider.value);
  myAudio.volume = volume;
  myAudio.muted = volume === 0;
  previousVolume = volume > 0 ? volume : previousVolume;
  updateMuteBtn();
}

function updateMuteBtn() {
  if (myAudio.muted || myAudio.volume === 0) {
    muteUnmuteBtn.src = "https://img.icons8.com/metro/100/mute.png";
  } else {
    muteUnmuteBtn.src =
      "https://img.icons8.com/material-rounded/100/medium-volume.png";
  }
}
myAudio.volume = 0.5;
volumeSlider.value = 0.5;
updateMuteBtn();

// Additional Background Sounds Functions
// Rain Sound
const rainBtn = document.querySelector("#rain-button");
const rainSound = document.querySelector("#rain-sound");
rainBtn.addEventListener("click", toggleRainSound);
rainSound.volume = 0.2;

function toggleRainSound() {
  if (rainSound.paused) {
    rainSound.play();
    rainBtn.style.backgroundColor = "#ae9e8d";
  } else {
    rainSound.pause();
    rainBtn.style.backgroundColor = "#dbcbbb";
  }
}

// Wave Sound
const waveBtn = document.querySelector("#wave-button");
const waveSound = document.querySelector("#wave-sound");
waveBtn.addEventListener("click", toggleWaveSound);
waveSound.volume = 0.5;

function toggleWaveSound() {
  if (waveSound.paused) {
    waveSound.play();
    waveBtn.style.backgroundColor = "#ae9e8d";
  } else {
    waveSound.pause();
    waveBtn.style.backgroundColor = "#dbcbbb";
  }
}

// Bird Sound
const birdBtn = document.querySelector("#bird-button");
const birdSound = document.querySelector("#bird-sound");
birdBtn.addEventListener("click", toggleBirdSound);
birdSound.volume = 0.5;

function toggleBirdSound() {
  if (birdSound.paused) {
    birdSound.play();
    birdBtn.style.backgroundColor = "#ae9e8d";
  } else {
    birdSound.pause();
    birdBtn.style.backgroundColor = "#dbcbbb";
  }
}

// Fire Sound
const fireBtn = document.querySelector("#fire-button");
const fireSound = document.querySelector("#fire-sound");
fireBtn.addEventListener("click", toggleFireSound);
fireSound.volume = 0.3;

function toggleFireSound() {
  if (fireSound.paused) {
    fireSound.play();
    fireBtn.style.backgroundColor = "#ae9e8d";
  } else {
    fireSound.pause();
    fireBtn.style.backgroundColor = "#dbcbbb";
  }
}

// Main Sound
