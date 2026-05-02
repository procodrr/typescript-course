interface Names {
  name1?: string;
  name2: string;
  name3: string;
}

type Greet = (names: Names) => void;

const greet: Greet = function ({ name1, name2, name3 }) {
  console.log(`Hi, ${name1 || ""}  ${name2 || ""}  ${name3 || ""}
How are you?`);
};

greet({ name2: "ProCodrr", name3: "Ram" });
