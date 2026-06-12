type User = {
  name: string;
  age: number;
  password: string;
};

type T = ReadOnly<User>;

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

// type T = {
//   readonly [K in keyof User]: User[K];
// };

// type T = {
//   [K in keyof User]-?: User[K];
// };
