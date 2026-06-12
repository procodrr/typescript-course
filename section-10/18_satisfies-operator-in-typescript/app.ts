type User = {
  name: string;
  age: number;
};

const user = {
  name: "Anurag",
  age: 25,
} as const satisfies User;

console.log(user.name); // user.name is string
console.log(user.age);


// const age = '10' satisfies number

// console.log(age);
