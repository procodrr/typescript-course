# 1️⃣ `*` (Single-level wildcard)

`*` matches **any characters except `/`**.

### Example

```json
include: ["src/*.ts"]
```

### Folder

```
src
 ├─ app.ts
 ├─ server.ts
 ├─ util.ts
 └─ controllers
      └─ user.ts
```

### Matches

```
src/app.ts
src/server.ts
src/util.ts
```

### Does NOT match

```
src/controllers/user.ts
```

Because `*` **does not go inside subfolders**.

---

# 2️⃣ `**` (Recursive wildcard)

`**` means **any folder depth**.

### Example

```json
include: ["src/**/*.ts"]
```

### Matches

```
src/app.ts
src/controllers/user.ts
src/controllers/admin/create.ts
src/services/auth/login.ts
```

It searches **recursively through all folders**.

---

# 3️⃣ `?` (Single character wildcard)

`?` matches **exactly one character**.

### Example

```json
include: ["src/file?.ts"]
```

### Matches

```
src/file1.ts
src/fileA.ts
src/fileX.ts
```

### Does NOT match

```
src/file10.ts
src/file.ts
```

Because `?` matches **exactly one character**.

---

# 4️⃣ File extension matching

You can match specific extensions.

### Example

```json
include: ["src/**/*.ts"]
```

Matches all `.ts` files.

Another example:

```json
include: ["src/**/*.{ts,tsx}"]
```

Matches

```
.ts
.tsx
```

---

# 5️⃣ Folder matching

### Example

```json
include: ["src/controllers/**/*"]
```

Matches everything inside:

```
src/controllers/user.ts
src/controllers/admin/create.ts
src/controllers/admin/delete.ts
```

---

# 6️⃣ Ignore pattern example

Suppose tests exist everywhere.

### Folder

```
src
 ├─ app.ts
 ├─ user.test.ts
 ├─ controllers
 │   └─ auth.test.ts
```

### tsconfig

```json
exclude: ["**/*.test.ts"]
```

Matches

```
src/user.test.ts
src/controllers/auth.test.ts
```

---

# 7️⃣ Match specific filename everywhere

Example:

```json
include: ["**/index.ts"]
```

Matches

```
src/index.ts
src/api/index.ts
src/controllers/index.ts
```

---

# 8️⃣ Real-world TypeScript config example

A common setup:

```json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"],
  "exclude": [
    "node_modules",
    "**/*.test.ts",
    "src/playground"
  ]
}
```

This means:

Compile:

```
src/app.ts
src/controllers/user.ts
src/services/auth.ts
```

Ignore:

```
src/playground/*
*.test.ts
node_modules/*
```

---

# 🔎 Quick Cheat Sheet

| Pattern        | Meaning                                  |
| -------------- | ---------------------------------------- |
| `*`            | any characters except `/`                |
| `**`           | any folder depth                         |
| `?`            | exactly one character                    |
| `*.ts`         | all `.ts` files                          |
| `src/**/*.ts`  | all `.ts` files inside `src` recursively |
| `**/*.test.ts` | all test files anywhere                  |