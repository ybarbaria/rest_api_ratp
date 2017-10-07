'use strict';

/** Libs */
var soap = require('soap');

/** Models */
var Error = require('../../models/error.js');

/** Config */
var urlFile = './routes/soap/Wsiv.wsdl';


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
