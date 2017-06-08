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

export default class Comments extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        };
        this.generateComments = this.generateComments.bind( this );
    }

    render() {
        return (
            <Card>
            <CardHeader
            title="Comments"
            actAsExpander={true}
            showExpandableButton={true}
            />
            <CardText expandable={true}>
                <List>
                    {this.generateComments()}
                </List>
            </CardText>
            </Card>
        );
    }
}
