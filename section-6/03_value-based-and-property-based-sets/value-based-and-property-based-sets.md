# 🔹 Value-Based and Property-Based Sets

---

## 🔹 1. Value-Based Sets

### ✅ Definition

> A **Value-Based Set** is a set where elements are simple values, and membership is decided directly based on the value itself.

---

### 🔹 Key Idea

👉 The condition is applied **directly on the value**, not on any properties.

---

### 🔹 Examples

#### Example 1: Even Numbers

```
A = { x : x % 2 = 0 }
```

👉 Elements:

```
A = {..., -4, -2, 0, 2, 4, ...}
```

---

#### Example 2: Natural Numbers less than 5

```
B = { x : x < 5 and x ∈ N }
```

```
B = {1, 2, 3, 4}
```

---

#### Example 3: Characters

```
C = {a, b, c}
```

---

### 🔹 Characteristics

* Elements are **primitive values**:

  * numbers
  * characters
  * simple symbols

* Condition looks like:

```
x > 0
x % 2 = 0
```

---

## 🔹 2. Property-Based Sets

### ✅ Definition

> An **Property-Based Set** is a set where elements are objects, and membership is decided using the properties of those objects.

---

### 🔹 Key Idea

👉 The condition is applied on **properties of the element**, not directly on the element itself.

---

### 🔹 Examples

#### Example 1: Mangoes by Color

```
M = { m : m is a mango and m.color = "yellow" }
```

---

#### Example 2: Students with High Marks

```
S = { s : s.marks > 90 }
```

---

#### Example 3: Products under Budget

```
P = { p : p.price < 1000 }
```

---

### 🔹 Characteristics

* Elements are **objects with structure**

* Each element has properties like:

  * color
  * size
  * price
  * marks

* Condition looks like:

```
m.color = "yellow"
s.marks > 90
p.price < 1000
```
---

## 🔹 3. Most Important Insight

👉 Both follow the same fundamental idea:

> A set = all elements that satisfy a condition

---

### 🔹 The Only Difference

* **Value-Based Sets** → condition on value
* **Property-Based Sets** → condition on properties