type T1 = string & "hi";
type T2 = boolean & false;
type T3 = Exclude<boolean, false>;
type T4 = Exclude<boolean, true>;
type T5 = string & `Hi, ${string}`;
type T6 = number & 90;

type T7 = (number | string | boolean) & (string | boolean | null);

type T8 = unknown & T5;
type T9 = "bye" & "by";
type T10 = never | false;

type T11 = "apple" | "mango" | "grapes" | "banana";

type T12 = Exclude<T11, "mango" | "grapes" | "banana">;

let a: number;
let b: string;
let c: string | number;

let x: string & "h" = "h"
