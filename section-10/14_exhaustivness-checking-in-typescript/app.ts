type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "triangle"; base: number; height: number };

function print(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      console.log(shape); // shape is circle
      break;

    case "square":
      console.log(shape); // shape is square
      break;

    case "triangle":
      console.log(shape);
      break;

    default:
      const exhaustiveCheck: never = shape;
      console.log(shape);
  }
}
