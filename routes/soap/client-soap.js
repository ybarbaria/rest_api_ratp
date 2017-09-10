'use strict';

/** Libs */
var soap = require('soap');

/** Models */
var Error = require('../../models/error.js');

//var url = 'http://opendata-tr.ratp.fr/wsiv/services/Wsiv.';
var url = 'http://test.com';

var urlFile = './Wsiv.wsdl'
var args = {name: 'value'};

/**
 * This service allows to obtain the information on a particular station or on all the stations of a station line.
 * @param {*} id Identifier of the line
 * @param {*} name Name of the station
 */
exports.getStations = function(id, name) {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if(err) {
                var error =new Error("The RATP service is not avaible, please retry later.");
                reject(error);
            } else {
                var params = {
                    id : id,
                    name : name
                };
                client.getStations(params, (err, result) => {
                    console.log(result);
                    resolve(result);
                });
            }
        });
    });
}

/**
 * This service allows to obtain the information on a RATP line (BUS, RER, Metro) or, without parameter, allows
 * to get the list of lines.
 * @param {*} id 
 */
exports.getLines = (id)=> {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if(err) {
                var error =new Error("The RATP service is not avaible, please retry later.");
                reject(error);
            } else {
                var params = {
                    id : id
                };
                client.getLines(params, (err, result) => {
                    console.log(result);
                    resolve(result);
                });
            }
        });
    });
}

/**
 * Allows to obtain the information of next passage to a station for a line and for a given direction
 * @param {*} idStation Identifier of the station
 * @param {*} idLine Identifier of the line
 * @param {*} direction A for single way, R for return way, * for both
 */
exports.getNextPassage = (idStation, idLine, direction)=> {
    return new Promise((resolve, reject) => {
        soap.createClient(url, (err, client) => {
            if(err) {
                var error =new Error("The RATP service is not avaible, please retry later.");
                reject(error);
            } else {
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
            }
        });
    });
}
