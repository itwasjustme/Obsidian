# Lab: SQL injection UNION attack, retrieving data from other tables

This lab contains a SQL injection vulnerability in the product category filter. The results from the query are returned in the application's response, so you can use a UNION attack to retrieve data from other tables. To construct such an attack, you need to combine some of the techniques you learned in previous labs.

The database contains a different table called `users`, with columns called `username` and `password`.

To solve the lab, perform a SQL injection UNION attack that retrieves all usernames and passwords, and use the information to log in as the `administrator` user.


# Writeup

1. Use Burp Suite to intercept and modify the request that sets the product category filter.
2. Determine the [number of columns that are being returned by the query](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns) and [which columns contain text data](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text). Verify that the query is returning two columns, both of which contain text, using a payload like the following in the category parameter:
    
    `'+UNION+SELECT+NULL,NULL--`
3. Then find out the table names in the database
	`'UNION+SELECT+table_name+NULL+FROM+information_schema.tables--`
4. Then find out the columns in that table:
	`'UNION+SELECT+column_name+NULL+FROM+information_schema.tables+WHERE+table_name='users'`
5. Use the following payload to retrieve the contents of the `users` table:
    
    `'+UNION+SELECT+username,+password+FROM+users--`
6. Verify that the application's response contains usernames and passwords.