function checkWeather() {
  let temp = document.querySelector("#temp");
  let body = document.querySelector("body");
  let outer = document.querySelector(".outer");
  console.log(temp.value);
  if (temp.value >= 40) {
    body.style.backgroundColor = "crimson";
    outer.style.backgroundColor = "orange";
    console.log("it is burning hot");
  } else if (temp.value < 40 && temp.value >= 30) {
    body.style.backgroundColor = "green";
    outer.style.backgroundColor = "peach";
    console.log("it is sunny and warm");
  } else if (temp.value < 30 && temp.value >= 15) {
    body.style.backgroundColor = "skyblue";
    outer.style.backgroundColor = "blue";
    console.log("it is a pleasant weather");
  } else {
    body.style.backgroundColor = "grey";
    outer.style.backgroundColor = "coral";
    console.log("it is freezing");
  }
}
