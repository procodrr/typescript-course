# 🔹 Multiple Property-Based Sets

Let's say there is a universal set where each element is a **person**, and each person has **properties** like:

* name
* age
* height
* city

---

## 🔹 Example 1: Single Property

```
P1 = { p : p.age > 18 }
```

👉 Meaning:
All people whose age is greater than 18

---

## 🔹 Example 2: Two Properties

```
P2 = { p : p.age > 18 and p.height > 170 }
```

👉 Now we are selecting people who:

* are older than 18
* AND taller than 170 cm

---

## 🔹 Example 3: Three Properties

```
P3 = { p : p.age > 18 and p.height > 170 and p.city = "Delhi" }
```

👉 Now we are selecting people who:

* are older than 18
* AND taller than 170 cm
* AND live in Delhi

---

# 🔹 Key Insight (Very Important)

> The more properties we add in the condition, the **smaller the set becomes**

---

## 🔹 Why This Happens

Each property acts like a **filter**:

```
All people
   ↓ (age > 18)
Fewer people
   ↓ (height > 170)
Even fewer
   ↓ (city = Delhi)
Very few people
```

---

# 🔹 Final One-Line Summary

> Property-based sets use properties of elements, and adding more properties makes the set more filtered and smaller.