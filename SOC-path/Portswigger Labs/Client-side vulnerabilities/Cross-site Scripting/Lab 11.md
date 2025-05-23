# Lab: DOM XSS in AngularJS expression with angle brackets and double quotes HTML-encoded


This lab contains a DOM-based cross-site scripting vulnerability in a AngularJS expression within the search functionality.

AngularJS is a popular JavaScript library, which scans the contents of HTML nodes containing the `ng-app` attribute (also known as an AngularJS directive). When a directive is added to the HTML code, you can execute JavaScript expressions within double curly braces. This technique is useful when angle brackets are being encoded.

To solve this lab, perform a cross-site scripting attack that executes an AngularJS expression and calls the `alert` function


# Writeup

1. Enter a random alphanumeric string into the search box.
2. View the page source and observe that your random string is enclosed in an `ng-app` directive.
3. Enter the following AngularJS expression in the search box:
    
    `{{$on.constructor('alert(1)')()}}`
4. Click **search**.


# Reference:
https://www.youtube.com/watch?v=P7_JPsX1ses&t=232s