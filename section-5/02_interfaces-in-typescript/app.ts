interface User {
  name: string;
  age: number;
  email: string;
  isStudent: boolean;
  address?: {
    street: string;
    pinCode: number;
  };
}

const user1: User = {
  name: "ProCodrr",
  age: 4,
  email: "procodrr@gmail.com",
  isStudent: true,
  address: {
    street: "Blr",
    pinCode: 10,
  },
};

user1.name = "hii";

const user2: User = {
  name: "Aman",
  age: 25,
  email: "aman@gmail.com",
  isStudent: false,
};
