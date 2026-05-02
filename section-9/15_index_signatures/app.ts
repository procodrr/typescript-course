type T = "name" | "age" | "email";

type TUser = { [K in T]: string };



interface IUser { [K in T]: string; }
