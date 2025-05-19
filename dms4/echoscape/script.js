let piano, flute, chime;
let audioStarted = false;
let stage;
let layer;
let reverb;
let delay;
let currentInstrument = "piano";

window.scale = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4"];

window.addEventListener("DOMContentLoaded", () => {
  //Canvas
  stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  reverb = new Tone.Reverb({ decay: 5, wet: 0.5 }).toDestination();
  delay = new Tone.PingPongDelay({
    delayTime: "8n",
    feedback: 0.2,
    wet: 0.1,
  }).toDestination();

  //Instruments
  piano = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      D4: "D4.mp3",
      E4: "E4.mp3",
      G4: "G4.mp3",
      A4: "A4.mp3",
    },
    release: 1,
    baseUrl: "sounds/",
  }).chain(delay, reverb);

  flute = new Tone.FMSynth({
    harmonicity: 5,
    modulationIndex: 5,
    envelope: { attack: 0.1, decay: 0.4, sustain: 0.3, release: 1.5 },
  }).chain(delay, reverb);

  chime = new Tone.Sampler({
    urls: {
      C4: "ChimeC4.mp3",
    },
    release: 1,
    baseUrl: "sounds/",
  }).chain(delay, reverb);

  stage.on("mousedown", (e) => {
    if (!audioStarted) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const note = getNoteFromPosition(pos.x);
    createCircle(pos.x, pos.y);
    playSound(note, currentInstrument);
  });
});

//Instrument Buttons
document.querySelectorAll(".instrument-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".instrument-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentInstrument = btn.dataset.sound;
  });
});

//Modal function
document.getElementById("introDialog").showModal();
document.getElementById("piano-button").classList.add("active");

document.getElementById("dialogBtn").addEventListener("click", async () => {
  await Tone.start();
  document.getElementById("introDialog").close();
  audioStarted = true;
});

//Mapping
function getNoteFromPosition(x) {
  const screenWidth = window.innerWidth;
  const noteIndex = Math.floor((x / screenWidth) * (window.scale.length - 1));
  return window.scale[Math.min(noteIndex, window.scale.length - 1)];
}

//Create shapes
function createCircle(x, y) {
  const instrumentColors = {
    piano: "#e6a5b7",
    flute: "#abd8e7",
    chime: "#f7cfbb",
  };
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    fill: instrumentColors[currentInstrument],
    opacity: 0.8,
  });

  layer.add(circle);

  //Shapes animation
  circle.to({
    radius: 100,
    opacity: 0,
    duration: 5,
    easing: Konva.Easings.EaseOut,
    onFinish: () => circle.destroy(),
  });

  layer.draw();
}

// Play note function
function playSound(note, instrument) {
  const duration = "8n";
  switch (instrument) {
    case "piano":
      piano.triggerAttackRelease(note, duration);
      break;
    case "flute":
      flute.triggerAttackRelease(note, duration);
      break;
    case "chime":
      chime.triggerAttackRelease(note, "1n");
      break;
  }
}

window.addEventListener("resize", () => {
  if (stage) {
    stage.width(window.innerWidth);
    stage.height(window.innerHeight);
  }
});

// Volume Slider
const volumeSlider = document.querySelector(".slider");
volumeSlider.addEventListener("input", toggleVolume);

function toggleVolume() {
  const dbValue = Tone.gainToDb(volumeSlider.value / 100);
  Tone.Destination.volume.value = dbValue;
}

//Dropdown Function
document.addEventListener("DOMContentLoaded", function () {
  const dropbtn = document.getElementById("dropbtn");
  const dropdownContent = document.getElementById("theme-dropdown");

  dropbtn.addEventListener("mousedown", function (event) {
    event.stopPropagation();
    dropdownContent.classList.toggle("show");
  });

  window.addEventListener("mousedown", function (event) {
    if (!dropbtn.contains(event.target)) {
    }
  });

  // Theme Selection
  dropdownContent.querySelectorAll("button[data-theme]").forEach((btn) => {
    btn.addEventListener("mousedown", function () {
      const theme = btn.getAttribute("data-theme");
      document.body.classList.remove("theme-garden", "theme-galaxy");
      document.body.classList.add("theme-pastel");
      dropdownContent.classList.remove("show");
    });
  });
});
