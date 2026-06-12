type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<90>; // "Yes"
type B = IsString<"false">;

// type T = (() => void) extends () => string ? "Yes" : "No";

// const test: () => string = () => ""

// type X = keyof (() => void)

type Y = {} | undefined | null
type H = false | true

// const x: Y = {}

type Z = {} | undefined | null extends unknown ? "Yes" : "No";
// type I = 5 > 8

