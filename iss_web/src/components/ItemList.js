import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import ContentRemoveButton from "./ContentRemoveButton";

export default class ItemsList extends Component {
    constructor() {
        super();
        this.state = {
            items: [ ]
        };
        this.generateItems = this.generateItems.bind( this );
    }
    componentWillMount() {
        this.setState( { items: this.props.items } );
    }
    componentWillReceiveProps( newProps ) {
        this.setState( { items: newProps.items } );
    }

    generateItems() {
        return this.state.items ?
        this.state.items.map( ( item ) => <div><ListItem style = {{ width: "75%",  display: "inline-block" }}  key={item} primaryText={<div> {item} <ContentRemoveButton item={item} removeItem={this.props.removeItem}/></div>}/></div> ) : <div></div>;
    }
    render() {
        return (
            <div>
                <List>
                {this.generateItems()}
                </List>
            </div>
        );
    }
}
