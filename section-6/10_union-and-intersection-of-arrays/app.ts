type T1 = number[] & { test: string };

const arr = [1] as T1;

arr.test = "hii"

console.log(arr);

// type T2 = [1, 2];

// type T3 = T1 & T2;

// number[] | string[] Homogenous Array
// (number | string)[] Heterogenous Array

// let a!: never;
// let b!: never;

// const arr: T3 = [1, 2];


// https://www.youtube.com/live/EYGlwD2DVHY
// https://youtu.be/uN1zuV4DGRY
