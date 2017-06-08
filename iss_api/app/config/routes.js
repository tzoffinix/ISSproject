const errorsController = require( "../controllers/errorsController" );
const usersController  = require( "../controllers/usersController" );
const proposalsController = require( "../controllers/proposalsController" );
const conferenceController = require( "../controllers/conferencesController" );
const commentsController = require( "../controllers/commentsController" );

const validateToken = require( "../middlewares/validateToken" );
const authorize     = require( "../middlewares/authorize" );
const setUser       = require( "../middlewares/setUser" );

const express = require( "express" );
const router  = express.Router( );

router.post( "/users/registration", setUser, usersController.register );

router.post( "/users/login", usersController.login );

router.get( "/users/:userId",  usersController.getUser );

router.put( "/users/edit", authorize, validateToken, usersController.edit );

router.delete( "/users/delete", authorize, validateToken, usersController.delete );

router.post( "/proposals/create", setUser, proposalsController.addProposal );

router.post( "/comments/create", commentsController.addComment );

router.put( "/proposals/addReview", proposalsController.addReview );

router.get( "/proposals/", proposalsController.getProposals );

router.put( "/users/:userId/bid", usersController.bid );

router.put( "/users/:userId/assign", usersController.assign );

router.post( "/conferences/create", setUser, conferenceController.addConference );

router.get( "/test", function( req, res ) {
    res.json( { success: true } );
} );


router.use( errorsController.notFound );

module.exports = function( app ) {
    app.use( "/", router );
    app.use( errorsController.errorLogger );
    app.use( errorsController.errorHandler );
};
