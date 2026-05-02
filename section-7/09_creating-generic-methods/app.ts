interface Store<T> {
  list: T[];
  transformString<U>(index: number, cb: (item: T) => U): U;
}

const strStore: Store<string> = {
  list: ["Ram", "Aman", "Akash"],
  transformString(index: number, cb) {
    return cb(this.list[index]);
  },
};

const numStore: Store<number> = {
  list: [1, 2],
  transformString(index: number, cb) {
    return cb(this.list[index]);
  },
};

const result = strStore.transformString(2, (item) => item.length);
const result2 = numStore.transformString(1, (item) => item.toFixed(2));

console.log(result);
console.log(result2);

["1"].map(() => 8);
