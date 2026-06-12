type ReplaceSpaces<S extends string> = S extends `${infer Left} ${infer Right}`
  ? `${Left}-${ReplaceSpaces<Right>}`
  : S;

type A = ReplaceSpaces<"hello world from ts">;
