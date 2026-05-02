type T0 = {};
type T1 = { length: number };
type T2 = { length: number; name: string };
type T3 = { toString(): string };

const obj: T0 = { length: 80 };

console.log(obj);
