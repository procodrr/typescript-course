// ===============================
// Swap Adjacent if Needed
// ===============================

type SwapIfNeeded<
  A extends number,
  B extends number
> =
  GT<A, B> extends true
    ? [B, A]
    : [A, B];

// ===============================
// Single Bubble Pass
// Moves largest element to end
// ===============================

type BubblePass<
  Arr extends number[],
  Result extends number[] = []
> =
  Arr extends [infer A extends number, infer B extends number, ...infer Rest extends number[]]
    ? SwapIfNeeded<A, B> extends [
        infer X extends number,
        infer Y extends number
      ]
      ? BubblePass<[Y, ...Rest], [...Result, X]>
      : never
    : Arr extends [infer Last extends number]
      ? [...Result, Last]
      : Result;

// ===============================
// Bubble Sort (Recursive)
// ===============================

type BubbleSort<
  Arr extends number[],
  N extends any[] = []
> =
  N["length"] extends Arr["length"]
    ? Arr
    : BubbleSort<
        BubblePass<Arr>,
        [...N, 1]
      >;

// ===============================
// Examples
// ===============================

type S1 = BubbleSort<[5, 2, 9, 1]>;
// [1, 2, 5, 9]

type S2 = BubbleSort<[5.9, 2.25, -3.1, 0]>;
// [-3.1, 0, 2.25, 5.9]

type S3 = BubbleSort<[10, -5, 7, -2, 0]>;
// [-5, -2, 0, 7, 10]

type S4 = BubbleSort<[3.3, 3.2, 3.1]>;
// [3.1, 3.2, 3.3]