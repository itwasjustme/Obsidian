
### **1. System Overview**

#### **Kali Linux (Host)**

- **IP Address**: 192.168.1.10
- **Role**: Host system running **Kali Linux** for penetration testing, exploitation, and analysis.
    - Tools used: Nmap, Metasploit, Hydra, etc.
    - **Network Mode**: Bridged Mode for direct communication with the Ubuntu server VM on the same network.

#### **Ubuntu Server (VM)**

- **IP Address**: 192.168.1.7
- **Role**: Ubuntu server running services like **SSH**, **HTTP**, and **HTTPS** for testing purposes and **log analysis**.
    - Services: SSH (Port 22), HTTP (Port 80), HTTPS (Port 443).
    - **Network Mode**: Bridged Mode, allowing the VM to be part of the same network as the host.
    - **Log Analysis**: Collecting logs to monitor for SSH activity, failed login attempts, etc.

---

### **2. Network Configuration**

- **Network Mode**: Both Kali Linux and Ubuntu Server are configured to use **Bridged Mode**, which means both machines are on the same local network (`192.168.1.x`).
    - The network bridge allows both VMs to communicate with each other and the external network, ensuring they are part of the same local subnet.
    - **Gateway**: 192.168.1.1 (Assumed local network gateway).

#### **Command for Checking IP Address (Ubuntu Server)**:

```bash
ip a
```

This shows the network interfaces and IP address assigned to the Ubuntu server VM.

### **3. Firewall Configuration**

#### **Kali Linux Firewall**:

- **UFW (Uncomplicated Firewall)** is configured to only allow SSH access from the Kali machine’s IP (192.168.1.10).

#### **Ubuntu Server Firewall**:

- **UFW Rules**:
    - Allow incoming SSH connections from Kali IP (`192.168.1.10`).
    - Open ports for **HTTP (80)** and **HTTPS (443)**.

#### **Commands to Configure UFW on Ubuntu**:

1. **Install UFW** (if not already installed):

```shell
sudo apt install ufw
```


2. **Allow SSH from Specific IP (Kali IP)**:

```shell
sudo ufw allow from 192.168.1.10 to any port 22
```

3. **Allow HTTP and HTTPS**:

```shell
sudo ufw allow 80/tcp 
sudo ufw allow 443/tcp
```

4. **Enable UFW**:

```shell
sudo ufw enable
```

5. **Check Status**

```shell
sudo ufw status verbose
```


### **4. Security Measures**  

1. **Fail2ban (Prevent Brute Force):**

Fail2ban is installed to prevent brute-force attacks by banning IP addresses after multiple failed login attempts.

**Installation:**

```bash
sudo apt install fail2ban
```

**Configuration:**

By default, Fail2ban is configured to protect SSH. You can modify settings in `/etc/fail2ban/jail.local`.

**Check Fail2ban Status:**

```bash
sudo fail2ban-client status
```

**Fail2ban Log:**

To monitor banned IPs:

```bash
sudo cat /var/log/fail2ban.log
```

---

### **5. Log Analysis Setup on Ubuntu Server**

**Role of Ubuntu Server:**  
Apart from being a test machine, it is used for log analysis. Logs are collected from SSH access attempts, and activity is monitored to detect unauthorized access.

**Logs to Monitor:**

- **SSH Logs:** `/var/log/auth.log`  
    Tracks successful and failed login attempts.
    
- **System Logs:** `/var/log/syslog`  
    General system events, including service starts/stops.
    
- **Firewall Logs:**  
    If UFW logging is enabled, it will track incoming and outgoing connections.
    

**Commands for Log Analysis:**

- **View SSH Logs (successful and failed login attempts):**

```bash
sudo cat /var/log/auth.log | grep sshd
```

- **View Failed Login Attempts:**

```bash
sudo cat /var/log/auth.log | grep "Failed"
```

- **View General System Logs:**

```bash
sudo cat /var/log/syslog
```

- **Monitor Real-Time Logs (useful for live log monitoring):**

```bash
sudo tail -f /var/log/auth.log
```

---

### **6. Testing & Verification**  
**SSH Connection Test:**

- **From Kali:** SSH into Ubuntu server using your key-based authentication.

```bash
ssh username@192.168.1.7
```

- **From Termux (unauthorized attempt):**  
    If you try to SSH from Termux or an IP not on the allowed list, it should be blocked by the firewall.

**Logs After Successful SSH Login:**

Check `/var/log/auth.log` to verify the connection:

```bash
sudo cat /var/log/auth.log | grep "Accepted"
```

You should see something like:

```
Feb 26 12:34:56 ubuntu-server sshd[12345]: Accepted publickey for username from 192.168.1.10 port 22 ssh2
```

**Logs After Failed SSH Login:**

Check `/var/log/auth.log` for failed login attempts:

```bash
sudo cat /var/log/auth.log | grep "Failed"
```

Example failed log entry:

```
Feb 26 12:34:56 ubuntu-server sshd[12345]: Failed password for invalid user username from 192.168.1.50 port 22 ssh2
```

**Firewall Test:**

- **Attempt SSH from Termux (unauthorized IP):**  
    The firewall should block access, and you should not see a successful SSH login in the logs.

---

### **7. Future Plans and Improvements**

- **Automate Log Analysis:**  
    Set up a script to regularly parse logs and alert you on unusual activity.
    
- **Expand Lab:**  
    Add more VMs for additional roles like Windows Server for Active Directory testing.
    
- **Penetration Testing:**  
    Use Kali Linux to test the vulnerabilities of the Ubuntu server, then monitor log files for signs of compromise.
    

---

**Summary of Commands**

- **UFW Commands:**
    
    - Allow SSH from specific IP:
        
        ```bash
        sudo ufw allow from 192.168.1.10 to any port 22
        ```
        
    - Allow HTTP/HTTPS:
        
        ```bash
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        ```
        
    - Enable UFW:
        
        ```bash
        sudo ufw enable
        ```
        
    - Check UFW status:
        
        ```bash
        sudo ufw status
        ```
        
- **SSH Configuration:**
    
    - Disable password authentication:  
        Edit `/etc/ssh/sshd_config` and set `PasswordAuthentication no`
        
    - Restart SSH service:
        
        ```bash
        sudo systemctl restart ssh
        ```
        
- **Log Commands:**
    
    - View SSH logs:
        
        ```bash
        sudo cat /var/log/auth.log | grep sshd
        ```
        
    - View failed login attempts:
        
        ```bash
        sudo cat /var/log/auth.log | grep "Failed"
        ```
        
    - Monitor real-time logs:
        
        ```bash
        sudo tail -f /var/log/auth.log
        ```
        

---


