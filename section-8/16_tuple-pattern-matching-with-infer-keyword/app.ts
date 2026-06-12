type First<T> = T extends [infer F, ...unknown[]] ? F : never;

type A = First<[10, 20, 30]>;