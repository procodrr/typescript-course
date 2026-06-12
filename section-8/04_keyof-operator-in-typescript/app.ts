type User = {
  name: string;
  age: number;
} & {};

const id = Symbol();

const user = {
  [id]: "ProCodrr",
  age: 10,
};

type T1 = keyof string;
type T2 = keyof number;
type T3 = keyof boolean;
type T4 = keyof undefined;
type T5 = keyof null;
type T6 = keyof void;
type T7 = keyof unknown;
type T8 = keyof never;
// type T9 = (keyof []) & (string | number)
type T9 = Expand<keyof []>
type T10 = keyof (() => void)
type T11 = Expand<keyof Function>
type T13 = keyof any

type T14 = PropertyKey



const obj: any = {
    name: "Hi",
    age: 80
}

type T12 = keyof typeof obj

type Expand<T> = {
    [K in keyof T]: T[K]
}

const a = 50;
