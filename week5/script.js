// console.log("welcome to the class");
// let myName = "pauline";
// const myCity02 = "melbourne";
// console.log(myName, "lives in", myCity02);
// console.log(`${myName} lives in ${myCity02}`);

// let count = 10;
// console.log(count);

// let isItMorningClass = true;
// let isItAfternoonClass = false;

// let myStudentRecord = {
//   name: "Pauline",
//   id: 4027616,
//   class: "0ART1013",
//   isItScience: false,
//   isItDesign: true,
// };

// console.log("Hello everyone, my name is", myStudentRecord.name);
// console.log("my id is", myStudentRecord.id);
// console.log("my class is", myStudentRecord.class);
// console.log("are you a science student?", myStudentRecord.isItScience);

// const numberArray = [2, 4, 6, 8, 10];
// console.log(numberArray[2]);

// myStudentRecord.isItScience = true;
// if (myStudentRecord.isItScience === true) {
//   console.log("Sorry, you are in a wrong class");
// } else {
//   console.log("Welcome to 0ART1013");
// }

// let myScore = 75;
// if (myScore >= 90) {
//   console.log("You scored an HD");
// } else if (myScore < 90 && myScore >= 70) {
//   console.log("You scored a D");
// } else if (myScore < 70 && myScore >= 50) {
//   console.log("You scored a C");
// } else {
//   console.log("You scored a P");
// }

// console.log("Hello Haechan");
// console.log("Hello Mark");
// console.log("Hello Taeyong");
// console.log("Hello Jaemin");
// console.log("Hello Jeno");

const names = [
  "Haechan",
  "Mark",
  "Jaemin",
  "Jeno",
  "Chenle",
  "Renjun",
  "Jisung",
];
console.log(names.length);
for (let i = 0; i < names.length; i++) {
  console.log("NCT Dream", names[i]);
}

let shoppingCart = [
  { name: "T-shirt", price: 20 },
  { name: "Jeans", price: 50 },
  { name: "Sneakers", price: 80 },
  { name: "Backpack", price: 30 },
];

let total =
  shoppingCart[0].price +
  shoppingCart[1].price +
  shoppingCart[2].price +
  shoppingCart[3].price;

console.log(total);
let sum = 0;
for (let i = 0; i < 4; i++) {
  sum = sum + shoppingCart[i].price;
  console.log("intermediate sum", sum);
}
console.log(sum);
