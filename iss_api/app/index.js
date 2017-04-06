const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set('env', ENV);
app.use(bodyParser.json());

//require('./config/database')(app);
//require('./config/routes')(app);

app.listen(port);
