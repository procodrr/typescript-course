type MathOperation = (a: number, b: number) => number;

const add: MathOperation = function (x, y) {
  return x + y;
};

const subtract: MathOperation = function (a, b) {
  return a - b;
};

const multiply: MathOperation = function (a, b) {
  return a * b;
};

const divide: MathOperation = function (a, b) {
  return a / b;
};

// type Fruit = "Apple" | "Mango" | "Grapes"

// function printFruits(fruit: Fruit) {
//     console.log(fruit);
// }

// printFruits("Grapes")

// function greet(name?: string) {
//   console.log(`Hi, ${name ? name : ""}
// How are you?`);
// }

// greet("Anurag");

// function greet(name: string = "") {
//   console.log(`Hi, ${name}
// How are you?`);
// }

// greet();
