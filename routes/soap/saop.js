var soap = require('soap');
var url = 'http://opendata-tr.ratp.fr/wsiv/services/Wsiv.';
var args = {name: 'value'};

soap.createClient(url, function(err, client) {
    client.MyFunction(args, function(err, result) {
        console.log(result);
    });
});