'use strict'

/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Soap Client
 */
const soap = require('./soap/client-soap.js');

module.exports = (server) => {
	/**
	 * GET Station informations by name station and id of the line
	 */
	server.get('ratp/stations/:lineId/:name', handlerStations);

	/**
	 * GET All stations from line id
	 */
	server.get('ratp/stations/:lineId', handlerStations);

	/**
	 * Get Line information by his identifier
	 */
	server.get('ratp/lines/:lineId', handlerLines);

	/**
	 * Get All lines informations
	 */
	server.get('ratp/lines', handlerLines);

	/**
	 * 
	 */
	server.get('ratp/nextPassages/:stationId/:lineId/:direction', handlerNextPassages);

	/**
	 * Manage the request of the stations information
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	function handlerStations(req, res, next) {
		if (!req.is('application/json')) {
		 	return next(
				new errors.InvalidContentError("Expects 'application/json'")
			);
		}

		soap.getStations(req.params.lineId, req.params.name).then(
			(result) => {
				console.log(result);
				res.send(station);
				return next();
			},
			(error) => {
				//TODO à supprimer
				
				// console.log(error);
				// res.send(new errors.InternalServerError(error.message));
				return next();
			}
		);
	};

	/**
	 * Manage the request of the lines informations
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	function handlerLines(req, res, next) {
		if (!req.is('application/json')) {
			return next(
			   new errors.InvalidContentError("Expects 'application/json'")
		   );
	   	}

		soap.getLines(req.params.lineId).then(
			(result) => {
				console.log(result);
				res.send(result);
				return next();
			},
			(error) => {
				console.log(error);
				res.send(new errors.InternalServerError(error.message));
				return next();
			}
		);
	}

	/**
	 * Manage the request of the next passages
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	function handlerNextPassages(req, res, next) {
		if (!req.is('application/json')) {
			return next(
			   new errors.InvalidContentError("Expects 'application/json'")
		   );
	   	}

		soap.getNextPassage(req.params.stationId,req.params.lineId,req.params.direction).then(
			(result) => {
				console.log(result);
				res.send(result);
				return next();
			},
			(error) => {
				console.log(error);
				res.send(new errors.InternalServerError(error.message));
				return next();
			}
		);
	}
};