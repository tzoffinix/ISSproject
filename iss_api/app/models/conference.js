const mongoose = require( "mongoose" );
const shortid = require( "shortid" );
const Schema   = mongoose.Schema;

const conferenceSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    name: { type: String, required: true },
    submissionsDeadline: { type: Date, default: Date.now },
    reviewsDeadline: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now }
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Conference", conferenceSchema );
