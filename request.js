var request = require('request');
var querystring = require('querystring');

var post_data = querystring.stringify({
	'grant_type': 'client_credentials',
	'client_id': 'juan',
	'client_secret': 'asdf!'
});

// request.headers = post_headers;

request.post(
    'https://ws-sandbox-api.eng.toasttab.com/usermgmt/v1/oauth/token?' + post_data,
    function (error, response, body) {
		console.log(body);
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);