const mongoose = require( "mongoose" );
const shortid = require( "shortid" );
const Schema   = mongoose.Schema;

const commentSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    text: { type: String, required: true },
    userName: { type: String, required: true }
}, {
    timestamps: true
} );

module.exports = mongoose.model( "Comment", commentSchema );
