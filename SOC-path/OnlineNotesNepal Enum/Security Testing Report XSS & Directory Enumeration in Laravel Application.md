
**Date**: April 11, 2025  
**Tested by**: Prayush Hada
**Tested Application**: Onlinenotesnepal (Laravel-based)

---

#### **1. Introduction**

This report summarizes the security testing performed on the Laravel-based application **Onlinenotesnepal**. The goal was to test for common web application vulnerabilities, including **Cross-Site Scripting (XSS)** and potential **directory enumeration**.

---

#### **2. Methodology**

Testing was performed using the following techniques:

- **Manual testing** for XSS vulnerabilities.
    
- **Directory enumeration** to understand the Laravel directory structure.
    
- **Analysis of common misconfigurations** like SQL Injection and session handling.
    

---

#### **3. Findings**

##### **3.1. Cross-Site Scripting (XSS)**

- **Initial Testing**:  
    Basic XSS payloads were tested on input fields and URL parameters. However, it was noted that **Laravel's automatic sanitization** and validation mechanisms prevent the successful execution of malicious JavaScript code in most areas.
    
- **Failed XSS Injection**:  
    XSS attempts using payloads like `"><script>alert(1)</script>` in `name` fields and URL parameters were unsuccessful due to Laravel’s built-in protection.  
    This indicates that **Laravel's default sanitization** (using functions like `e()` and `{{ }}`) is preventing such attacks.
    
- **Ajax/JavaScript Injection**:  
    Testing the `markAsRead` function indicated that injecting JavaScript directly via URL manipulation (like `admin/notification/{id}`) was not feasible. The URL was prepared and sanitized before processing, making it resistant to XSS.
    

##### **3.2. Directory Enumeration and Exploration**

- **Public Directory**:  
    The application’s public directory structure was explored, but no critical misconfigurations were found.  
    Laravel’s `public/` directory did not expose sensitive files like `.env` or configuration files.
    
- **Routes and Controllers**:  
    No hidden or exposed routes were found in the `routes/` directory that could allow unauthorized access to admin pages.  
    The application’s routes were examined, but **no obvious vulnerabilities** were identified for exploitation via brute-forcing or unauthorized access.
    
- **Models and Database**:  
    While inspecting models (e.g., `User`, `Notification`), it was found that the application relies on **Eloquent ORM** with automatic protection against SQL injection. The database was not directly exposed, and raw queries were not visible.
    

##### **3.3. Laravel Configuration and Logs**

- **Log Files**:  
    The `storage/logs/` directory was not accessible, indicating proper access controls are in place.
    
- **Configuration Files**:  
    The `.env` file was not exposed in the public directory, which is a positive sign. However, ensure that no sensitive information like database credentials or session tokens are logged in application logs.
    

##### 3.4 SQL Error Revealing Sensitive Information (Information Disclosure Vuln)

#### **Overview:**

During testing, a significant SQL error was triggered, revealing sensitive information about the database structure, including table names, column names, and the database name itself. This error provides valuable intelligence for an attacker, which can be exploited for further attacks.

#### **Error Message:**
```error
SQLSTATE[42S02]: Base table or view not found: 1146 Table 'u251232636_onlintenotes.notifications' doesn't exist (SQL: select * from `notifications` where `notifications`.`notifiable_id` = 345 and `notifications`.`notifiable_id` is not null and `notifications`.`notifiable_type` = App\Models\User and `read_at` is null order by `created_at` desc)

```

- **Database Name**: The error exposed the database name `u251232636_onlintenotes`.
    
- **Table Name**: The query revealed the `notifications` table, along with details about its structure.
    
- **Field Names**: Column names like `notifiable_id`, `notifiable_type`, `read_at`, and `created_at` were also visible.
    
- **File Path**: The error provided the path to the source of the issue, specifically in `app/Http/Controllers/Backend/NotificationController.php`.
    

#### **Impact:**

- **Database Structure Exposure**: The visibility of table names, field names, and database names gives an attacker a roadmap of the database structure, which could be used to plan SQL injection or other attacks.
    
- **SQL Injection**: Knowing the structure of the database, attackers might attempt SQL injection attacks, targeting specific tables and fields.
    
- **Information Disclosure**: Attackers could gather detailed information about the application's database and potentially manipulate or exfiltrate data.
    

#### **Recommendations:**

- Disable detailed error messages in production environments by setting `APP_DEBUG=false` in the `.env` file.
    
- Customize error pages to avoid exposing database details, stack traces, and file paths to end users.
    
- Review error handling practices to ensure that only generic messages are shown in production environments, and sensitive details are logged internally.

---

#### **4. Recommendations**

- **XSS Mitigation**:  
    While Laravel provides solid defense against XSS attacks by escaping user input, it's important to always use the `{{ }}` syntax for output encoding and avoid `{!! !!}` unless absolutely necessary.
    
- **Monitor for Potential SQL Injection**:  
    Although Laravel uses Eloquent ORM, any direct use of raw queries via `DB::raw()` should be avoided. Always use parameterized queries or Eloquent to interact with the database.
    
- **Improve Logging Practices**:  
    Review your application’s logging configuration to ensure that sensitive data (e.g., passwords, session tokens) is never written to logs, even in the case of errors.
    
- **Access Control**:  
    Ensure that all admin routes are properly secured, either by middleware (like `auth` or `admin`) or access control layers.
    
- **Regular Security Audits**:  
    Continue to perform regular security audits, especially focusing on potential misconfigurations or accidental exposure of files through the `public/` directory.


---

#### **5. Conclusion**

The **Onlinenotesnepal** Laravel application demonstrates good security practices, including built-in protections against XSS and SQL Injection. However, consistent attention to secure coding practices, access control, and error handling should be maintained to prevent any potential vulnerabilities. Regular security testing is recommended to further strengthen the system.

---