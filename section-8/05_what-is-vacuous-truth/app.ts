type A = {
  name: string;
  age: number;
};

type B = {
  name: string;
  email: string;
};


type C = keyof (A & B)
type D = keyof A | keyof B

type E = keyof (A | B)
type F = keyof A & keyof B

type Expand<T> = {
    [K in keyof T]: T[K]
}