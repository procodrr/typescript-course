interface User {
  firstName: string;
  lastName: string;
  getFullName(a: number): string;
}

const user: User = {
  firstName: "Pro",
  lastName: "Codrr",
  getFullName(a) {
    return this.firstName + this.lastName
  }
}