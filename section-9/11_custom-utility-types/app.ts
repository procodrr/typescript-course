type User = {
  name: string;
  age: number;
  readonly isStudent: boolean;
};

type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type NewUser = Mutable<User>;
