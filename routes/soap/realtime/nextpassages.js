'use strict';

var clientSoap = require('../client-soap.js');

/**
 * Allows to obtain the information of next passage to a station for a line and for a given direction
 * @param {*} idStation Identifier of the station
 * @param {*} idLine Identifier of the line
 * @param {*} direction A for single way, R for return way, * for both
 */
exports.getNextPassage = (idStation, idLine, direction) => {
    return new Promise((resolve, reject) => {
        clientSoap.getClientSoap().then((client) => 
        {
            var params = {
                station : {
                    id : idStation,
                    line : {
                        id : idLine
                    }
                },
                direction: {
                    sens: direction
                },
                limit: 1
            };

            client.getMissionsNext(params, (err, result) => {
                resolve(result.return.missions);
            });
        });
    });
};
