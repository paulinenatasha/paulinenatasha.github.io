// Realtime Clock
function updateClock() {
  const now = new Date();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000); //Updates in real time, every 1000 millisecond

//------------------------------------------------------------------------------------

// Audio Control Functions
const myAudio = document.querySelector("#custom-audio-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const muteUnmuteBtn = document.querySelector("#mute-unmute-btn");
const volumeSlider = document.querySelector("#volume-slider");

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

// The mute and volume controls are linked, so when the volume is set to zero, the mute button has to automatically activate to accurately represent the audio status.
function toggleMute() {
  myAudio.muted = !myAudio.muted;
  myAudio.volume = myAudio.muted ? 0 : previousVolume; //After clicking the unmute button, the audio volume will be restored to the most recent level set by the user before muting.
  volumeSlider.value = myAudio.volume;
  updateMuteBtn();
}

function toggleVolume() {
  const volume = parseFloat(volumeSlider.value);
  myAudio.volume = volume;
  myAudio.muted = volume === 0;
  previousVolume = volume > 0 ? volume : previousVolume;
  updateMuteBtn();
}

function updateMuteBtn() {
  muteUnmuteBtn.src =
    myAudio.muted || myAudio.volume === 0
      ? "https://img.icons8.com/metro/100/mute.png"
      : "https://img.icons8.com/material-rounded/100/medium-volume.png";
}

myAudio.volume = 0.5;
volumeSlider.value = 0.5;
updateMuteBtn();

//------------------------------------------------------------------------------------

// Additional background sounds functions
//I sought assistance to organize a bit of my code by implementing a unified function for all background sounds, eliminating repetitive code for individual buttons and sounds, which not only reduced clutter but also enhanced consistency and simplified maintenance.
function setupBackgroundSound(buttonId, soundId, volume) {
  const button = document.querySelector(`#${buttonId}`);
  const sound = document.querySelector(`#${soundId}`);
  sound.volume = volume;

  button.addEventListener("click", () => {
    if (sound.paused) {
      sound.play();
      button.style.backgroundColor = "#ae9e8d";
    } else {
      sound.pause();
      button.style.backgroundColor = "#dbcbbb";
    }
  });
}

setupBackgroundSound("rain-button", "rain-sound", 0.2);
setupBackgroundSound("wave-button", "wave-sound", 0.5);
setupBackgroundSound("bird-button", "bird-sound", 0.5);
setupBackgroundSound("fire-button", "fire-sound", 0.3);

//------------------------------------------------------------------------------------

// To Do List
// I watched a Youtube tutorial on how to code this to do list ("https://www.youtube.com/watch?v=G0jO8kUrg-I")
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="circle">〇</span>
    <span class="task-text">${inputBox.value}</span>
    <span class="delete-btn">&times;</span>
  `;

  listContainer.appendChild(li);
  inputBox.value = "";
}

listContainer.addEventListener("click", function (e) {
  const target = e.target;
  const listItem = target.closest("li");

  if (
    target.classList.contains("circle") ||
    target.classList.contains("task-text")
  ) {
    listItem.classList.toggle("checked");
    const circle = listItem.querySelector(".circle");
    circle.innerHTML = listItem.classList.contains("checked") ? "⬤" : "〇";
  } else if (target.classList.contains("delete-btn")) {
    listItem.remove();
  }
});
