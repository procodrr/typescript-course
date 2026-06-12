function isString(value: unknown) {
  return typeof value === "string";
}

function assertString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("value must be string");
  }
}

function assert(condition: unknown): asserts condition {
  if (!condition) {
    throw new Error("condition did not match");
  }
}

function test(value: unknown) {
  assert(value === "boolean");
  
  value;
}


type User = {
  name: string;
};

function assertUser(value: unknown): asserts value is User {
  if (
    typeof value !== "object" ||
    value === null ||
    !("name" in value)
  ) {
    throw new Error("Value must be a User");
  }
}

function print(value: unknown) {
  assertUser(value);

  console.log(value); // value is User
  console.log(value.name);
}