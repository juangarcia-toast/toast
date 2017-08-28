var http = require('https');
var querystring = require('querystring');

const token_url = '/usermgmt/v1/oauth/token';
const add_employee_url = '/labor/v1/employees';

var post_data = querystring.stringify({
	'grant_type': '_',
	'client_id': '_',
	'client_secret': 'JD4GfnQwExX3OblPUcrl'	
});

var post_options = {
	host: 'ws-sandbox-api.eng.toasttab.com',
	path: '',
	method: 'POST',
	headers:  {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': post_data.length,
	}
}

let token = '';

post_options.path = token_url;
var post_request_token = http.request(post_options, (res) => {
	res.on('data', (chunk) => {
		let response = JSON.parse(chunk);
		token = response.access_token;
		console.log('token: ' + token);
		
		
	});
});



post_options.path = add_employee_url;
var post_add_employee = http.request(post_options, (res) =>  {
	res.on('data', (chunk) => {
		console.log('add employee response: ' + chunk);
	})
});

post_request_token.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
	console.error(e);
});


post_request_token.write(post_data);
post_add_employee.write(post_data);
post_request_token.end();