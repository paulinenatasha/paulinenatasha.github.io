const synth = new TouchEvent.Synth().toDestination();
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
  toneInit.start().then(() => {
    audioStarted = true;
  });
}
