const mongoose      = require( "mongoose" );
const Proposal      = mongoose.model( "Proposal" );

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
