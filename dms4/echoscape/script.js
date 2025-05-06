const synth = new Tone.Synth().toDestination();
let audioStarted = false;

//Canvas
const stage = new Konva.Stage({
  container: "container",
  width: window.innerWidth,
  height: window.innerHeight,
});

const layer = new Konva.Layer();
stage.add(layer);

//Modal function
document.getElementById("dialogBtn").addEventListener("click", () => {
  document.getElementById("introDialog").close();
  toneInit();
});
document.getElementById("introDialog").showModal();

//Tone.js function
function toneInit() {
  Tone.start().then(() => {
    audioStarted = true;
  });
}

stage.on("tap contentClick", (e) => {
  if (!audioStarted) return;

  const pos = stage.getPointerPosition();

  createCircle(pos.x, pos.y);

  playNote();
});

//Create shapes (only circles for now, will expand more)
function createCircle(x, y) {
  const circle = new Konva.Circle({
    x: x,
    y: y,
    radius: 20,
    fill: "rgb(249, 174, 123)",
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
function playNote() {
  synth.triggerAttackRelease("C4", "8n");
}
