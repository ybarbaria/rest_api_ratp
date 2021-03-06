'use strict';

/**
 * Soap Dependencies
 */
var clientSoap = require('../client-soap.js');

/**
 * This service allows to obtain the information on a particular station or on all the stations of a station line.
 * @param {*} id Identifier of the line
 * @param {*} name Name of the station
 */
exports.getStations = (id, name) => {
    return new Promise((resolve, reject) => {
        clientSoap.getClientSoap().then((client) => 
        {
            // Params soap 
            var params = {
                station: { 
                    line : {
                        id : id
                    },
                    name : name
                }
            };

            client.getStations(params, (err, result) => {
                if(result && result.return) {
                    let stations = result.return.stations;
                    if(stations){
                        let stationsResult = [];
                        stations.forEach(station => {
                            stationsResult.push({
                                id : station.id,
                                name: station.name
                            });
                        });
                        resolve(stationsResult);
                    }
                    resolve("Not found");
                }
               
            });
        });
    });
};