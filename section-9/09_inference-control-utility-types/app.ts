function createStreetLight<C extends string>(
  colors: C[],
  defaultColor: NoInfer<C>,
) {}

createStreetLight(["red", "yellow", "green"], "green");
