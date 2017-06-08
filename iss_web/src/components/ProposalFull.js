import React, { Component } from "react";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import fileDownload from "react-file-download";
import axios from "axios";
import { List, ListItem } from "material-ui/List";
export default class ProposalFull extends Component {
    constructor() {
        super();
        this.state = {
            reviewed: false
        };
        this.bidProposal = this.bidProposal.bind( this );
        this.handleChange = this.handleChange.bind( this );
        this.downloadPaper = this.downloadPaper.bind( this );
        this.submitReview = this.submitReview.bind( this );
    }
    componentWillMount() {
        this.setState( { reviewed: this.props.checkIfReviewed( this.props.id ) } );
    }
    bidProposal() {
        this.props.bidProposal( this.props.id );
        this.setState( { bid: true } );
    }
    submitReview() {
        const data = {
            userId: this.props.user.id,
            proposalId: this.props.id,
            review: this.state.value
        };
        axios.put( "/proposals/addReview", data );
        this.setState( { reviewed: true } );
        this.props.refresh();
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
            disabled={this.state.reviewed}
            >
                <MenuItem value="strongAccept" primaryText="Strong Accept" />
                <MenuItem value="weakAccept" primaryText="Weak Accept" />
                <MenuItem value="accept" primaryText="Accept" />
                <MenuItem value="reject" primaryText="Reject" />
                <MenuItem value="weakReject" primaryText="Weak Reject" />
                <MenuItem value="strongReject" primaryText="Strong Reject" />
                <MenuItem value="borderlinePaper" primaryText="Borderline Paper" />
            </SelectField><br/>
            <RaisedButton disabled={this.state.reviewed} onClick={this.submitReview }style={{ position: "absolute", left: "280px", bottom: "21px" }} label="Submit Review"/>}
            { this.state.reviewed ?
                <Card>
            <CardHeader
            title="Reviews"
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardText expandable={true}>
                <List>
                <ListItem primaryText={`${ this.props.proposal.strongAccept  } Strong accept`}  />
                <ListItem primaryText={`${ this.props.proposal.accept  } Accept`} />
                <ListItem primaryText={`${ this.props.proposal.weakAccept  } Weak Accept`} />
                <ListItem primaryText={`${ this.props.proposal.weakReject  } Weak Reject`} />
                <ListItem primaryText={`${ this.props.proposal.reject  } reject`} />
                <ListItem primaryText={`${ this.props.proposal.strongReject  } Strong reject`} />
                <ListItem primaryText={`${ this.props.proposal.borderlinePaper  } Borderline paper`} />
            </List>
            </CardText>
            </Card>
             : <div/>}
            <Card>
            <CardHeader
            title="Comments"
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardText expandable={true}>
                <List>
                <ListItem primaryText={`${ this.props.proposal.strongAccept  } Strong accept`}  />
                <ListItem primaryText={`${ this.props.proposal.accept  } Accept`} />
                <ListItem primaryText={`${ this.props.proposal.weakAccept  } Weak Accept`} />
                <ListItem primaryText={`${ this.props.proposal.weakReject  } Weak Reject`} />
                <ListItem primaryText={`${ this.props.proposal.reject  } reject`} />
                <ListItem primaryText={`${ this.props.proposal.strongReject  } Strong reject`} />
                <ListItem primaryText={`${ this.props.proposal.borderlinePaper  } Borderline paper`} />
            </List>
            </CardText>
            </Card>
            </CardActions>
        </Card>
        );
    }
}
