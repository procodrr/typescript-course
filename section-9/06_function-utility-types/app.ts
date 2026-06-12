function createUser(name: string, age: number) {
  return {
    name,
    age,
  };
}

type User = ReturnType<typeof createUser>;
