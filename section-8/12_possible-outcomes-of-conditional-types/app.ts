type IsString<T> = T extends string ? "Yes" : "No";

function createHandler<T>() {
  type ParamType = T extends string ? "Yes" : "No";

  return function (value: ParamType) {
    console.log(value);
  };
}

const stringHandler = createHandler<string>();

// stringHandler("Ye")

type TEST<T> = T extends string ? never : T;

type Result = TEST<string | number | boolean | undefined>;

type X = string | number | boolean | undefined extends string ? "Yes" : "No";
