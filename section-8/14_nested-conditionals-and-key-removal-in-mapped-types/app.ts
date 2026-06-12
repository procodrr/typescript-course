type CheckType<T> =
  T extends string
    ? "This is a string"
    : T extends number
      ? "This is a number"
      : T extends boolean
        ? "This is a boolean"
        : "Unknown type";

type T = CheckType<boolean>
