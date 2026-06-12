type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

type ReadonlyPublicUser = Readonly<
  Pick<User, "id" | "name">
>;

type PartialUserUpdate = Partial<
  Omit<User, "password">
>;

type Role = "admin" | "user" | "guest";

type Permissions = Readonly<
  Record<Role, boolean>
>;