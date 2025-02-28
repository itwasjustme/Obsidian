
# Lab: DOM XSS in `document.write` sink using source `location.search`

This lab contains a DOM-based cross-site scripting vulnerability in the search query tracking functionality. It uses the JavaScript `document.write` function, which writes data out to the page. The `document.write` function is called with data from `location.search`, which you can control using the website URL.

To solve this lab, perform a cross-site scripting attack that calls the `alert` function.

- First I searched a alphanumeric unique character `abcd123`, then opened the developer tools to check where the alphanumeric characters were, and found it in two places, inside a `<h1>` tag and another inside a `<img>` tag. 

![[Screenshot From 2025-02-09 12-16-27.png]]

- Since our main focus here is DOM based XSS, we are ought to bypass the path in the `img` tag. we can bypass using ``"><svg onload=alert(1)>``

![[Screenshot From 2025-02-09 12-20-19.png]]


## Success! Though I didn't understand much.