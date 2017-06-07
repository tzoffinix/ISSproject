import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import fileDownload from "react-file-download";
import axios from "axios";

export default class ProposalFull extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.bidProposal = this.bidProposal.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.downloadPaper = this.downloadPaper.bind( this );
    }
    componentWillMount() {
        this.setState( { bid: this.props.checkIfBid( this.props.id ) } );
    }
    bidProposal() {
        this.props.bidProposal( this.props.id );
        this.setState( { bid: true } );
    }
    handleChange( event, index, value ) {
        this.setState( { value } );
    }
    downloadPaper() {
        fetch( `files/${ this.props.fileName }` ).then( function( response ) {
            return response.blob();
        } ).then( function( myBlob ) {
            const objectURL = URL.createObjectURL( myBlob );
            fileDownload( myBlob, "paper.jpg" );
        } );
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
            { <RaisedButton onClick={this.downloadPaper} label="Download Paper"/> }
            <br/>
            <SelectField
            floatingLabelText="Qualifier"
            value={this.state.value}
            onChange={this.handleChange}
            >
                <MenuItem value={1} primaryText="Strong Accept" />
                <MenuItem value={2} primaryText="Weak Accept" />
                <MenuItem value={3} primaryText="Accept" />
                <MenuItem value={4} primaryText="Reject" />
                <MenuItem value={5} primaryText="Weak Reject" />
                <MenuItem value={6} primaryText="Strong Reject" />
                <MenuItem value={7} primaryText="Borderline Paper" />
            </SelectField><br/>
            <RaisedButton style={{ position: "absolute", left: "280px", bottom: "21px" }} label="Submit Review"/>
            </CardActions>
        </Card>
        );
    }
}
