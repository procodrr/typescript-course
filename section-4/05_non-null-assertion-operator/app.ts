let a: string | undefined;

function setValue() {
    // a = 'Hii'
    return a!
}

console.log(a?.toUpperCase());

// let username: string = a!

// console.log(username.toUpperCase());