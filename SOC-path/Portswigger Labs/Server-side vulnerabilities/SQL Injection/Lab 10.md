# Lab: SQL injection UNION attack, retrieving multiple values in a single column

This lab contains a SQL injection vulnerability in the product category filter. The results from the query are returned in the application's response so you can use a UNION attack to retrieve data from other tables.

The database contains a different table called `users`, with columns called `username` and `password`.

To solve the lab, perform a SQL injection UNION attack that retrieves all usernames and passwords, and use the information to log in as the `administrator` user.


# Things to consider in this lab(as concepts of past is needed here strictly)

1) The original query and the query after `UNION` MUST HAVE SAME NO. OF COLUMNS AS WELL AS SAME DATATYPES OF IT.

2) STRING CONCATENATION IS A NECESSITY TO RETRIEVE MULTIPLE VALUES!

# Writeup:

1. Use Burp Suite to intercept and modify the request that sets the product category filter.
2. Determine the [number of columns that are being returned by the query](https://portswigger.net/web-security/sql-injection/union-attacks/lab-determine-number-of-columns) and [which columns contain text data](https://portswigger.net/web-security/sql-injection/union-attacks/lab-find-column-containing-text). Verify that the query is returning two columns, only one of which contain text, using a payload like the following in the `category` parameter:
    
    `'+UNION+SELECT+NULL,'abc'--`
3. Use the following payload to retrieve the contents of the `users` table:
    
    `'+UNION+SELECT+NULL,username||'->'||password+FROM+users--`
4. Verify that the application's response contains usernames and passwords.