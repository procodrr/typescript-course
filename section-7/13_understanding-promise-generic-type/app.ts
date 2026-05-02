// const myPromise: Promise<string> = new Promise((resolve, reject) => {
//   resolve("hi");
// });
const myPromise = new Promise<string>((resolve, reject) => {
  resolve("hi");
});

const result = await myPromise;

console.log(result);

const myPromise2 = Promise.resolve({ value: "test" });
