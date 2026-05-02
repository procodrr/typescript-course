type HasLength = {
  length: number;
  name: string
};

function myFunc<T extends U, U>(a: T) {
    return a
}


myFunc<{length: 60, name: ""}, HasLength>({length: 60, name: ""})
myFunc(() => {})