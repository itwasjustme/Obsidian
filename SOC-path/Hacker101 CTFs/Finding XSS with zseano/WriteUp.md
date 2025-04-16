
### **XSS Vulnerability in Profile Feed**

**Vulnerability**: Reflected XSS in the comment section.

- **Description**: While submitting a comment on the profile feed, the input (`'-alert(1)-'`) is reflected back on the page without proper sanitization or encoding, resulting in an **alert(1)** popup when the page is rendered. This is an example of **reflected XSS** where user input is executed as JavaScript.
    
- **Exploitation**: Injecting the payload `'-alert(1)-'` into the comment box triggers a JavaScript alert when the comment is displayed on the page.
    
- **Impact**: Potential for further attacks like **cookie theft** or **DOM manipulation** if the vulnerability is exploited.
    

**Fix**: Properly sanitize and encode user input, especially when it's reflected in the page’s output.