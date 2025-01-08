
Like most pentesting tools, nmap is run from the terminal. There are versions available for both Windows and Linux. For this room we will assume that you are using Linux; however, the switches should be identical. Nmap is installed by default in both Kali Linux and the [TryHackMe Attack Box.](https://tryhackme.com/my-machine)

Nmap can be accessed by typing `nmap` into the terminal command line, followed by some of the "switches" (command arguments which tell a program to do different things) we will be covering below.

All you'll need for this is the help menu for nmap (accessed with `nmap -h`) and/or the nmap man page (access with `man nmap`). For each answer, include all parts of the switch unless otherwise specified. This includes the hyphen at the start (`-`).

## Answer the following

1) **What is the first switch listed in the help menu for a 'Syn Scan' (more on this later!)?**

```Answer
-sS
```

2) **Which switch would you use for a "UDP scan"?**

```Answer
-sU
```

3) **If you wanted to detect which operating system the target is running on, which switch would you use?**

```Answer
-O
```

4) **Nmap provides a switch to detect the version of the services running on the target. What is this switch?**

```Answer
-sV
```

5) **The default output provided by nmap often does not provide enough information for a pentester. How would you increase the verbosity?**

```Answer
-v
```

6) **Verbosity level one is good, but verbosity level two is better! How would you set the verbosity level to two?  (Note: it's highly advisable to always use _at least_ this option)**

```Answer
-vv
```

7) **We should always save the output of our scans -- this means that we only need to run the scan once (reducing network traffic and thus chance of detection), and gives us a reference to use when writing reports for clients. What switch would you use to save the nmap results in three major formats?**

```Answer
-oA
```

8) **What switch would you use to save the nmap results in a "normal" format?**

```Answer
-oN
```

9) **A very useful output format: how would you save results in a "grepable" format?**

```Answer
-oG
```

10) **Sometimes the results we're getting just aren't enough. If we don't care about how loud we are, we can enable "aggressive" mode. This is a shorthand switch that activates service detection, operating system detection, a traceroute and common script scanning.How would you activate this setting?**

```Answer
-A
```

11) **Nmap offers five levels of "timing" template. These are essentially used to increase the speed your scan runs at. Be careful though: higher speeds are noisier, and can incur errors! How would you set the timing template to level 5?**

```Answer
-T5
```

12) **We can also choose which port(s) to scan. How would you tell nmap to only scan port 80?**

```Answer
-p 80
```

13) **How would you tell nmap to scan ports 1000-1500?**

```Answer
-p 1000-1500
```

14) **A very useful option that should not be ignored: How would you tell nmap to scan _all_ ports?**

```Answer
-p-
```

15) **How would you activate a script from the nmap scripting library (lots more on this later!)?**

```Answer
--script
```

16) **How would you activate all of the scripts in the "vuln" category?**

```Answer
--script=vuln
```