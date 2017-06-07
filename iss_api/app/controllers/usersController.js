const mongoose      = require( "mongoose" );
const extractObject = require( "../utilities/functions" ).extractObject;
const User          = mongoose.model( "User" );
const userType      = mongoose.model( "UserType" );
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
                        id: user.id
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
        }
    );
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
    const id = req.params.userId;
    if ( !id ) {
        return res.preconditionFailed( "missing_user_id" );
    }

    User.findOne(
        { id },
        function( err, user ) {
            if ( err ) {
                return res.serverError( );
            }
            req.user = user;
            res.success( { user } );
        }
    );
};

exports.bid = ( req, res )=> {
    const id = req.params.userId;
    User.findOne(
        { id },
        function( err, user ) {
            if ( err ) {
                return res.serverError( );
            }
            user.bidProposals.push( req.body.proposalId );
            user.save( ( error, savedUser )=>{
                res.success( savedUser );
            } );
        }
    );
};

exports.assign = ( req, res )=> {
    const id = req.params.userId;
    User.findOne(
        { id },
        function( err, user ) {
            if ( err ) {
                return res.serverError( );
            }
            user.assignedProposals.push( req.body.proposalId );
            user.save( ( error, savedUser )=>{
                res.success( savedUser );
            } );
        }
    );
};
