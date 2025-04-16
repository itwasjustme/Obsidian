
# Lab: SQL injection attack, querying the database type and version on MySQL and Microsoft

This lab contains a SQL injection vulnerability in the product category filter. You can use a UNION attack to retrieve the results from an injected query.


# Writeup:

1. Use Burp Suite to intercept and modify the request that sets the product category filter.
2. Determine the [number of columns that are being returned by the query](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns) and [which columns contain text data](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text). Verify that the query is returning two columns, both of which contain text, using a payload like the following in the `category` parameter:
    
    `'+UNION+SELECT+NULL,NULL#` To determine the no. of columns
3. Use the following payload to display the database version:
    
    `'+UNION+SELECT+@@version,+NULL#` 

### NOTE:

It accepts # as a comment mechanism but not -- even though its a MYSQL or MSSQL, Lab: SQL injection attack, querying the database type and version on MySQL and Microsoft

###### ChatGPT said:

That's an interesting behavior! Here's why the `#` works but `--` doesn't in this case:

- **`#` (hash symbol)**: This is a valid comment delimiter in **MySQL**, and it works for commenting out the rest of the query.
- **`--` (double dash)**: In **MySQL**, it requires a **space after it** (`--` ) to work as a comment. If the application removes spaces or alters input in some way, `--` might not function as expected.
- **MSSQL (Microsoft SQL Server)**: Uses `--` for comments, but `#` is not a valid comment delimiter.

### Possible reasons `--` isn't working:

1. The input sanitization or WAF might be stripping spaces, making `--` ineffective (`--` needs a space after it to work).
2. The database might be processing queries in a way that ignores `--` but allows `#`.
3. The application may be using MySQL in strict mode or some middleware that affects query parsing.

### Workarounds:

- If `--` doesn't work, always try `#` when testing MySQL.
- If dealing with MSSQL, try `--` (with a space) or `/* comment */`.


