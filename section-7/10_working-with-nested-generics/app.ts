type DynamicType<T> = {
    value: T
}
type Test<U> = U[]


let a: DynamicType<Test<DynamicType<string>>>