function getTuple<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

const result = getTuple<string, number>("1", 1);

// result[1].
