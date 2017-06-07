import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";

export default class ProposalFull extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.bidProposal = this.bidProposal.bind( this );
    }
    componentWillMount() {
        this.setState( { bid: this.props.checkIfBid( this.props.id ) } );
    }
    bidProposal() {
        this.props.bidProposal( this.props.id );
        this.setState( { bid: true } );
    }
    render() {
        return (
        <Card>
            <CardHeader
            title={this.props.name}
            subtitle={this.props.user.name}
            actAsExpander={true}
            showExpandableButton={true}
            />
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
            </CardActions>
        </Card>
        );
    }
}
