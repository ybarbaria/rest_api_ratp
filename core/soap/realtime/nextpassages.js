'use strict';

/**
 * Soap Dependencies
 */
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
            let params = {
                station : {
                    id : idStation,
                    line : {
                        id : idLine
                    }
                },
                direction: {
                    sens: direction
                },
                limit: 10
            };

            client.getMissionsNext(params, (err, result) => {
                let nextPassages = result.return;
                if(nextPassages){
                    if(nextPassages.ambiguityMessage)
                        resolve(nextPassages.ambiguityMessage);
                    else {
                        let informations = [];
                        nextPassages.missions.forEach(mission => {
                            let information = {
                                date: mission.stationsDates,
                                message: mission.stationsMessages,
                                direction: {
                                    station : mission.direction.name,
                                    sens: mission.direction.sens
                                }
                            };
                            informations.push(information);
                        });
                        resolve(informations);
                    }
                }
                reject();
            });
        });
    });
};
