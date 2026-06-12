# 🌍 Real-World Use Cases of Type-Level Programming

Type-level programming is useful when we want TypeScript to **calculate types automatically** from existing types, strings, objects, tuples, or patterns.

In simple words:

> We write logic at the type level so TypeScript can catch mistakes before runtime.

---

# 1. 🛣️ Extracting Route Parameters

This is useful in routing systems.

Example route:

```ts
"/users/:userId/posts/:postId";
```

From this string, we want TypeScript to extract:

```ts
"userId" | "postId";
```

Code:

```ts
type RouteParams<T extends string> =
  T extends `${string}:${infer Param}/${infer Rest}`
    ? Param | RouteParams<Rest>
    : T extends `${string}:${infer Param}`
      ? Param
      : never;

type Params = RouteParams<"/users/:userId/posts/:postId">;
// "userId" | "postId"
```

Now we can create a params object type:

```ts
type ParamsObject<T extends string> = {
  [K in RouteParams<T>]: string;
};

type UserPostParams = ParamsObject<"/users/:userId/posts/:postId">;
```

Output:

```ts
type UserPostParams = {
  userId: string;
  postId: string;
};
```

Real-world use:

```ts
function handleRoute(params: UserPostParams) {
  params.userId;
  params.postId;
}
```

This helps in:

```txt
Express-style routing
frontend routing
API route handlers
file-based routing systems
```

---

# 2. 📦 Type-Safe API Response Handling

In real projects, APIs usually return either success data or an error.

Instead of manually writing response types again and again, we can create a reusable type.

```ts
type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
```

Example:

```ts
type User = {
  id: string;
  name: string;
};

type UserResponse = ApiResponse<User>;

function handleResponse(response: UserResponse) {
  if (response.success) {
    response.data.name;
  } else {
    response.error;
  }
}
```

Why this is useful:

```txt
If success is true, data is available.
If success is false, error is available.
TypeScript prevents us from using the wrong property.
```

Real-world use:

```txt
login API
payment API
course purchase API
file upload API
dashboard data API
```

---

# 3. 🧾 Creating Update Input Types from Models

Suppose we have a database model:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};
```

For an update API, we may want users to update only:

```txt
name
email
```

We can create our own type-level helper instead of using built-in utility types.

```ts
type UserUpdateInput = {
  [K in keyof User as K extends "name" | "email" ? K : never]?: User[K];
};
```

Output:

```ts
type UserUpdateInput = {
  name?: string;
  email?: string;
};

function updateUser(data: UserUpdateInput) {}
```

This is allowed:

```ts
updateUser({
  name: "Anurag",
});
```

This is not allowed:

```ts
updateUser({
  password: "new-password",
});
```

Real-world use:

```txt
PATCH APIs
admin dashboards
profile update forms
database update operations
course update forms
```

---

# 4. 📝 Form Error and Touched Types

In forms, we usually have:

```txt
values
errors
touched fields
```

Suppose this is our form value type:

```ts
type SignupForm = {
  name: string;
  email: string;
  password: string;
};
```

We can create error types from it:

```ts
type FormErrors<T> = {
  [K in keyof T]?: string;
};

type SignupFormErrors = FormErrors<SignupForm>;
```

Output:

```ts
type SignupFormErrors = {
  name?: string;
  email?: string;
  password?: string;
};
```

We can also create touched fields:

```ts
type FormTouched<T> = {
  [K in keyof T]?: boolean;
};

type SignupFormTouched = FormTouched<SignupForm>;
```

Output:

```ts
type SignupFormTouched = {
  name?: boolean;
  email?: boolean;
  password?: boolean;
};
```

Real-world use:

```txt
React forms
checkout forms
login forms
course creation forms
admin panel forms
```

---

# 5. 📢 Type-Safe Event System

Suppose we have events in an app:

```ts
type AppEvents = {
  login: {
    userId: string;
  };
  logout: {
    userId: string;
  };
  coursePurchased: {
    courseId: string;
    amount: number;
  };
};
```

Now we can create a type-safe `emit` function:

```ts
function emit<EventName extends keyof AppEvents>(
  eventName: EventName,
  payload: AppEvents[EventName],
) {}
```

Correct usage:

```ts
emit("login", {
  userId: "u_123",
});
```

Correct usage:

```ts
emit("coursePurchased", {
  courseId: "c_123",
  amount: 999,
});
```

Wrong usage:

```ts
emit("coursePurchased", {
  userId: "u_123",
});
```

TypeScript will catch the mistake.

Real-world use:

```txt
analytics events
WebSocket events
notification systems
Node.js event emitters
frontend tracking events
```

---

# 6. 🔐 Safer IDs with Branded Types

In normal TypeScript, many IDs are just strings:

```ts
type UserId = string;
type CourseId = string;
```

So this mistake is possible:

```ts
function getUser(id: UserId) {}

const courseId: CourseId = "course_123";

getUser(courseId); // allowed because both are string
```

With branded types, we can make different string types behave differently.

```ts
type Brand<T, Name> = T & {
  readonly __brand: Name;
};
```

Now create safer IDs:

```ts
type UserId = Brand<string, "UserId">;
type CourseId = Brand<string, "CourseId">;

function getUser(id: UserId) {}

const courseId = "course_123" as CourseId;

getUser(courseId); // Error
```

This prevents accidental mixing of IDs.

Real-world use:

```txt
user IDs
course IDs
order IDs
payment IDs
database object IDs
transaction IDs
```

---

# 7. ⚙️ Deriving Types from Config Objects

Suppose we have a route config:

```ts
const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
} as const;
```

We can derive route names:

```ts
type RouteName = keyof typeof routes;
```

Output:

```ts
type RouteName = "home" | "login" | "dashboard";
```

We can derive route paths:

```ts
type RoutePath = (typeof routes)[RouteName];
```

Output:

```ts
type RoutePath = "/" | "/login" | "/dashboard";
```

Now we can use it safely:

```ts
function navigate(path: RoutePath) {}

navigate("/login"); // allowed
navigate("/wrong-url"); // Error
```

Real-world use:

```txt
route configs
feature flags
theme configs
permission configs
payment status configs
course category configs
```

---

# 8. 👮 Permission System Types

Suppose we have roles and permissions:

```ts
type Permissions = {
  admin: "create" | "read" | "update" | "delete";
  teacher: "create" | "read" | "update";
  student: "read";
};
```

We can extract allowed actions for a role:

```ts
type ActionsFor<Role extends keyof Permissions> = Permissions[Role];

type AdminActions = ActionsFor<"admin">;
// "create" | "read" | "update" | "delete"

type StudentActions = ActionsFor<"student">;
// "read"
```

Now we can build type-safe permission checks:

```ts
function canPerform<Role extends keyof Permissions>(
  role: Role,
  action: Permissions[Role],
) {}
```

Correct:

```ts
canPerform("admin", "delete");
canPerform("student", "read");
```

Wrong:

```ts
canPerform("student", "delete");
```

TypeScript catches it.

Real-world use:

```txt
admin panels
course platforms
SaaS dashboards
role-based access control
team management systems
```

---

# 9. 🧩 Creating Component Props from Variants

Suppose we have button variants:

```ts
type ButtonVariants = {
  primary: {
    background: "blue";
    textColor: "white";
  };
  danger: {
    background: "red";
    textColor: "white";
  };
  ghost: {
    background: "transparent";
    textColor: "black";
  };
};
```

We can create type-safe button props:

```ts
type ButtonProps<Variant extends keyof ButtonVariants> = {
  variant: Variant;
  styles: ButtonVariants[Variant];
};

const primaryButton: ButtonProps<"primary"> = {
  variant: "primary",
  styles: {
    background: "blue",
    textColor: "white",
  },
};
```

Wrong:

```ts
const dangerButton: ButtonProps<"danger"> = {
  variant: "danger",
  styles: {
    background: "blue",
    textColor: "white",
  },
};
```

TypeScript catches the mismatch.

Real-world use:

```txt
design systems
React component libraries
theme variants
button variants
card variants
badge variants
```

---

# 10. 🔗 Type-Safe API Client

Suppose we define API endpoints like this:

```ts
type ApiRoutes = {
  "/users": {
    method: "GET";
    response: {
      id: string;
      name: string;
    }[];
  };
  "/courses": {
    method: "GET";
    response: {
      id: string;
      title: string;
    }[];
  };
};
```

Now create a type-safe API function:

```ts
function request<Path extends keyof ApiRoutes>(
  path: Path,
): ApiRoutes[Path]["response"] {
  throw new Error("Not implemented");
}

const users = request("/users");
```

Now TypeScript knows:

```ts
users[0].name;
```

For courses:

```ts
const courses = request("/courses");
```

TypeScript knows:

```ts
courses[0].title;
```

Wrong path:

```ts
request("/wrong");
```

TypeScript catches it.

Real-world use:

```txt
frontend API clients
backend SDKs
internal tools
admin dashboards
course platform APIs
```

# 11. Make Utility Types

To be continued...
