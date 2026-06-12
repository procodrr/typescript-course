// ===============================
// Basic Number Utilities
// ===============================

type AbsNumber<N extends number> = ToNumber<Abs<N>>;

type Neg<N extends number> = NegateNumber<N>;

type Max<A extends number, B extends number> = GT<A, B> extends true ? A : B;

type Min<A extends number, B extends number> = LT<A, B> extends true ? A : B;

// ===============================
// Modulo / Remainder
// ===============================

type ModInt<A extends string, B extends string> =
  TrimLeadingZeros<B> extends "0"
    ? never
    : SubtractInt<
        TrimLeadingZeros<A>,
        MultiplyInt<DivideInt<A, B>, TrimLeadingZeros<B>>
      >;

type ModPositiveDecimal<A extends string, B extends string> =
  AlignDecimals<A, B> extends [
    infer X extends string,
    infer Y extends string,
    infer Places extends string,
  ]
    ? TrimLeadingZeros<Y> extends "0"
      ? never
      : InsertDecimal<ModInt<X, Y>, Places>
    : never;

type Mod<A extends number, B extends number> =
  TrimLeadingZeros<Abs<B>> extends "0"
    ? never
    : ApplySign<ModPositiveDecimal<Abs<A>, Abs<B>>, IsNegative<A>>;

// ===============================
// Integer Checks
// ===============================

type IsInteger<N extends number> = `${N}` extends `${string}.${string}`
  ? false
  : true;

type IsNonNegativeInteger<N extends number> =
  IsInteger<N> extends true
    ? IsNegative<N> extends true
      ? false
      : true
    : false;

// ===============================
// Power
// Supports integer exponents.
// Negative exponents return decimal division.
// ===============================

type PowPositive<
  Base extends number,
  Exponent extends number,
  Result extends number = 1,
> = Exponent extends 0
  ? Result
  : PowPositive<Base, Subtract<Exponent, 1>, Multiply<Result, Base>>;

type Pow<Base extends number, Exponent extends number> =
  IsInteger<Exponent> extends false
    ? never
    : IsNegative<Exponent> extends true
      ? ToNumber<Abs<Exponent>> extends infer PositiveExponent extends number
        ? Divide<1, PowPositive<Base, PositiveExponent>>
        : never
      : PowPositive<Base, Exponent>;

// ===============================
// Factorial
// Supports only non-negative integers.
// ===============================

type Factorial<N extends number, Result extends number = 1> =
  IsNonNegativeInteger<N> extends false
    ? never
    : N extends 0
      ? Result
      : Factorial<Subtract<N, 1>, Multiply<Result, N>>;

// ===============================
// Examples
// ===============================

type U1 = AbsNumber<-5.25>; // 5.25
type U2 = Neg<5.25>; // -5.25
type U3 = Max<10, 20>; // 20
type U4 = Min<-10, -20>; // -20\

type M1 = Mod<10, 3>; // 1
type M2 = Mod<10.5, 2>; // 0.5
type M3 = Mod<-10, 3>; // -1
type M4 = Mod<10, 0>; // never

type P1 = Pow<2, 3>; // 8
type P2 = Pow<5, 0>; // 1
type P3 = Pow<-2, 3>; // -8
type P4 = Pow<-2, 4>; // 16
type P5 = Pow<2, -2>; // 0.25
type P6 = Pow<2, 2.5>; // never, because factional exponents are not supported yet in the current implementation

type F1 = Factorial<0>; // 1
type F2 = Factorial<8>; // 120
type F3 = Factorial<-5>; // never
type F4 = Factorial<2.5>; // never
