type Num<
  N extends number,
  Result extends unknown[] = [],
> = Result["length"] extends N ? Result : Num<N, [0, ...Result]>;

type Add<N1 extends number, N2 extends number> = [
  ...Num<N1>,
  ...Num<N2>,
]["length"];

type Subtract<N1 extends number, N2 extends number> =
  Num<N1> extends [...Num<N2>, ...infer Rest] ? Rest["length"] : never;

type Multiply<
  N1 extends number,
  N2 extends number,
  Result extends unknown[] = [],
> = N2 extends 0
  ? Result["length"]
  : Multiply<N1, Subtract<N2, 1>, [...Result, ...Num<N1>]>;

type Divide<
  N1 extends number,
  N2 extends number,
  Count extends unknown[] = [],
> = N2 extends 0
  ? never
  : N1 extends 0
    ? Count["length"]
    : Num<N1> extends [...Num<N2>, ...infer Rest]
      ? Divide<Rest["length"], N2, [...Count, unknown]>
      : Count["length"];
