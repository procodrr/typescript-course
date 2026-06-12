type User = {
  name: string;
  age: number;
  password: string;
};

type T = {
  [K in keyof User as K extends "password"
    ? never
    : `get${Capitalize<K>}`]: () => User[K];
};

type T2 = {
  [K in keyof User as K extends "password" ? never : K]: User[K];
};
