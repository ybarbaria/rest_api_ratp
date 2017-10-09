'use strict';

/**
 * Soap Dependencies
 */
var clientSoap = require('../client-soap.js');

/**
 * This service allows to obtain the information on a RATP line (BUS, RER, Metro) or, without parameter, allows
 * to get the list of lines.
 * @param {*} id 
 */
exports.getLines = (id) => {
    return new Promise((resolve, reject) => {
        clientSoap.getClientSoap().then((client) => 
        {
            var params = {
                line : {
                    id : id
                }
            };
            
            client.getLines(params, (err, result) => {
                if(result && result.return){
                    let lines = [];
                    result.return.forEach(line => {
                        lines.push({
                            id: line.id,
                            name: line.name
                        });
                    });
                    resolve(lines);
                }
                resolve(result);
            });
        });
    });
};