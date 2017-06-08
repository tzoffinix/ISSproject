const mongoose      = require( "mongoose" );
const Conference    = mongoose.model( "Conference" );

exports.addConference = ( req, res ) => {
    const user = req.user;
    const conference = new Conference( req.body.conference );
    conference.userId = user.id;
    conference.save( function( err ) {
        if ( err ) {
            res.validationError( err );
        } else {
            Conference.find( { }, ( error, conf ) => {
                if ( error ) {
                    res.serverError( error );
                } else {
                    res.success( conf );
                }
            } );
        }
    } );
};

exports.getConferences = ( req, res ) => {
    Conference.find( { }, ( error, conf ) => {
        if ( error ) {
            res.serverError( error );
        } else {
            res.success( conf );
        }
    } );
};
