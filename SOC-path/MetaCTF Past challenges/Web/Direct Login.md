## What the Challenge is About?

In this challenge, you are tasked with accessing ConnectWind's internal employee portal, which stores company policies, HR information, and flags. The goal is to steal the flag by bypassing the login process and accessing the protected page without knowing the password.

## Write-up

1. **Inspection of the Web Page:** I started by inspecting the webpage to search for any clues in the JavaScript code that might provide insight into how authentication works.
    
2. **Found the Authentication Code:** I discovered a jQuery function responsible for handling the login process. This function sends a GET request with the provided username and password to `login.php` for validation.
    


```Javascript

      // Function to display response message
      function set_alert(txt, color) {
        var result = '<div class="alert mb-0 alert-' + color + '">' + txt + '</div>';
        $("#result").html(result);
        $("#result").fadeIn();
      }

      // Check if provided username and password are correct
      function login() {
        $("#result").fadeOut("fast");
        // Send request with credentials
        $.getJSON("login.php",
          {
            "action":"login",
            "username": $("#username").val(),
            "password": $("#password").val()
          }, function (r) {
            if (r.login_successful) {
              // Redirect if login successful
              set_alert('Login successful! Redirecting... <i class="fa-solid fa-spinner fa-spin"></i>', "success");
              setTimeout(function () {
                window.location.href = "./employee_portal.php";
              }, 1500);
            } else {
              // Username or password incorrect
              set_alert("Login failed! Please try again.", "danger");
            }
          }
        );
      }
    
```

3. **Testing Direct Access:** Upon further investigation, I realized that if the login is successful, the page redirects to `employee_portal.php`. However, there is no authentication check on the `employee_portal.php` page itself. I tried accessing this page directly, and to my surprise, it allowed me to view the employee portal and the flag.

## What Was the Vulnerability?

### The Vulnerability: **IDOR (Insecure Direct Object Reference) or CWE-306 (Missing Authentication for Critical Functions)**

The vulnerability here falls under two categories:

1. **Insecure Direct Object Reference (IDOR)**:
    - IDOR occurs when a web application allows users to access an internal resource (in this case, the employee portal) without properly validating whether the user has the correct authorization.
    - In this case, anyone who knows the URL for the `employee_portal.php` page can access it directly without being logged in, simply by entering the URL.

2. **CWE-306: Missing Authentication for Critical Functions**:
    - This refers to the failure to enforce authentication on critical pages or functions that should be protected.
    - The `employee_portal.php` page is sensitive and should only be accessible to authenticated users, but the lack of authentication checks makes it accessible to anyone who knows the URL.

### Why It’s a Vulnerability:

- **No Authentication Check on `employee_portal.php`:**
    - The `login.php` script checks whether the provided credentials are valid and redirects users to the `employee_portal.php` page if successful. However, the `employee_portal.php` page does not verify if the user is actually logged in before displaying the page.
    - This oversight allows unauthorized users to access the employee portal and the flag without any credentials.

## Challenges I Faced:

1. **Initial Approach – Brute Forcing:**
    
    - My first instinct was to attempt brute-forcing the login credentials, but this was unnecessary because the real vulnerability was a lack of authentication on the employee portal itself.
2. **Learning the Vulnerability:**
    
    - I had to read the write-up to fully understand the vulnerability. It was a valuable learning experience, and it highlighted the importance of checking for authentication checks on sensitive pages.

## Conclusion:

This challenge demonstrated the significance of proper authentication checks on critical pages. Even if the login mechanism works correctly, failing to secure sensitive pages like the employee portal can lead to unauthorized access. Moving forward, I’ll be more mindful of these types of vulnerabilities and focus on checking for proper access controls on all critical resources.

