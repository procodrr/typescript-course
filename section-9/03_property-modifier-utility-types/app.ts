type User = {
  name: string;
  age: number;
  address?: {
    city?: string;
  }
};

type ReadonlyUser = Required<User>;