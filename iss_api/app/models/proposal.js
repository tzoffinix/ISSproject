const mongoose = require( "mongoose" );
const shortid  = require( "shortid" );
const Schema   = mongoose.Schema;


const proposalSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    conferenceId: { type: String },
    userId: { type: String },
    name: { type: String, required: true },
    abstract: { type: String, required: true },
    topics: [ { type: String, required: true } ],
    keywords: [ { type: String, required: true } ],
    authors: [ { type: String, required: true } ],
    file: { type: String },
    accepted: { type: Boolean, default: false },
    strongAccept: { type: Number, default: 0 },
    accept: { type: Number, default: 0 },
    weakAccept: { type: Number, default: 0 },
    weakReject: { type: Number, default: 0 },
    reject: { type: Number, default: 0 },
    strongReject: { type: Number, default: 0 },
    borderlinePaper: { type: Number, default: 0 },
    comments: [ { type: String } ]
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Proposal", proposalSchema );
