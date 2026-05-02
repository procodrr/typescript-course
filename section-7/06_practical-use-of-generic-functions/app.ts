function map<T, U>(arr: T[], cb: (el: T) => U): U[] {
  const output = [];

  for (const item of arr) {
    output.push(cb(item));
  }

  return output;
}

const result = map(["1", "2"], (el) => el + 2);

// console.log(result);


console.log([1, 2].map((el) => "el * 2"));
