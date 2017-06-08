import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";

export default class ProposalSummary extends Component {
    constructor() {
        super();
        this.state = {
            userId: ""
        };
        this.bidProposal = this.bidProposal.bind( this );
        this.generateUsers = this.generateUsers.bind( this );
        this.assignProposal = this.assignProposal.bind( this );
    }
    componentWillMount() {
        this.setState( { bid: this.props.checkIfBid( this.props.id ) } );
    }
    bidProposal() {
        this.props.bidProposal( this.props.id );
        this.setState( { bid: true } );
        this.props.refresh();
    }
    generateUsers() {
        const proposal = this.props.proposal;
        console.log( proposal );
        const x = this.props.users.map( ( user ) => {
            if ( user.id !== this.props.user.id )                {
                if ( user.bidProposals.filter( ( proposalId ) => {
                    return proposalId === proposal.id;
                } ) > -1 )                {
                    return <MenuItem value={user.id} primaryText={user.name}/>;
                }
            }
        } );
        return x;
    }
    assignProposal() {
        axios.put( `/users/${ this.state.userId }/assign`, {
            proposalId: this.props.proposal.id
        } );
    }
    handleChange = ( event, index, value ) => this.setState( { userId: value } );
    render() {
        return (
        <Card>
            <CardHeader
            title={this.props.name}
            subtitle={this.props.user.name}
            actAsExpander={true}
            showExpandableButton={true}
            /> { this.props.user.role !== "CHAIR/CO-CHAIR" ?
                <div>
                <CardText expandable={true}>
                <b>Authors</b>: {this.props.authors.toString()}
                <br/>
                <b>Topics</b>: {this.props.topics.toString()}
                <br/>
                <b>Abstract: </b>
                <br/>
                {this.props.abstract}
            </CardText>
            <CardActions >
            { !this.state.bid ? <FlatButton onClick={this.bidProposal} secondary label="Bid" /> : <FlatButton disabled label="Thank you for bidding"/>  }
            </CardActions> </div> :
            <div>
                 <DropDownMenu value={this.state.userId} onChange={this.handleChange}>
                            {this.generateUsers()}
                </DropDownMenu>
                <FlatButton onClick={this.assignProposal} secondary label="Assign" />
            </div> }
        </Card>
        );
    }
}
