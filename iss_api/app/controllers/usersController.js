const mongoose      = require( "mongoose" );
const extractObject = require( "../utilities/functions" ).extractObject;
const User          = mongoose.model( "User" );
const jwt           = require( "jsonwebtoken" );
const SECRET        = "superSuperSecret";

exports.register = ( req, res ) => {
    let user;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
    } else {
        user = new User( req.body );
        user.save( function( err, savedUser ) {
            if ( err ) {
                res.validationError( err );
            } else {
                res.success( extractObject(
                    savedUser,
                    [ "id", "name", "age", "email", "username", "password", "webpage", "affiliation" ] ) );
            }
        } );
    }
};

exports.login = ( req, res ) => {
    let user  = req.user;
    if ( !req.body.password ) {
        res.status( 400 ).send( "password required" );
        return;
    }

    const password = req.body.password;

    if ( user ) {
        if ( user.password !== password ) {
            res.json( {
                success: false,
                message: "Authentication failed. Wrong password."
            } );
        } else {
            const token = jwt.sign( user, SECRET, {
                expiresIn: 1440
            } );
            user = {
                _id: user._id
            };
            res.json( {
                success: true,
                token,
                user
            } );
        }
    } else {
        res.json( {
            success: false,
            message: "Authentication failed. User not found."
        } );
    }
};

exports.edit = ( req, res ) => {
    user.save( function( err, savedUser ) {
        if ( err ) {
            res.validationError( err );
        } else {
            res.success( extractObject(
                savedUser,
                [ "id", "name", "age", "sex" ] ) );
        }
    } );
};

exports.delete = ( req, res ) => {
    const user = req.user;

    user.remove( );
    res.success( );
};

exports.getUser = function( req, res ) {
    const _id = req.param( "userId" );
    if ( !_id ) {
        return res.preconditionFailed( "missing_user_id" );
    }

    User.findOne(
        { _id },
        function( err, user ) {
            if ( err ) {
                return res.serverError( );
            }
            req.user = user;
            res.success( { user } );
        }
    );
};
