const env = process.env.NODE_ENV || 'development';
const config = require(`./enviroments/${env.toLowerCase()}`);

module.exports = config;
