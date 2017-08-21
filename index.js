var http = require('https');
var querystring = require('querystring');

var post_data = querystring.stringify({
	'grant_type': 'client_credentials',
	'client_id': 'juan',
	'client_secret': 'asdf!'	
});

var post_options = {
	host: 'ws-sandbox-api.eng.toasttab.com',
	path: '/usermgmt/v1/oauth/token',
	method: 'POST',
	headers:  {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': post_data.length,
	}
}

var post_request = http.request(post_options, function(res) {
	res.on('data', function(chunk) {
		console.log('response ' + chunk);
	});
});

post_request.on('error', (e) => {
	console.error(`problem with request: ${e.message}`);
	console.error(e);
});


post_request.write(post_data);
post_request.end();