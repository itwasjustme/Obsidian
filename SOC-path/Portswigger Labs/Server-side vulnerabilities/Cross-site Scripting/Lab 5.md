# Lab: DOM XSS in jQuery anchor `href` attribute sink using `location.search` source

This lab contains a DOM-based cross-site scripting vulnerability in the submit feedback page. It uses the jQuery library's `$` selector function to find an anchor element, and changes its `href` attribute using data from `location.search`.

To solve this lab, make the "back" link alert `document.cookie`.

1. On the Submit feedback page, change the query parameter `returnPath` to `/` followed by a random alphanumeric string.
2. Right-click and inspect the element, and observe that your random string has been placed inside an a `href` attribute.
3. Change `returnPath` to:
    
    `javascript:alert(document.cookie)`
    
    Hit enter and click "back".

![[Screenshot From 2025-02-16 07-17-12.png]]


![[Screenshot From 2025-02-16 07-17-58.png]]