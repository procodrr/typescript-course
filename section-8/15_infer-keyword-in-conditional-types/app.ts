// type Return<T> = T extends (...args: infer P) => infer R
//   ? { returnType: R; params: P }
//   : never;

// type A = Return<(a: number, b: string) => string>;
// // string

// type B = Return<(user: { name: string }) => number>;

type GetCity<T> = T extends { address: { city: infer C } } ? C : never;

type A = GetCity<{
  address: {
    city: "Bangalore";
    pincode: 560001;
  };
}>;
