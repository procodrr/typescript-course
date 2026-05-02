function myFunc(a: string): string;
function myFunc(a: number): number;
function myFunc(a: boolean): number;

function myFunc(a: unknown) {
  if (typeof a == "number") return a ** 2;
  if (typeof a == "string") return a.toUpperCase();
  if (typeof a == "boolean") return 5;
  return false;
}

const result = myFunc("hi");
const result2 = myFunc(5);
const result3 = myFunc(false);
// const result4 = myFunc({});
