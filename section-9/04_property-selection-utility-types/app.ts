type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type SafeUser = Omit<User, "password" | "id">;