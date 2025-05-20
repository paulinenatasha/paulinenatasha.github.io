let piano, flute, chime;
let audioStarted = false;
let stage, layer, reverb, delay;
let currentInstrument = "piano";

const scale = ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"];

function getNoteFromPosition(x) {
  const idx = Math.floor((x / window.innerWidth) * scale.length);
  return scale[Math.min(idx, scale.length - 1)];
}

function playSound(note, instrument) {
  if (instrument === "piano") piano.triggerAttackRelease(note, "8n");
  else if (instrument === "flute") flute.triggerAttackRelease(note, "8n");
  else if (instrument === "chime") chime.triggerAttackRelease(note, "8n");
}

function createCircle(x, y) {
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 30,
    fill: "#e6a5b7",
    strokeWidth: 2,
    opacity: 0.7,
  });
  layer.add(circle);
  layer.batchDraw();
  circle.to({
    scaleX: 1.5,
    scaleY: 1.5,
    opacity: 0,
    duration: 1,
    onFinish: () => {
      circle.destroy();
      layer.batchDraw();
    },
  });
}

window.addEventListener("DOMContentLoaded", () => {
  stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });

  layer = new Konva.Layer();
  stage.add(layer);

  reverb = new Tone.Reverb({ decay: 5, wet: 0.5 }).toDestination();
  delay = new Tone.PingPongDelay("8n", 0.5).toDestination();

  piano = new Tone.AMSynth({
    harmonicity: 3,
    envelope: { attack: 0.1, decay: 0.4, sustain: 0.3, release: 2 },
  }).chain(delay, reverb);

  flute = new Tone.FMSynth({
    harmonicity: 5,
    modulationIndex: 5,
    envelope: { attack: 0.1, decay: 0.4, sustain: 0.3, release: 1.5 },
  }).chain(delay, reverb);

  chime = new Tone.MembraneSynth({
    harmonicity: 8,
    modulationIndex: 30,
    frequency: 800,
    envelope: { attack: 0.001, decay: 3, release: 2 },
  }).chain(delay, reverb);

  window.addEventListener(
    "pointerdown",
    async function startAudio() {
      if (!audioStarted) {
        await Tone.start();
        audioStarted = true;
        console.log("Audio started");
      }
    },
    { once: true }
  );

  stage.on("click", (e) => {
    if (!audioStarted) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;

    const note = getNoteFromPosition(pos.x);
    createCircle(pos.x, pos.y);
    playSound(note, currentInstrument);
  });
});

document.querySelectorAll(".instrument-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document
      .querySelectorAll(".instrument-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentInstrument = btn.dataset.sound;
  });
});
