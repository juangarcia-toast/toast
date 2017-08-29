/* https://stratexpartners.slack.com/archives/D0DED7648/p1503085484000467 */

var http = require('https');
var querystring = require('querystring');

var post_data_token = querystring.stringify({
	'grant_type': 'client_credentials',
	'client_id': 'juan',
	'client_secret': 'asdf!'
});

var post_options_token = {
	host: 'ws-sandbox-api.eng.toasttab.com',
	path: '/usermgmt/v1/oauth/token',
	method: 'POST',
	headers:  {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
}


var post_options = {
	host: 'ws-sandbox-api.eng.toasttab.com',
	path: '/labor/v1/employees',
	method: 'GET',
	headers: {
		'Authorization': '',
		'Toast-Restaurant-External-ID': '9d58268a-d378-464b-897d-84111c7b34dd'
	}
}

let token = '';

console.log(post_options_token);
console.log('getting token...');
var post_request_token = http.request(post_options_token, (res) => {
	res.on('data', (chunk) => {
		
		let response = JSON.parse(chunk);
		console.log('response from token ....');
		console.log(response);
		token = response.access_token;
		console.log('token ', token);
		
		
		post_options.headers['Authorization'] = 'Bearer ' + token;
		console.log(post_options);
		let post_add_employee = http.request(post_options, (res) =>  {
			res.on('data', (chunk) => {
				console.log('add employee response: ' + chunk);
			})
		});

		post_add_employee.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
			console.error(e);
		});

		
		console.log('getting employees...');
		
		
		post_add_employee.write(querystring.stringify({}));
		post_add_employee.end();
	});
});


post_request_token.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
	console.error(e);
});


post_request_token.write(post_data_token);


post_request_token.end();