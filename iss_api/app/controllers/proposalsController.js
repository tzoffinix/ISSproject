const mongoose      = require( "mongoose" );
const Proposal      = mongoose.model( "Proposal" );
const User          = mongoose.model( "User" );

exports.addProposal = ( req, res ) => {
    const user = req.user;
    const proposal = new Proposal( req.body.proposal );
    proposal.userId = user.id;
    proposal.id = proposal._id;
    proposal.save( function( err ) {
        if ( err ) {
            res.validationError( err );
        } else {
            const userId = user.id;
            Proposal.find( { userId }, ( error, prop ) => {
                if ( error ) {
                    res.serverError( error );
                } else {
                    res.success( prop );
                }
            } );
        }
    } );
};

exports.addFile = ( req, res ) =>{
    console.log( req.file ); //form files
    return res.end( req.file.filename );
};

exports.getProposals = ( req, res ) => {
    Proposal.find( { }, ( error, prop ) => {
        if ( error ) {
            res.serverError( error );
        } else {
            res.success( prop );
        }
    } );
};

exports.addReview = ( req, res ) => {
    const id   = req.body.proposalId;
    const userId = req.body.userId;
    User.find( { id: userId }, ( error, user ) => {
        if ( error ) {
            res.serverError( error );
        } else {
            console.log( user );
            user[ 0 ].reviewedProposals.push( id );
            user[ 0 ].save();
        }
    } );

    Proposal.find( { id }, ( error, prop ) => {
        if ( error ) {
            res.serverError( error );
        } else {
            prop[ 0 ][ req.body.review ] += 1;
            prop[ 0 ].save();
            res.success();
        }
    } );
};
