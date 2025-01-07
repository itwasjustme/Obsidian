## Image Forensics

#### What the challenge was about?
	It was about finding the location of a lake through a captured image.

### Write-up

I downloaded the image which was provided, and straight up extracted the meta data from the image using the popular ***exiftool***.

I looked and  surfed through the metadata, i had no idea at first but when i saw GPS location, it gave me a hint about something, I straight up googled if i had gotten the right idea. After the search, my hunch was right, ***exiftool*** can provide us the  GPS coordinates where the photo was taken, I copied the coordinates and pasted it in the GPS finder website I searched up for this specific task. I used **gps-coordinates.org** website to enter the GPS location and found the exact lake in the photo.

The lake was **Emerald Lake** located in **Yoho National Park, British Columbia, Canada**.


## What I learned?
	I learned that exiftool was powerful enough to extract GPS location of the 
	place that it was taken in.

