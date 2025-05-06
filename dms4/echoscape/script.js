window.scale = ["C3", "D3", "E3", "G3", "A3", "C4", "D4", "E4", "G4", "A4"];

window.addEventListener("DOMContentLoaded", () => {
  synth = new Tone.Synth().toDestination();

  //Canvas
  stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });

  layer = new Konva.Layer();
  stage.add(layer);
});

let synth;
let audioStarted = false;
let stage;
let layer;

//Modal function
document.getElementById("introDialog").showModal();
document.getElementById("dialogBtn").addEventListener("click", async () => {
  await Tone.start();
  audioStarted = true;
  document.getElementById("introDialog").close();
});

//Tone.js function
function getNoteFromPosition(x) {
  const screenWidth = window.innerWidth;
  const noteIndex = Math.floor((x / screenWidth) * (window.scale.lenght - 1));
  return window.scaale[Math.min(noteIndex, window.scale.length - 1)];
}

stage.on("tap contentClick", (e) => {
  if (!audioStarted) return;
  const pos = stage.getPointerPosition();
  createCircle(pos.x, pos.y);
  playNote(pos.x);
});

//Create shapes (only circles for now, will expand more)
function createCircle(x, y) {
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    fill: "rgb(249, 174, 123)",
    opacity: 0.8,
  });

  layer.add(circle);

  //Shapes animation
  circle.to({
    radius: 100,
    opacity: 0,
    duration: 2,
    easing: Konva.Easings.EaseOut,
    onFinish: () => circle.destroy(),
  });

  layer.draw();
}

// Play note function
function playNote(x) {
  synth.triggerAttackRelease(note, "8n");
}
