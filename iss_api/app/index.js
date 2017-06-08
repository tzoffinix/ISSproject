const express         = require( "express" );
const bodyParser      = require( "body-parser" );
const fs = require( "fs" );
const config          = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );
const crypto = require( "crypto" );
const path = require( "path" );
const mime = require( "mime" );
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
require( "./models/comment" );

const proposalsController = require( "./controllers/proposalsController" );

app.use( customResponses );

const storage = multer.diskStorage( {
    destination: "./uploads/",
    filename( req, file, cb ) {
        crypto.pseudoRandomBytes( 16, function( err, raw ) {
            if ( err ) {
                return cb( err );
            }

            cb( null, raw.toString( "hex" ) + path.extname( file.originalname ) );
        } );
    }
} );

const upload = multer( { storage } );

app.post( "/papers", upload.single( "file" ), proposalsController.addFile );

app.get( "/files/:fileName", function( req, res ) {
    const file = `${ __dirname }/../uploads/${ req.params.fileName }`;

    const filename = path.basename( file );
    const mimetype = mime.lookup( file );

    res.setHeader( "Content-disposition", `attachment; filename=${  filename }` );
    res.setHeader( "Content-type", mimetype );

    const filestream = fs.createReadStream( file );
    filestream.pipe( res );
} );

app.use( bodyParser.json( ) );

require( "./config/mongoose" )( app );
require( "./config/routes" )( app );

app.listen( port );
