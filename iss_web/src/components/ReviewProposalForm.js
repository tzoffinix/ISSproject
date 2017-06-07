import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card";
import ListExampleSimple from "./ItemList";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Upload from "material-ui-upload/Upload";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import ProposalFull from "./ProposalFull";

export default class ReviewProposalForm extends Component {
    constructor() {
        super();
        this.state = {
            proposals: null
        };
        this.generateProposals = this.generateProposals.bind( this );
        this.checkIfBid = this.checkIfBid.bind( this );
        this.bidProposal = this.bidProposal.bind( this );
        this.checkUserBid = this.checkUserBid.bind( this );
    }
    componentWillMount() {
        axios.get( "/proposals" ).then( ( res ) => {
            this.setState( { proposals: res.data.payload.filter( ( proposal )=> {
                return this.checkUserBid( proposal );
            }
                ) } );
        } );
    }
    checkUserBid( proposal ) {
        const object = this.props.user.assignedProposals.filter( function( obj ) {
            return obj == proposal.id;
        } );
        if ( object.length > 0 )            {
            return true;
        }
        return false;
    }
    generateProposals() {
        return this.state.proposals ?
            this.state.proposals.map(
            ( proposal ) => <div> <ProposalFull
            topics={proposal.topics}
            fileName={proposal.file}
            id={proposal.id}
            keywords={proposal.keywords}
            authors={proposal.authors}
            name={proposal.name}
            user={{ name: "Daniel Irimia" }}
            abstract={proposal.abstract}
            checkIfBid={this.checkIfBid}
            bidProposal={this.bidProposal}
            user={this.props.user}
            />
            
            </div>
            ) : ( <div/> );
    }
    checkIfBid( id ) {
        return ( this.props.user.bidProposals.indexOf( id ) > -1 );
    }

    bidProposal( proposalId ) {
        const id = cookies.get( "iss_userId" );
        axios.put( `/users/${ id }/bid`,
            {
                proposalId
            }
          ).then( ( res )=>{
              const object = this.state.proposals.filter( function( obj ) {
                  return obj.id == proposalId;
              } );
              const i = this.state.proposals.indexOf( object[ 0 ] );
              this.state.proposals[ i ].bid = true;
              this.setState( this.state );
          } );
    }
    render() {
        return (
            <div>
            {this.generateProposals()}
            </div>
        );
    }
}
