const mongoose = require( "mongoose" );
const shortid = require( "shortid" );
const Schema   = mongoose.Schema;

const sessionSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    conferenceId: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now }
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Session", sessionSchema );
