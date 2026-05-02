const arr = ["Akash", 20] as const;
const obj = {
  name: "Procodrr",
  age: 3,
  address: {
    pincode: 3490,
    street: {
        no: 50
    }
  },
} as const;

arr[0] = "Anurag";
obj.address.pincode = 20;

console.log(arr);

console.log(obj);

// arr = []
// obj = []

const str = "hii";

// str = 'hi'
