'use strict';

/**
 * Module Dependencies
 */
const errors = require('restify-errors');

/**
 * Soap Dependencies
 */
const soap = require('./soap/client-soap.js');
const soapStations =  require('./soap/stations/stations-soap.js');
const saopLines = require('./soap/lines/lines-soap.js');
const saopRealtime = require('./soap/realtime/nextpassages.js');

/**
 * @swagger
 * tags:
 *   - name: exampleJs
 *     description: All about API using JavaScript annotations
 */
module.exports = (server) => {

	/**
	* @swagger
	* path: /stations
	* httpMethod: GET
	* spec:
	*   summary: Get Stations informations by name station or/and id of the line
	*   tags:
	*     - Stations
	*   description: Returns a list of stations or unique station
	*   operationId: stations
	*   consumes: 
	*     - application/json
	*   parameters:
	*     - name: lineid
	*       in: query
	*       description: Identifier of the line
	*       required: false
	*       type: string
	*     - name: name
	*       in: query
	*       description: Name of the station
	*       required: false
	*       type: string
	*   responses:
	*     200:
	*       description: Successful response.
	*/
	server.get('ratp/stations/:lineid/:name', handlerStations);
	server.get('ratp/stations/', handlerStations);
	server.get('ratp/stations/:lineId', handlerStations);

	/**
	* @swagger
	* path: /lines
	* httpMethod: GET
	* spec:
	*   summary: Get Lines informations by id of the line or get all lines 
	*   tags:
	*     - Lines
	*   description: Returns a list of lines or unique line
	*   operationId: stations
	*   consumes: 
	*     - application/json
	*   parameters:
	*     - name: lineid
	*       in: query
	*       description: Identifier of the line
	*       required: false
	*       type: string
	*   responses:
	*     200:
	*       description: Successful response.
	*/
	server.get('ratp/lines/:lineid', handlerLines);
	server.get('ratp/lines', handlerLines);

	/**
	* @swagger
	* path: /nextPassages
	* httpMethod: GET
	* spec:
	*   summary: Get next passages of metro/bus/train by station, line and direction
	*   tags:
	*     - NextPassages
	*   description: Returns a list of next passages
	*   operationId: stations
	*   consumes: 
	*     - application/json
	*   parameters:
	*     - name: stationId
	*       in: query
	*       description: Identifier of the station
	*       required: false
	*       type: string
	*     - name: lineId
	*       in: query
	*       description: Identifier of the line
	*       required: false
	*       type: string
	*     - name: direction
	*       in: query
	*       description: Direction (A for single way, R for return way, * for both)
	*       required: false
	*       type: string
	*   responses:
	*     200:
	*       description: Successful response.
	*/
	server.get('ratp/nextPassages/:stationId/:lineId/:direction', handlerNextPassages);
	server.get('ratp/nextPassages/:stationId/:lineId', handlerNextPassages);
	server.get('ratp/nextPassages/:stationId', handlerNextPassages);
	server.get('ratp/nextPassages', handlerNextPassages);

	/**
	 * Manage the request of the stations informations
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	function handlerStations(req, res, next) {
		soapStations.getStations(req.params.lineid, req.params.name).then(
			(result) => {
				res.send(result);
				return next();
			},
			(error) => {
				return next();
			}
		);
	}

	/**
	 * Manage the request of the lines informations
	 * @param {*} req 
	 * @param {*} res 
	 * @param {*} next 
	 */
	function handlerLines(req, res, next) {
		saopLines.getLines(req.params.lineId).then(
			(result) => {
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
		saopRealtime.getNextPassage(req.params.stationId,req.params.lineId,req.params.direction).then(
			(result) => {
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