/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const restifyPlugins = require('restify-plugins');
const swagger = require('swagger-restify');
/**
  * Initialize Server
  */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
  * Middleware
  */
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

swagger.init(server, {
  swagger: '1.0', // or swaggerVersion as backward compatible
  info: {
      version: '1.0',
      title: 'Swagger 2.0 Restify example'
  },
  basePath: '/',
  // tags: [
  //     {
  //         name: 'example',
  //         description: 'Just an example API'
  //     }
  // ],
  host: 'localhost:' + config.port,
  apis: ['./routes/index.js'],
  produces: [
      'application/json',
      'text/xml'
  ],
  consumes: [
      'application/json',
      'text/xml'
  ],

  // swagger-restify proprietary
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public'
});

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
  require('./routes')(server);
  console.log(`Server is listening on port ${config.port}`);
});