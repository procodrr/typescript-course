type Echo = <const T>(value: T) => T;

const echo: Echo = (value) => {
  return value;
};

const arr = [1, 2, 3] as const;
const obj = { name: "ProCodrr", age: 10 } as const;

const result1 = echo("hii");
const result2 = echo(1);
const result3 = echo(false);
const result4 = echo([1, 2, 3]);
const result5 = echo(["a", "b", "c"]);
const result6 = echo({ name: "ProCodrr", age: 10 });

const userName = result6.name;
const a = result4[1];

type HasNames = { names: readonly string[] };
function getNamesExactly<const T extends HasNames>(arg: T): T["names"] {
  return arg.names;
}
// Inferred type: string[]
const names = getNamesExactly({ names: ["Alice", "Bob", "Eve"] });
