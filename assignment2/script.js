function updateClock() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

const myMusic = document.querySelector("#custom-music-player");
console.log(myMusic);
const playPauseBtn = document.querySelector("#play-pause-btn");
console.log(playPauseBtn);
const muteUnmuteBtn = document.querySelector("#mute-unmute-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
console.log(shuffleBtn);

playPauseBtn.addEventListener("click", togglePlay);
muteUnmuteBtn.addEventListener("click", toggleAudio);
shuffleBtn.addEventListener("click", shuffleAudio);

function togglePlayPause() {
  if (myMusic.paused || myMusic.ended) {
    myMusic.play();
    playPauseImg.src = "https://img.icons8.com/plumpy/100/play--v1.png";
  } else {
    myMusic.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/100/pause--v1.png";
  }
}
