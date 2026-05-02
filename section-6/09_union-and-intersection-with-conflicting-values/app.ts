interface Person1 {
  name: string;
  age: number;
};

// interface Person2 extends Person1 {
//   name: string;
//   age: string;
// };

function a(): never {
  throw new Error();
}

// const obj: Person1 & Person2 = {
//   name: "Hi"
// };
