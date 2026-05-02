type User = {
  name: string;
  age: number;
  DOB: string;
}

type Student = {
 schoolName: string;
 class: string;
} & User

type Employee = {
  companyName: string;
  designation: string;
} & User

// const student: Student = {

// }

// const employee: Employee = {

// }