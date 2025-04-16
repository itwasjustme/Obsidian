### **U.A. High School - TryHackMe Write-up**

The "U.A. High School" room on TryHackMe is a themed room inspired by the anime _My Hero Academia_. The room focuses on cybersecurity challenges through the lens of Hero Course students at U.A. High School, who train to become heroes. The room's objectives are to find the user and root flags while overcoming multiple obstacles.

---

### **Room Objectives**

- **Find the User Flag**
- **Find the Root Flag**

---

### **Getting Started**

The first step is to scan the IP address of the target machine to gather information about open ports. Using **nmap**, I discovered two open ports:

- **Port 80 (HTTP)**
- **Port 22 (SSH)**

---

### **Directory Enumeration**

Next, I used **GoBuster** for directory enumeration. This tool revealed the `/assets` directory. However, upon accessing it, I received a **404 Not Found** error.

I tried to enumerate subdirectories under `/assets`, but they didn’t provide any useful results. Despite this, I kept enumerating and found that there was a **PHP** service running, which could potentially lead to an attack vector.

---

### **Command Injection Vulnerability**

While exploring the PHP page, I discovered that the **index.php** file was present. By checking for command injection, I noticed a **Base64** string embedded in the page, which appeared to be a potential clue.

I decoded the **Base64** string and found references to files like:

- **images**
- **index.php**
- **styles.css**

It became clear that the **index.php** file might be vulnerable to **command injection**. To confirm this, I tested a simple **command injection** attack and was able to gain a reverse shell.

---

### **Reverse Shell**

To set up the reverse shell, I configured **Netcat** on my attacker machine to listen on port **4444**. Using the **PHP exec()** function within the command injection, I was able to execute a reverse shell and gain access to the system as the **www-data** user.

---

### **File Transfer**

Once inside the victim's machine, I found two important files. I transferred these files from the victim’s machine to my local machine using **Netcat** on a different port.

Upon transferring, I noticed the file was corrupted. To fix the corrupted file, I used the **MagicBytes** tool (available on GitHub). This tool allowed me to restore the file to its proper format, though a manual fix using a hex editor could also work.

---

### **Steganography**

After fixing the file, I ran a **steganography** tool (**steghide**) to extract hidden contents. The extracted file required a passphrase to unlock.

Through further enumeration of the system, I located a **passphrase.txt** file. This file contained a **Base64-encoded** password. Once decoded, I used this passphrase to extract the hidden credentials of the **deku** user.

With the credentials in hand, I attempted to log in as the **deku** user and successfully retrieved the **user.txt** flag.

---

### **Privilege Escalation**

Now that I had access as the **deku** user, I proceeded to attempt **privilege escalation**. I began by running the **sudo -l** command to check for any sudo privileges.

I then reviewed the **feedback.sh** file and noticed that it was vulnerable. The script utilized the **eval** function, which could execute arbitrary commands. This presented a clear attack vector for privilege escalation.

I exploited this by adding the **deku** user to the **sudoers** file and granted the user **NOPASSWD** privileges. This allowed me to run **sudo** commands without entering a password.

Next, I escalated privileges by executing **/bin/bash** with **sudo** access and gained root access to the system.

Finally, I retrieved the **root.txt** flag.

---

### **Conclusion**

By exploiting the command injection vulnerability in the **index.php** file, transferring files, utilizing steganography, and escalating privileges via the vulnerable **feedback.sh** script, I was able to complete the room.

I successfully found both the **user.txt** and **root.txt** flags, thereby completing the **U.A. High School** room on TryHackMe.

---

### **Lessons Learned**

- Command injection can be a powerful attack vector when dealing with PHP applications.
- Tools like **MagicBytes** and **steghide** are useful for dealing with corrupted or hidden files.
- Reviewing sudoers files and scripts for vulnerabilities can lead to privilege escalation.


### Reference

https://grimthereaperteam.medium.com/u-a-high-school-tryhackme-writeup-9c1084b708ca