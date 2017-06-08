const mongoose = require( "mongoose" );
const shortid  = require( "shortid" );

const CMS_ROLES = [ "AUTHOR", "REVIEWER", "CHAIR/CO-CHAIR" ];
const PARTICIPANT_ROLES = [ "SESSION_CHAIR", "SPEAKER", "LISTENER" ];

const Schema   = mongoose.Schema;
const userSchema = new Schema( {
    id: { type: String, default: shortid.generate() },
    conferenceId: { type: String },
    role: { type: String, enum: CMS_ROLES },
    participantRole: { type: String, enum: PARTICIPANT_ROLES },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    affiliation: { type: String, required: true },
    email: { type: String, required: true },
    bidProposals: [ { type: String } ],
    assignedProposals: [ { type: String } ],
    reviewedProposals: [ { type: String } ]
}, {
    timestamps: true
} );

module.exports = mongoose.model( "User", userSchema );
