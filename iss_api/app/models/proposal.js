const mongoose = require( "mongoose" );
const shortid = require( "shortid" );
const Schema   = mongoose.Schema;

const proposalSchema = new Schema( {
    id: { type: String, default: shortid.generate },
    name: { type: String, required: true },
    topics: [ { type: String, required: true } ],
    keywords: [ { type: String, required: true } ],
    authors: [ { type: String, required: true } ],
    file: { type: String }
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Proposal", proposalSchema );
