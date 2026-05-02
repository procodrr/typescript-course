// type AvailableFruits = "Apple" | "Papaya" | "Mango" | "Grapes";
type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;

type Endpoints = `/api/${"user" | "posts" | "comments"}`;

let a: Endpoints = "/api/posts";

let b: `My dice number is ${DiceNumber}` = "My dice number is 3" 