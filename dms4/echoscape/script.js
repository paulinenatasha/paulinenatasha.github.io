let piano, flute, chime;
let audioStarted = false;
let stage;
let layer;
let reverb;
let delay;
let currentInstrument = "piano";

window.scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];

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
  delay = new Tone.PingPongDelay("8n", 0.5).toDestination();

  //Instruments
  piano = new Tone.AMSynth({
    harmonicity: 3,
    envelope: { attack: 0.1, decay: 0.4, sustain: 0.3, release: 2 },
  }).chain(delay, reverb);

  flute = new Tone.FMSynth({
    harmonicity: 8,
    modulationIndex: 5,
    envelope: { attack: 0.2, decay: 0.3, sustain: 0.4, release: 1.5 },
  }).chain(delay, reverb);

  chime = new Tone.MembraneSynth({
    harmonicity: 8,
    modulationIndex: 30,
    frequency: 800,
    envelope: { attack: 0.05, decay: 1, release: 1 },
  }).chain(delay, reverb);

  stage.on("click", (e) => {
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

//Tone.js function
function getNoteFromPosition(x) {
  const screenWidth = window.innerWidth;
  const noteIndex = Math.floor((x / screenWidth) * (window.scale.length - 1));
  return window.scale[Math.min(noteIndex, window.scale.length - 1)];
}

//Create shapes (only circles for now, will expand more)
function createCircle(x, y) {
  const instrumentColors = {
    piano: "#8a9ba8",
    flute: "#a6b6c9",
    chime: "#f6c6b4",
  };
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    fill: instrumentColors[currentInstrument],
    opacity: 0.8,
  });

  layer.add(circle);

  // let pointer;
  // if (stage) {
  //   pointer = stage.getPointerPosition();
  // }
  // if (!pointer) return;

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
