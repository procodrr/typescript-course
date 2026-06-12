type GT<A extends number, B extends number> =
  IsNegative<A> extends IsNegative<B>
    ? IsNegative<A> extends true
      ? ComparePositiveDecimal<Abs<A>, Abs<B>> extends "less"
        ? true
        : false
      : ComparePositiveDecimal<Abs<A>, Abs<B>> extends "greater"
        ? true
        : false
    : IsNegative<A> extends false
      ? true
      : false;

type LT<A extends number, B extends number> =
  IsNegative<A> extends IsNegative<B>
    ? IsNegative<A> extends true
      ? ComparePositiveDecimal<Abs<A>, Abs<B>> extends "greater"
        ? true
        : false
      : ComparePositiveDecimal<Abs<A>, Abs<B>> extends "less"
        ? true
        : false
    : IsNegative<A> extends true
      ? true
      : false;

type EQ<A extends number, B extends number> =
  IsNegative<A> extends IsNegative<B>
    ? ComparePositiveDecimal<Abs<A>, Abs<B>> extends "equal"
      ? true
      : false
    : false;

type GTE<A extends number, B extends number> =
  GT<A, B> extends true
    ? true
    : EQ<A, B>;

type LTE<A extends number, B extends number> =
  LT<A, B> extends true
    ? true
    : EQ<A, B>;

// ===============================
// Examples
// ===============================

type C1 = GT<10, 5>;             // true
type C2 = GT<-5, -10>;           // true
type C3 = LT<5.25, 5.9>;         // true
type C4 = GTE<5.9, 5.9>;         // true
type C5 = LTE<-10, -5>;          // true
type C6 = EQ<8.15, 8.15>;        // true