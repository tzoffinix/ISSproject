const express         = require( "express" );
const bodyParser      = require( "body-parser" );

const config          = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );

const app    = express( );
const port   = process.env.PORT || config.port;
const ENV    = process.env.NODE_ENV || config.env;
const multer  = require( "multer" );

app.use( function( req, res, next ) {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS" );
    res.header( "Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With" );
    next();
} );
app.set( "env", ENV );

require( "./models/user" );
require( "./models/proposal" );
require( "./models/userType" );
require( "./models/conference" );
const proposalsController = require( "./controllers/proposalsController" );
app.use( customResponses );

app.post( "/papers", multer( { dest: "uploads/" } ).single( "file" ), proposalsController.addFile );

app.use( bodyParser.json( ) );

require( "./config/mongoose" )( app );
require( "./config/routes" )( app );

app.listen( port );
