
**Target URL:**  
`http://medhavicollege.edu.np`

---

### **1. Information Gathered from the Website**:

#### **A. Publicly Accessible Files**:

- **Image**:  
    The image file `new-year-celebration.jpg` was found accessible publicly at:  
    `http://medhavicollege.edu.np/public/uploads/0000/1/2024/07/02/new-year-celebration.jpg`.
    
    This could indicate that file permissions are misconfigured and allow unauthenticated access to certain file directories. While not an immediate security risk, this could potentially expose sensitive files or backups if other such files exist in this directory.
    

#### **B. Identifiable URL Routes**:

- From the **JavaScript variable `sarbatraCms`**, the following key routes and URLs were discovered:
    
    - **Login URL**: `http://medhavicollege.edu.np/public/index.php/login`
        
    - **Register URL**: `http://medhavicollege.edu.np/public/index.php/register`
        
    - **Admin URL**: `http://medhavicollege.edu.np/public/index.php/admin`
        
    - **Notification-related URLs**:
        
        - Mark notifications as read: `http://medhavicollege.edu.np/public/index.php/notify/markAsRead`
            
        - Mark all notifications as read: `http://medhavicollege.edu.np/public/index.php/notify/markAllAsRead`
            
        - Load notifications: `http://medhavicollege.edu.np/public/index.php/notify/notifications`
            
    
    These routes could be exploited if misconfigured access control or authentication is present.
    

---

### **2. Potential Security Vulnerabilities Identified**:

#### **A. SQL Injection Potential on Login Page**:

- **Login Form Parameters**:
    
    - `email`: User's email input field.
        
    - `password`: User's password input field.
        
    - **CSRF Token**: `_token` hidden input field, which is meant to prevent Cross-Site Request Forgery attacks.
        
    
    Testing for **SQL injection** was initiated on the login page, but no direct results were obtained via **SQLmap**. However, the form could still be vulnerable to SQL injection, and further testing using different payloads is recommended.
    
- **Manual Testing for SQL Injection**:
    
    - **Payloads to test**:
        
        - `email=' OR 1=1 --`
            
        - `password=' OR 1=1 --`
            
        - `email=' UNION SELECT null, null, null --`
            
    - This can help check if unauthorized login access is possible.
        

#### **B. Exposed Sensitive Data in JavaScript**:

- The **JavaScript configuration** (`sarbatraCms`) exposes sensitive information, such as:
    
    - **API Keys**: `pusher_api_key` (though empty), `pusher_cluster`.
        
    - **Route URLs**: Contains URLs to login, registration, and admin routes. This could help attackers attempt to brute-force or target specific endpoints.
        
    - **Currency and Date Configuration**: Although not immediately exploitable, this type of information can offer insight into backend logic and possibly further attack vectors.
        
    - **Current User & Admin Flags**: `currentUser` and `isAdmin` variables could help attackers determine whether they are logged in or not, and potentially target the admin route.
        
    
    **Risk**: Information leakage may aid attackers in crafting more targeted attacks like brute-forcing or bypassing authentication mechanisms.
    

#### **C. CSRF Token Vulnerability**:

- **Potential Issue**:  
    The login page utilizes a **CSRF token** (`_token`) to protect against cross-site request forgery. However, if not properly handled (e.g., not checking for token validity on the server-side), attackers may attempt to bypass this protection. While it's not directly exploitable at this stage, further review of how the token is validated on the server could reveal weaknesses.
    

---

### **3. Immediate Actionable Findings**:

#### **A. SQL Injection (Login Page)**:

- Although **SQLmap** didn’t return results, there’s still a possibility that the login form is vulnerable to **SQL Injection**. Manual testing with custom payloads (as suggested) should be done to confirm the vulnerability.
    
- **Next Steps**:
    
    - Manually test the `email` and `password` fields for SQL injection.
        
    - Test for **Blind SQL Injection** by sending payloads like `' OR 1=1 --` and checking for any unusual responses (e.g., login success without valid credentials).
        

#### **B. Exposed Sensitive Information in JavaScript**:

- **Potential Exploit**: The exposed `pusher_api_key` and `admin_url` can be exploited by attackers to attempt brute force login on the admin page or manipulate the application via API calls.
    
- **Next Steps**:
    
    - Scrutinize the `admin_url` route and attempt to access the admin panel directly. If there is any misconfiguration or lack of authentication, it could be leveraged to gain unauthorized access.
        
    - Investigate whether API keys are exposed through XSS (Cross-Site Scripting) attacks or other injection vectors.
        

#### **C. CSRF Protection Review**:

- **Next Steps**:
    
    - Review how the CSRF token is validated on the backend.
        
    - Test for **missing or weak CSRF protections** by manually manipulating requests or submitting forms with tampered tokens.
        

---

### **4. Security Recommendations**:

1. **SQL Injection Mitigation**:
    
    - Implement **prepared statements** or **parameterized queries** to prevent SQL injection.
        
    - Ensure all user inputs are sanitized and validated before being used in SQL queries.
        
2. **Exposing Sensitive Information**:
    
    - Move sensitive information (like API keys, routes, etc.) from JavaScript to server-side configuration.
        
    - Ensure that the backend properly validates and handles any sensitive data, especially keys.
        
3. **CSRF Protection**:
    
    - Ensure that CSRF tokens are being **properly validated** on the server side.
        
    - Perform thorough checks to confirm that all POST requests and sensitive actions require a valid CSRF token.
        
4. **Security Headers**:
    
    - Ensure that the appropriate security headers are set, such as `X-Content-Type-Options`, `X-XSS-Protection`, `Strict-Transport-Security`, and `Content-Security-Policy`, to mitigate common attack vectors like XSS, clickjacking, and session hijacking.
        

---

### **5. Next Steps**:

- **Manual Testing**:
    
    - Test the login form for SQL injection and check for potential bypasses with common techniques.
        
    - Investigate the exposed `admin_url` and ensure that it is properly secured with authentication and authorization controls.
        
- **Tools to Use**:
    
    - **Burp Suite** for capturing requests and analyzing form submissions.
        
    - **OWASP ZAP** for detecting common web vulnerabilities.
        
    - **Manual Payloads** for testing SQL injection and CSRF vulnerabilities.
        

---