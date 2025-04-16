Overview:
Thank you for registering to the Online Notepad Service. Your assigned credentials are as follows:

User: `noel`

Pass: `pass1234`

Our services are built with security in mind. Rest assured that your notes will only be visible to you and nobody else.

**Note:** To start the target machine, click the Start Machine button:

Wait 1-2 minutes for the target machine to start. Once it has fully booted, the target machine IP will appear here:

`10.10.164.130`

You can then use the AttackBox (see the Start Here challenge in your CTF dashboard) to attack the target machine's IP address.

# Writeup:

**Approach:**

1. **Reconnaissance:** I started by exploring the web app’s functionalities, particularly how notes were stored and accessed.
    
2. **Analyzing the URL:** While navigating through the app, I noticed that each note had a unique ID in the URL (e.g., `example.com/note?id=1).`
    
3. **Testing for IDOR:** I suspected the app might not be enforcing proper access controls. By changing the ID in the URL to `0` (`example.com/note?id=0`), I was able to access a note that I wasn't supposed to see.
    
4. **Capturing the Flag:** The flag was stored in this exposed note, confirming an **Insecure Direct Object Reference (IDOR)** vulnerability.
    

**Takeaways:**

- **Broken access control** is a critical issue in web applications, and sequential IDs often expose vulnerabilities.
    
- Always **validate permissions server-side** rather than relying on client-side controls.
    
- Small wins like these reinforce the importance of **testing for common web security flaws** in real-world applications.
    

**Next Steps:**  
On to the next category! Let’s see what other challenges Hackfinity Battle has in store. 🚀