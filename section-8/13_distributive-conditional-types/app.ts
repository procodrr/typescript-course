type Wrap<T> = T extends any ? { value: T } : never;

type Result = Wrap<string | number>;

type Check<T> = T extends true ? "Yes" : "No";

type X = Check<unknown>;
