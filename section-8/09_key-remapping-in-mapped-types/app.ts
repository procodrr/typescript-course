type User = {
  name: string;
  age: number;
  password: string;
};

type T = {
  [K in keyof User as `get${Capitalize<K>}`]: () => User[K];
};