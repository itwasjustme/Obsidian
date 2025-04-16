
**DuckDNS Setup and Dynamic DNS Configuration Report**

**1. Introduction** DuckDNS is a free Dynamic DNS service that allows devices with dynamic public IP addresses to have a consistent domain name. This report documents the setup and configuration of DuckDNS on an Ubuntu Server VM, which is used for SSH access and log analysis.

**2. Objective**

- Set up DuckDNS on Ubuntu Server for remote access using a consistent domain name.
    
- Ensure seamless SSH access regardless of IP changes.
    
- Automate IP updates using a script.
    

**3. System Setup**

- **Host Machine**: Kali Linux
    
- **Target Machine**: Ubuntu Server (running as a VM)
    
- **Network Setup**: Connected via local Wi-Fi with dynamic public IP
    
- **Firewall**: UFW enabled with necessary rules
    

**4. DuckDNS Account Setup**

1. Created an account at [DuckDNS](https://www.duckdns.org/).
    
2. Generated a token for authentication.
    
3. Created a subdomain (e.g., `myserver.duckdns.org`).
    

**5. Installing DuckDNS on Ubuntu Server**

1. SSH into the Ubuntu Server from Kali:
    
    ```
    ssh username@<ubuntu-server-ip>
    ```
    
2. Created a directory for DuckDNS:
    
    ```
    mkdir -p ~/duckdns-config && cd ~/duckdns-config
    ```
    
3. Created the DuckDNS update script:
    
    ```
    nano duckdns-update.sh
    ```
    
    **Script Content:**
    
    ```
    #!/bin/bash
    echo url="https://www.duckdns.org/update?domains=myserver&token=your-token&ip=" | curl -k -o ~/duckdns-config/duck.log -K -
    ```
    
4. Made the script executable:
    
    ```
    chmod +x duckdns-update.sh
    ```
    
5. Ran the script manually to test:
    
    ```
    ./duckdns-update.sh
    ```
    
6. Verified the output:
    
    ```
    cat ~/duckdns-config/duck.log
    ```
    
    **Expected Output:**
    
    ```
    OK
    ```
    

**6. Automating IP Updates** To ensure the IP updates automatically, a cron job was added:

1. Opened the crontab editor:
    
    ```
    crontab -e
    ```
    
2. Added the following line to update DuckDNS every 5 minutes:
    
    ```
    */5 * * * * ~/duckdns-config/duckdns-update.sh >/dev/null 2>&1
    ```
    
3. Saved and exited the editor.
    
4. Restarted cron service:
    
    ```
    sudo systemctl restart cron
    ```
    

**7. Verifying the Configuration**

- Checked the DuckDNS dashboard to confirm IP updates.
    
- Verified SSH access using:
    
    ```
    ssh username@myserver.duckdns.org
    ```
    
- Ensured logs were updating correctly:
    
    ```
    tail -f ~/duckdns-config/duck.log
    ```
    

**8. Firewall Considerations**

- Ensured UFW allows SSH connections:
    
    ```
    sudo ufw allow 22/tcp
    ```
    
- Checked UFW status:
    
    ```
    sudo ufw status
    ```
    

**9. Snapshot Creation** To preserve the setup, a snapshot of the Ubuntu Server VM was taken.

**10. Conclusion** With DuckDNS configured, the Ubuntu Server is now accessible remotely using a static domain name, regardless of changing IPs. The automation ensures continuous updates, making remote management seamless.