const errorsController = require( "../controllers/errorsController" );
const usersController  = require( "../controllers/usersController" );
const proposalsController = require( "../controllers/proposalsController" );

const validateToken = require( "../middlewares/validateToken" );
const authorize     = require( "../middlewares/authorize" );
const setUser       = require( "../middlewares/setUser" );

const express = require( "express" );
const router  = express.Router( );

router.post( "/users/registration", setUser, usersController.register );

router.post( "/users/login", setUser, usersController.login );

router.put( "/users/edit", authorize, validateToken, usersController.edit );

router.delete( "/users/delete", authorize, validateToken, usersController.delete );

router.post( "/proposals/addProposal", setUser, proposalsController.addProposal );

router.get( "/test", function( req, res ) {
    res.json( { success: true } );
} );

router.use( errorsController.notFound );

module.exports = function( app ) {
    app.use( "/", router );
    app.use( errorsController.errorLogger );
    app.use( errorsController.errorHandler );
};
