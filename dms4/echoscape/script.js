let synth;
let audioStarted = false;
let stage;
let layer;

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

  stage.on("click", (e) => {
    if (!audioStarted) return;
    const pos = stage.getPointerPosition();
    createCircle(pos.x, pos.y);
    playNote(pos.x);
  });

  //Modal function
  document.getElementById("introDialog").showModal();
});

document.getElementById("dialogBtn").addEventListener("click", async () => {
  await Tone.start();
  document.getElementById("introDialog").close();
  audioStarted = true;
  synth = new Tone.Synth().toDestination();
});

//Tone.js function
function getNoteFromPosition(x) {
  const screenWidth = window.innerWidth;
  const noteIndex = Math.floor((x / screenWidth) * (window.scale.length - 1));
  return window.scale[Math.min(noteIndex, window.scale.length - 1)];
}

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
    duration: 5,
    easing: Konva.Easings.EaseOut,
    onFinish: () => circle.destroy(),
  });

  layer.draw();
}

// Play note function
function playNote(x) {
  const note = getNoteFromPosition(x);
  synth.triggerAttackRelease(note, "8n");
}
