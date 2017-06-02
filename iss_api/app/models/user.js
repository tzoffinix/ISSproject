const mongoose = require( "mongoose" );

const Schema   = mongoose.Schema;
const userSchema = new Schema( {
    id: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    affiliation: { type: String, required: true },
    email: { type: String, required: true },
    proposals: []
}, {
    timestamps: true
} );

module.exports = mongoose.model( "User", userSchema );
