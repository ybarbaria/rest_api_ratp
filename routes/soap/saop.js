var soap = require('soap');
var url = 'http://opendata-tr.ratp.fr/wsiv/services/Wsiv.';
var urlFile = './Wsiv.wsdl'
var args = {name: 'value'};

/**
 * This service allows to obtain the information on a particular station or on all the stations of a station line.
 * @param {*} id Identifier of the line
 * @param {*} name Name of the station
 */
var getStations = function(id, name) {
    soap.createClient(url, function(err, client) {
        var params = {
            id : id,
            name : name
        };
        client.getLines(params, function(err, result) {
            console.log(result);
        });
    });
}

/**
 * This service allows to obtain the information on a RATP line (BUS, RER, Metro) or, without parameter, allows
 * to get the list of lines.
 * @param {*} id 
 */
var getLines = function(id) {
    soap.createClient(url, function(err, client) {
        var params = {
            id : id
        };
        client.getLines(params, function(err, result) {
            console.log(result);
        });
    });
}

/**
 * Allows to obtain the information of next passage to a station for a line and for a given direction
 * @param {*} idStation Identifier of the station
 * @param {*} idLine Identifier of the line
 * @param {*} direction A for single way, R for return way, * for both
 */
var getNextPassage = function(idStation, idLine, direction) {
    soap.createClient(url, function(err, client) {
        
        var params = {
            station : {
                id : idStation
            },
            line : {
                id : idLine
            },
            direction: {
                sens : direction
            }
        };
        
        client.getMissionsNext(params, function(err, result) {
            console.log(result);
        });
    });
}