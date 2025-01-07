### Vulnerable Code Example


```php
<?php 
// Base directory where files are stored 
$baseDir = '/var/www/uploads/';  // Get the filename from user input (via GET request) 
$filename = $_GET['file'];  
// Construct the full file path 
$filePath = $baseDir . $filename;  
// Check if the file exists and serve it 
if (file_exists($filePath)) {     
	echo "File contents:\n";     
	echo file_get_contents($filePath); 
} else {     
	echo "File not found."; 
} 
?>
```
---

### How This Can Be Exploited

#### Scenario

Imagine this script is running on a server and is accessible at `http://example.com/download.php`.

If a user makes the following request:

```bash
http://example.com/download.php?file=../../../etc/passwd
```

The value of `$_GET['file']` becomes `../../../etc/passwd`. The script appends this to `$baseDir`, resulting in:

php

Copy code

`$filePath = '/var/www/uploads/../../../etc/passwd';`

The `file_exists()` function will resolve the path and find that `/etc/passwd` exists on the server. Then, `file_get_contents($filePath)` will read and display its contents, exposing sensitive information.

---

### Exploit Example

By visiting:

bash

Copy code

`http://example.com/download.php?file=../../../etc/passwd`

The attacker can see the contents of `/etc/passwd`, like this:

```Ruby
root:x:0:0:root:/root:/bin/bash daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin bin:x:2:2:bin:/bin:/usr/sbin/nologin ...
```

---

### How to Fix This Vulnerability

To prevent this, validate and sanitize user input:

```php
<?php 
// Base directory where files are stored 
$baseDir = '/var/www/uploads/';  
// Get the filename from user input 
$filename = $_GET['file']; 
// Whitelist allowed filenames 
$allowedFiles = ['document.txt', 'image.png', 'notes.txt'];  
if (in_array($filename, $allowedFiles)) {     
	// Construct the full file path     
	$filePath = $baseDir . $filename;     
	// Check if the file exists and serve it     
	if (file_exists($filePath)) {         
		echo "File contents:\n";         
		echo file_get_contents($filePath);     
	} else {         
		echo "File not found.";     
	} 
} else {     
	echo "Invalid file."; 
	} 
?>
```
#### What Changed?

1. **Whitelist Approach**: Only allow specific filenames that are known to be safe.
2. **No Arbitrary Input**: Users can't provide `../../../etc/passwd` or any other malicious input.

---

### Alternative Fix: Canonical Path Validation

Another method is to canonicalize the path and ensure it stays within the base directory:


```php
<?php $baseDir = '/var/www/uploads/'; 
$filename = $_GET['file'];  
// Resolve the full canonical path 
$filePath = realpath($baseDir . $filename);  
// Check if the path is valid and within the base directory 
if ($filePath !== false && strpos($filePath, $baseDir) === 0) {     
	if (file_exists($filePath)) {         
		echo "File contents:\n";         
		echo file_get_contents($filePath);     
	} else {         
		echo "File not found.";     
	} 
} else {     
	echo "Invalid file path."; 
} 
?>
```