function echo<T>(a: T): T {
  return a;
}

const echo2 = function <T>(a: T): T {
  return a;
};

const echo3 = <T>(a: T): T => {
  return a;
};

type EchoFuncType = <T>(a: T) => T;

interface EchoFuncType2 {
  <T>(a: T): T
}

const echo4: EchoFuncType2 = function (a) {
  return a;
};

let value = echo4(89);
