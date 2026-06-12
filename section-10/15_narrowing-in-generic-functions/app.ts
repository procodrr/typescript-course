function isString(value: unknown) {
  return typeof value === "string";
}

function print<T>(value: T) {
  if (isString(value)) {
    value.toUpperCase();
  }
}