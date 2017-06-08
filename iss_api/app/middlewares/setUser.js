const mongoose = require( "mongoose" );
const User     = mongoose.model( "User" );

module.exports = function( req, res, next ) {
    const username = req.body.username;
    if ( !username ) {
        return res.preconditionFailed( "missing_username" );
    }

    User.findOne(
        { username },
        function( err, user ) {
            if ( err ) {
                return res.serverError( );
            }
            req.user = user;
            return next( );
        }
    );
};
