function test(a: string, b: boolean, ...myParams: number[]) {
  console.log(myParams);
}

// test("hi", false, ...[1, 3, 4, 6]);

// function test(...myParams: [name: string, age: number, isAdmin: boolean]) {
//   const [name, age, isAdmin] = myParams;
//   console.log(name, age, isAdmin);
// }

function test2(name: string, age: number, isAdmin: boolean) {
  console.log();
}

// test("hi", 9, false);
