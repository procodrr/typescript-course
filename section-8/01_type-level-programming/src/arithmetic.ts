// ===============================
// Digits
// ===============================

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Bit = "0" | "1";

type DigitToArray<D extends Digit> = D extends "0"
  ? []
  : D extends "1"
    ? [1]
    : D extends "2"
      ? [1, 1]
      : D extends "3"
        ? [1, 1, 1]
        : D extends "4"
          ? [1, 1, 1, 1]
          : D extends "5"
            ? [1, 1, 1, 1, 1]
            : D extends "6"
              ? [1, 1, 1, 1, 1, 1]
              : D extends "7"
                ? [1, 1, 1, 1, 1, 1, 1]
                : D extends "8"
                  ? [1, 1, 1, 1, 1, 1, 1, 1]
                  : [1, 1, 1, 1, 1, 1, 1, 1, 1];

type ArrayToDigit<A extends any[]> = A["length"] extends 0
  ? "0"
  : A["length"] extends 1
    ? "1"
    : A["length"] extends 2
      ? "2"
      : A["length"] extends 3
        ? "3"
        : A["length"] extends 4
          ? "4"
          : A["length"] extends 5
            ? "5"
            : A["length"] extends 6
              ? "6"
              : A["length"] extends 7
                ? "7"
                : A["length"] extends 8
                  ? "8"
                  : "9";

type Ten = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

// ===============================
// Small Tuple Helpers
// ===============================

type IsGreaterOrEqualArray<A extends any[], B extends any[]> = A extends [
  ...B,
  ...any[],
]
  ? true
  : false;

type SubtractArray<A extends any[], B extends any[]> = A extends [
  ...infer Rest,
  ...B,
]
  ? Rest
  : [];

type SplitTens<A extends any[], Carry extends any[] = []> =
  IsGreaterOrEqualArray<A, Ten> extends true
    ? SplitTens<SubtractArray<A, Ten>, [...Carry, 1]>
    : [ArrayToDigit<A>, ArrayToDigit<Carry>];

// ===============================
// Single Digit Operations
// ===============================

type AddDigit<A extends Digit, B extends Digit, Carry extends Bit = "0"> =
  SplitTens<
    [...DigitToArray<A>, ...DigitToArray<B>, ...DigitToArray<Carry>]
  > extends [infer Sum extends Digit, infer NewCarry extends Digit]
    ? [Sum, NewCarry extends "0" ? "0" : "1"]
    : never;

type SubtractDigit<
  A extends Digit,
  B extends Digit,
  Borrow extends Bit = "0",
> = [...DigitToArray<B>, ...DigitToArray<Borrow>] extends infer Need extends
  any[]
  ? IsGreaterOrEqualArray<DigitToArray<A>, Need> extends true
    ? [ArrayToDigit<SubtractArray<DigitToArray<A>, Need>>, "0"]
    : [ArrayToDigit<SubtractArray<[...Ten, ...DigitToArray<A>], Need>>, "1"]
  : never;

type MultiplyDigit<
  A extends Digit,
  B extends Digit,
  Carry extends Digit = "0",
  Count extends any[] = DigitToArray<B>,
  Result extends any[] = DigitToArray<Carry>,
> = Count extends [any, ...infer Rest]
  ? MultiplyDigit<A, B, Carry, Rest, [...Result, ...DigitToArray<A>]>
  : SplitTens<Result>;

// ===============================
// String Helpers
// ===============================

type Reverse<
  S extends string,
  R extends string = "",
> = S extends `${infer First}${infer Rest}` ? Reverse<Rest, `${First}${R}`> : R;

type TrimLeadingZeros<S extends string> = S extends `0${infer Rest}`
  ? Rest extends ""
    ? "0"
    : TrimLeadingZeros<Rest>
  : S extends ""
    ? "0"
    : S;

type TrimTrailingZeros<S extends string> =
  S extends `${infer Whole}.${infer Fraction}`
    ? Fraction extends `${infer Rest}0`
      ? TrimTrailingZeros<`${Whole}.${Rest}`>
      : Fraction extends ""
        ? Whole
        : S
    : S;

type SplitDecimal<S extends string> =
  S extends `${infer Whole}.${infer Fraction}`
    ? [Whole extends "" ? "0" : Whole, Fraction]
    : [S extends "" ? "0" : S, ""];

type CleanDecimal<S extends string> =
  SplitDecimal<S> extends [
    infer Whole extends string,
    infer Fraction extends string,
  ]
    ? Fraction extends ""
      ? TrimLeadingZeros<Whole>
      : TrimTrailingZeros<`${TrimLeadingZeros<Whole>}.${Fraction}`>
    : never;

type ToNumber<S extends string> = S extends `${infer N extends number}`
  ? N
  : never;

type IsNegative<N extends number> = `${N}` extends `-${string}` ? true : false;

type Abs<N extends number> = `${N}` extends `-${infer P}` ? P : `${N}`;

type ApplySign<S extends string, Negative extends boolean> =
  CleanDecimal<S> extends infer Cleaned extends string
    ? Cleaned extends "0"
      ? 0
      : Negative extends true
        ? ToNumber<`-${Cleaned}`>
        : ToNumber<Cleaned>
    : never;

type NegateNumber<N extends number> =
  `${N}` extends `-${infer P extends number}` ? P : ToNumber<`-${N}`>;

// ===============================
// Integer Comparison
// ===============================

type LengthCompare<
  A extends string,
  B extends string,
> = A extends `${infer _}${infer ARest}`
  ? B extends `${infer _}${infer BRest}`
    ? LengthCompare<ARest, BRest>
    : "greater"
  : B extends `${infer _}${infer _}`
    ? "less"
    : "equal";

type DigitGreater<A extends Digit, B extends Digit> =
  IsGreaterOrEqualArray<DigitToArray<A>, DigitToArray<B>> extends true
    ? A extends B
      ? false
      : true
    : false;

type CompareSameLength<
  A extends string,
  B extends string,
> = A extends `${infer AD extends Digit}${infer ARest}`
  ? B extends `${infer BD extends Digit}${infer BRest}`
    ? AD extends BD
      ? CompareSameLength<ARest, BRest>
      : DigitGreater<AD, BD> extends true
        ? "greater"
        : "less"
    : "greater"
  : B extends ""
    ? "equal"
    : "less";

type CompareInt<A extends string, B extends string> =
  TrimLeadingZeros<A> extends infer X extends string
    ? TrimLeadingZeros<B> extends infer Y extends string
      ? LengthCompare<X, Y> extends "equal"
        ? CompareSameLength<X, Y>
        : LengthCompare<X, Y>
      : never
    : never;

// ===============================
// Integer Addition
// ===============================

type AddIntReversed<
  A extends string,
  B extends string,
  Carry extends Bit = "0",
  Result extends string = "",
> = A extends `${infer AD extends Digit}${infer ARest}`
  ? B extends `${infer BD extends Digit}${infer BRest}`
    ? AddDigit<AD, BD, Carry> extends [
        infer Sum extends Digit,
        infer NewCarry extends Bit,
      ]
      ? AddIntReversed<ARest, BRest, NewCarry, `${Sum}${Result}`>
      : never
    : AddDigit<AD, "0", Carry> extends [
          infer Sum extends Digit,
          infer NewCarry extends Bit,
        ]
      ? AddIntReversed<ARest, "", NewCarry, `${Sum}${Result}`>
      : never
  : B extends `${infer BD extends Digit}${infer BRest}`
    ? AddDigit<"0", BD, Carry> extends [
        infer Sum extends Digit,
        infer NewCarry extends Bit,
      ]
      ? AddIntReversed<"", BRest, NewCarry, `${Sum}${Result}`>
      : never
    : Carry extends "1"
      ? `1${Result}`
      : Result;

type AddInt<A extends string, B extends string> = TrimLeadingZeros<
  AddIntReversed<Reverse<A>, Reverse<B>>
>;

// ===============================
// Integer Subtraction
// A must be greater than or equal to B
// ===============================

type SubtractIntReversed<
  A extends string,
  B extends string,
  Borrow extends Bit = "0",
  Result extends string = "",
> = A extends `${infer AD extends Digit}${infer ARest}`
  ? B extends `${infer BD extends Digit}${infer BRest}`
    ? SubtractDigit<AD, BD, Borrow> extends [
        infer Diff extends Digit,
        infer NewBorrow extends Bit,
      ]
      ? SubtractIntReversed<ARest, BRest, NewBorrow, `${Diff}${Result}`>
      : never
    : SubtractDigit<AD, "0", Borrow> extends [
          infer Diff extends Digit,
          infer NewBorrow extends Bit,
        ]
      ? SubtractIntReversed<ARest, "", NewBorrow, `${Diff}${Result}`>
      : never
  : TrimLeadingZeros<Result>;

type SubtractInt<A extends string, B extends string> = TrimLeadingZeros<
  SubtractIntReversed<Reverse<A>, Reverse<B>>
>;

// ===============================
// Integer Multiplication
// ===============================

type MultiplyByDigitReversed<
  A extends string,
  B extends Digit,
  Carry extends Digit = "0",
  Result extends string = "",
> = A extends `${infer AD extends Digit}${infer ARest}`
  ? MultiplyDigit<AD, B, Carry> extends [
      infer Product extends Digit,
      infer NewCarry extends Digit,
    ]
    ? MultiplyByDigitReversed<ARest, B, NewCarry, `${Product}${Result}`>
    : never
  : Carry extends "0"
    ? Result
    : `${Carry}${Result}`;

type MultiplyByDigit<A extends string, B extends Digit> = TrimLeadingZeros<
  MultiplyByDigitReversed<Reverse<A>, B>
>;

type AppendZeros<
  S extends string,
  Zeros extends string,
> = Zeros extends `${infer _}${infer Rest}` ? AppendZeros<`${S}0`, Rest> : S;

type MultiplyIntReversed<
  A extends string,
  B extends string,
  Zeros extends string = "",
  Result extends string = "0",
> = B extends `${infer BD extends Digit}${infer BRest}`
  ? MultiplyIntReversed<
      A,
      BRest,
      `${Zeros}0`,
      AddInt<Result, AppendZeros<MultiplyByDigit<A, BD>, Zeros>>
    >
  : Result;

type MultiplyInt<A extends string, B extends string> = TrimLeadingZeros<
  MultiplyIntReversed<A, Reverse<B>>
>;

// ===============================
// Integer Division
// Integer quotient only
// ===============================

type FindQuotientDigit<Divisor extends string, Remainder extends string> =
  CompareInt<MultiplyByDigit<Divisor, "9">, Remainder> extends "greater"
    ? CompareInt<MultiplyByDigit<Divisor, "8">, Remainder> extends "greater"
      ? CompareInt<MultiplyByDigit<Divisor, "7">, Remainder> extends "greater"
        ? CompareInt<MultiplyByDigit<Divisor, "6">, Remainder> extends "greater"
          ? CompareInt<
              MultiplyByDigit<Divisor, "5">,
              Remainder
            > extends "greater"
            ? CompareInt<
                MultiplyByDigit<Divisor, "4">,
                Remainder
              > extends "greater"
              ? CompareInt<
                  MultiplyByDigit<Divisor, "3">,
                  Remainder
                > extends "greater"
                ? CompareInt<
                    MultiplyByDigit<Divisor, "2">,
                    Remainder
                  > extends "greater"
                  ? CompareInt<
                      MultiplyByDigit<Divisor, "1">,
                      Remainder
                    > extends "greater"
                    ? ["0", Remainder]
                    : [
                        "1",
                        SubtractInt<Remainder, MultiplyByDigit<Divisor, "1">>,
                      ]
                  : ["2", SubtractInt<Remainder, MultiplyByDigit<Divisor, "2">>]
                : ["3", SubtractInt<Remainder, MultiplyByDigit<Divisor, "3">>]
              : ["4", SubtractInt<Remainder, MultiplyByDigit<Divisor, "4">>]
            : ["5", SubtractInt<Remainder, MultiplyByDigit<Divisor, "5">>]
          : ["6", SubtractInt<Remainder, MultiplyByDigit<Divisor, "6">>]
        : ["7", SubtractInt<Remainder, MultiplyByDigit<Divisor, "7">>]
      : ["8", SubtractInt<Remainder, MultiplyByDigit<Divisor, "8">>]
    : ["9", SubtractInt<Remainder, MultiplyByDigit<Divisor, "9">>];

type DivideIntLoop<
  Dividend extends string,
  Divisor extends string,
  Quotient extends string = "",
  Remainder extends string = "0",
> = Dividend extends `${infer D extends Digit}${infer Rest}`
  ? TrimLeadingZeros<`${Remainder}${D}`> extends infer NewRemainder extends
      string
    ? FindQuotientDigit<Divisor, NewRemainder> extends [
        infer QDigit extends Digit,
        infer NextRemainder extends string,
      ]
      ? DivideIntLoop<Rest, Divisor, `${Quotient}${QDigit}`, NextRemainder>
      : never
    : never
  : TrimLeadingZeros<Quotient>;

type DivideInt<A extends string, B extends string> =
  TrimLeadingZeros<B> extends "0"
    ? never
    : DivideIntLoop<TrimLeadingZeros<A>, TrimLeadingZeros<B>>;

// ===============================
// Decimal Helpers
// ===============================

type AlignRight<
  A extends string,
  B extends string,
> = A extends `${infer AH}${infer AT}`
  ? B extends `${infer BH}${infer BT}`
    ? AlignRight<AT, BT> extends [
        infer AR extends string,
        infer BR extends string,
      ]
      ? [`${AH}${AR}`, `${BH}${BR}`]
      : never
    : AlignRight<AT, ""> extends [
          infer AR extends string,
          infer BR extends string,
        ]
      ? [`${AH}${AR}`, `0${BR}`]
      : never
  : B extends `${infer BH}${infer BT}`
    ? AlignRight<"", BT> extends [
        infer AR extends string,
        infer BR extends string,
      ]
      ? [`0${AR}`, `${BH}${BR}`]
      : never
    : ["", ""];

type AlignDecimals<A extends string, B extends string> =
  SplitDecimal<A> extends [infer AW extends string, infer AF extends string]
    ? SplitDecimal<B> extends [infer BW extends string, infer BF extends string]
      ? AlignRight<AF, BF> extends [
          infer AP extends string,
          infer BP extends string,
        ]
        ? [`${AW}${AP}`, `${BW}${BP}`, AP]
        : never
      : never
    : never;

type SplitRevByPlaces<
  ReversedNumber extends string,
  Places extends string,
  FractionReversed extends string = "",
> = Places extends `${infer _}${infer Rest}`
  ? ReversedNumber extends `${infer Digit}${infer RestNumber}`
    ? SplitRevByPlaces<RestNumber, Rest, `${FractionReversed}${Digit}`>
    : SplitRevByPlaces<"", Rest, `${FractionReversed}0`>
  : [ReversedNumber, FractionReversed];

type InsertDecimal<S extends string, Places extends string> = Places extends ""
  ? CleanDecimal<S>
  : SplitRevByPlaces<Reverse<S>, Places> extends [
        infer WholeReversed extends string,
        infer FractionReversed extends string,
      ]
    ? CleanDecimal<`${Reverse<WholeReversed> extends ""
        ? "0"
        : Reverse<WholeReversed>}.${Reverse<FractionReversed>}`>
    : never;

type DecimalToInteger<S extends string> =
  SplitDecimal<S> extends [
    infer Whole extends string,
    infer Fraction extends string,
  ]
    ? [TrimLeadingZeros<`${Whole}${Fraction}`>, Fraction]
    : never;

type RemoveCommonLength<
  A extends string,
  B extends string,
> = A extends `${infer _}${infer ARest}`
  ? B extends `${infer _}${infer BRest}`
    ? RemoveCommonLength<ARest, BRest>
    : [A, ""]
  : ["", B];

// ===============================
// Positive Decimal Operations
// ===============================

type AddPositiveDecimal<A extends string, B extends string> =
  AlignDecimals<A, B> extends [
    infer X extends string,
    infer Y extends string,
    infer Places extends string,
  ]
    ? InsertDecimal<AddInt<X, Y>, Places>
    : never;

type ComparePositiveDecimal<A extends string, B extends string> =
  AlignDecimals<A, B> extends [
    infer X extends string,
    infer Y extends string,
    any,
  ]
    ? CompareInt<X, Y>
    : never;

type SubtractPositiveDecimal<A extends string, B extends string> =
  AlignDecimals<A, B> extends [
    infer X extends string,
    infer Y extends string,
    infer Places extends string,
  ]
    ? InsertDecimal<SubtractInt<X, Y>, Places>
    : never;

type MultiplyPositiveDecimal<A extends string, B extends string> =
  DecimalToInteger<A> extends [
    infer X extends string,
    infer XPlaces extends string,
  ]
    ? DecimalToInteger<B> extends [
        infer Y extends string,
        infer YPlaces extends string,
      ]
      ? InsertDecimal<MultiplyInt<X, Y>, `${XPlaces}${YPlaces}`>
      : never
    : never;

// Change this to control division precision.
// "000000" means 6 digits after decimal point.
type DefaultPrecision = "000000";

type DividePositiveDecimal<
  A extends string,
  B extends string,
  Precision extends string = DefaultPrecision,
> =
  DecimalToInteger<A> extends [
    infer X extends string,
    infer XPlaces extends string,
  ]
    ? DecimalToInteger<B> extends [
        infer Y extends string,
        infer YPlaces extends string,
      ]
      ? TrimLeadingZeros<Y> extends "0"
        ? never
        : RemoveCommonLength<`${YPlaces}${Precision}`, XPlaces> extends [
              infer NumeratorZeros extends string,
              infer DenominatorZeros extends string,
            ]
          ? InsertDecimal<
              DivideInt<
                AppendZeros<X, NumeratorZeros>,
                AppendZeros<Y, DenominatorZeros>
              >,
              Precision
            >
          : never
      : never
    : never;

// ===============================
// Public API
// ===============================

type Add<A extends number, B extends number> =
  IsNegative<A> extends IsNegative<B>
    ? ApplySign<AddPositiveDecimal<Abs<A>, Abs<B>>, IsNegative<A>>
    : ComparePositiveDecimal<Abs<A>, Abs<B>> extends "greater"
      ? ApplySign<SubtractPositiveDecimal<Abs<A>, Abs<B>>, IsNegative<A>>
      : ComparePositiveDecimal<Abs<A>, Abs<B>> extends "less"
        ? ApplySign<SubtractPositiveDecimal<Abs<B>, Abs<A>>, IsNegative<B>>
        : 0;

type Subtract<A extends number, B extends number> = Add<A, NegateNumber<B>>;

type Multiply<A extends number, B extends number> = ApplySign<
  MultiplyPositiveDecimal<Abs<A>, Abs<B>>,
  IsNegative<A> extends IsNegative<B> ? false : true
>;

type Divide<A extends number, B extends number> =
  TrimLeadingZeros<Abs<B>> extends "0"
    ? never
    : ApplySign<
        DividePositiveDecimal<Abs<A>, Abs<B>>,
        IsNegative<A> extends IsNegative<B> ? false : true
      >;

// ===============================
// Examples
// ===============================

// type T1 = Add<5.9, 2>;              // 7.9
// type T2 = Add<5.9, 2.25>;           // 8.15
// type T3 = Add<-5.5, -2.25>;         // -7.75
// type T4 = Add<-5.5, 2.25>;          // -3.25
// type T5 = Add<5.5, -2.25>;          // 3.25

// type T6 = Subtract<5.9, 2.25>;      // 3.65
// type T7 = Subtract<-5.5, -2.25>;    // -3.25
// type T8 = Subtract<5.5, -2.25>;     // 7.75

// type T9 = Multiply<2.5, 4>;         // 10
// type T10 = Multiply<-2.5, -4>;      // 10
// type T11 = Multiply<-2.5, 4>;       // -10
// type T12 = Multiply<1.25, 2>;       // 2.5

// type T13 = Divide<5, 2>;            // 2.5
// type T14 = Divide<-5, 2>;           // -2.5
// type T15 = Divide<10, 4>;           // 2.5
// type T16 = Divide<1, 3>;            // 0.333333
// type T17 = Divide<10, 0>;           // never