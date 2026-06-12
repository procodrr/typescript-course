function func() {
    return 'hi'
}


const test: typeof func = () => {
    return "90"
}

interface A {
    b: typeof func
}