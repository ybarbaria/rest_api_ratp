/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const swagger = require('swagger-restify');
const log = require('./log/log.js');

/**
  * Initialize Server
  */
const server = restify.createServer({
	name: config.name,
  version: config.version
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

restify.defaultResponseHeaders = function(data) {
  this.header('Access-Control-Allow-Origin', '*');
};
swagger.init(server, {
  swagger: '2.0', 
  info: {
      version: '1.0',
      title: 'REST API RATP'
  },
  basePath: '/ratp',
  host: 'localhost:' + config.port,
  apis: ['./core/api.js'],
  produces: [
      'application/json',
      'text/xml'
  ],
  consumes: [
      'application/json',
      'text/xml'
  ],

  // swagger-restify proprietary
  swaggerURL: '/ratp/doc',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public'
});

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
  require('./core/api.js')(server);
  console.log(`Server is listening on port ${config.port}`);
});