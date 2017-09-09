module.exports = {
	name: 'API_RATP',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 9985,
	base_url: process.env.BASE_URL || 'http://localhost:9985'
};