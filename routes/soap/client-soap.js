'use strict';

/** Libs */
var soap = require('soap');
/** Models */
var Error = require('../../models/error.js');

var urlFile = './routes/soap/Wsiv.wsdl';
var args = {name: 'value'};

exports.getClientSoap = () =>{
    return new Promise((resolve, reject) => {
        soap.createClient(urlFile, (err, client) => {
            if(err) {
                var error =new Error("The RATP service is not avaible, please retry later.");
                reject(error);
            } else {
                resolve(client);
            }
        });
    });
};
