const mongoose      = require( "mongoose" );
const extractObject = require( "../utilities/functions" ).extractObject;
const Proposal      = mongoose.model( "Proposal" );

const addProposal = ( user, proposal ) => {
    user.proposals.push( proposal );
};

exports.addProposal = ( req, res ) => {
    const user = req.user;
    const proposal = new Proposal( req.body.proposal );
    addProposal( user, proposal );
    user.save( function( err, savedUser ) {
        if ( err ) {
            res.validationError( err );
        } else {
            res.success( extractObject(
                    savedUser,
                    [ "proposals" ] ) );
        }
    } );
};
