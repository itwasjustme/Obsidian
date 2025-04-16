# Lab: Stored XSS into anchor `href` attribute with double quotes HTML-encoded

This lab contains a stored cross-site scripting vulnerability in the comment functionality. To solve this lab, submit a comment that calls the `alert` function when the comment author name is clicked.

# Writeup
## Leave a comment

Comment: 
Name:  
Email:  
Website:

**Post**

- this is the structure of the blogs comment section, where we write our comment with out name, email and website.

- Here if we write something in our `Website` input  field and hit **Post**, it gets stored in a `href` tag in the blog post's comment, as i noticed it through the inspect element.

- So, since here normal methods wont work, we inject the code `Javascript:alert(1)` directly into the `Website` field and hit submit to solve the lab.

- So this triggers an `alert()` in the website whenever the name of the commenter is clicked.