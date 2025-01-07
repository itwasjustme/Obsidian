>
## Write-Up

1) **What is the CNAME of shop.website.thm?**

```shell
user@thm:~$ nslookup --type=CNAME shop.website.thm  
Server: 127.0.0.53  
Address: 127.0.0.53#53  
  
Non-authoritative answer:  
shop.website.thm canonical name = shops.myshopify.com  
```

2) **What is the value of the TXT record of website.thm?**

```shell
user@thm:~$ nslookup --type=TXT website.thm  
Server: 127.0.0.53  
Address: 127.0.0.53#53  

Non-authoritative answer:  
website.thm text = "THM{7012BBA60997F35A9516C2E16D2944FF}"  
```

3) **What is the numerical priority value for the MX record?**

```shell
user@thm:~$ nslookup --type=MX website.thm  
Server: 127.0.0.53  
Address: 127.0.0.53#53  

Non-authoritative answer:  
website.thm mail exchanger = 30 alt4.aspmx.l.google.com  

```

4) **What is the IP address for the A record of www.website.thm?**

```shell
user@thm:~$ nslookup --type=A website.thm  
Server: 127.0.0.53  
Address: 127.0.0.53#53  
  
Non-authoritative answer:  
Name: website.thm  
Address: 10.10.10.10  
```
  
