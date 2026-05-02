function myFunc<T = string>(a?: T) {
  return a
}

const result = myFunc()