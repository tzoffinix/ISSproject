const mongoose      = require( "mongoose" );
const Comment       = mongoose.model( "Comment" );

exports.addComment = ( req, res ) =>{
    const comment = new Comment( req.body.comment );
    comment.save( function( err ) {
        if ( err ) {
            res.validationError( err );
        } else {
            Proposal.find( { id: req.body.proposalId }, ( error, prop ) => {
                if ( error ) {
                    res.serverError( error );
                } else {
                    prop[ 0 ].comments.push( comment.id );
                    prop[ 0 ].save();
                    res.success();
                }
            } );
        }
    } );
};
