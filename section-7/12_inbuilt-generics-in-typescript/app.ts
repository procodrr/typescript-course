// const arr = new Array<boolean>()
// const arr: Array<boolean> = []
const arr: Array<boolean> = new Array();
// const arr: boolean[] = []
// arr.push('hi')
// arr.push(1)
arr.push(false);

// const myMap = new Map<string, number>()
const myMap: Map<string, number> = new Map();

myMap.set("false", 10);
myMap.set("age", 10);

// console.log(myMap);

// const mySet = new Set<string>();
const mySet: Set<string> = new Set();

mySet.add("hi");
mySet.add("3");
// mySet.add(false)
// mySet.add(3)

console.log(mySet);

interface User {
  name: string;
  age: number;
}

const user: Readonly<User> = {
  name: "ProCodrr",
  age: 10,
};

const arr2: ReadonlyArray<number> = [1, 2, 3]

console.log(arr2);
