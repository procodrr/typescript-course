type T0 = {};
type T1 = { length: number };
type T2 = { length: number; name: string };
type T3 = { toString(): string };

type T4 = T1 & T2;

type Person1 = {
    name: string;
    age: number;
    password: string
}

type Person2 = {
    name: string;
    age: number;
    email: string;
    occupation: string;
}

// const obj: Person1 & Person2 =  {}

// obj.