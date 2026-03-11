let a = 5;

if (typeof a === "number") {
  console.log(a);
} else {
  let b: symbol = a;
  console.log(b);
}
