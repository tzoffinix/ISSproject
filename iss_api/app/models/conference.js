const mongoose = require( "mongoose" );
const shortid = require( "shortid" );
const Schema   = mongoose.Schema;

const conferenceSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    name: { type: String, required: true },
    userId: [ { type: String, required: true } ]
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Conference", conferenceSchema );
