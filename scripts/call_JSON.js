/* Add node to server to make it grab the new token */
var timeplan = require('timeplan');
var request = require('request');
var fs = require('fs');

timeplan.repeat({
    period: "5m",
    task: function() {
        url = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13";
        post_data = {
            'client_id': 'username',
            'client_secret': 'pass',
            'scope': 'http://api.microsofttranslator.com',
            'grant_type': 'client_credentials',
        };
        request.post(url, function(request, response) {
            body = JSON.parse(response.body);

            fs.writeFile('my.json', JSON.stringify(body), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("JSON saved");
                }
            });

        }).form(post_data);
    }
});