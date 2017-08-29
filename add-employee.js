/* https://stratexpartners.slack.com/archives/D0DED7648/p1503085484000467 */

var http = require('https');
var querystring = require('querystring');

const token_url = '/usermgmt/v1/oauth/token';
const add_employee_url = '/labor/v1/employees';

var post_data_token = querystring.stringify({
	'grant_type': 'client_credentials',
	'client_id': 'juan',
	'client_secret': 'asdf!'
});

var post_data = {
	'Authorization': '',
	'Toast-Restaurant-External-ID': '9d58268a-d378-464b-897d-84111c7b34dd',
	'Content-Type': 'application/json',
}

var test_data = {
  "entityType": "RestaurantUser",
  "firstName": "Josephine",
  "lastName": "Gauthier",
  "email": "jgauthier@example.com",
  "jobReferences": [
    {
      "guid": "33db96bf-7a01-4063-a9e6-d87098045487",
      "entityType": "RestaurantJob"
    }
  ]
}

var post_options = {
	host: 'ws-sandbox-api.eng.toasttab.com',
	path: '',
	data: 'c:\projects\toast\employee.json',
	method: 'POST',
	headers:  {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
}

let token = '';


post_options.path = token_url;
var post_request_token = http.request(post_options, (res) => {
	res.on('data', (chunk) => {
		let response = JSON.parse(chunk);
		token = response.access_token;
		
		
		post_options.path = add_employee_url;		
		post_data.Authorization = 'Bearer ' + token;		
		post_options.headers = post_data;
		console.log(post_options);
		var post_add_employee = http.request(post_options, (res) =>  {
			res.on('data', (chunk) => {
				console.log('add employee response: ' + chunk);
			})
		});

		post_add_employee.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
			console.error(e);
		});
		
		post_add_employee.write(JSON.stringify(test_data));		
		post_add_employee.end();
	});
});





post_request_token.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
	console.error(e);
});


post_request_token.write(post_data_token);


post_request_token.end();