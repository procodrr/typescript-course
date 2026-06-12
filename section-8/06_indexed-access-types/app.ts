type User = {
  name: string;
  age: number;
  email: boolean;
  address: {
    city: string;
  };
}&{};

type X = keyof User
type T = User[X];

type U = ["hi", "bye"][number];
// type U2 = (78 | 'hi')['']

const user = {
  name: "ProCodrr",
  age: 10,
};

// user['name']
