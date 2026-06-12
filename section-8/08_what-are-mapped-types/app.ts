type User = {
  name: string;
  age: number;
  password: string;
};

type T = {
  [K in keyof User]: User[K][] | `my-${K}`;
};

// type T = {
//   [K in string | number | symbol]: boolean;
// };

// interface U {
//   [x: string]: number;
// }

type ConvertPropertyToArray<T> = {
  [K in keyof T]: T[K][];
};

type X = ConvertPropertyToArray<User>;
