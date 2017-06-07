import React, { Component } from "react";
import ContentRemoveCircle from "material-ui/svg-icons/content/remove-circle";

export default class ContentRemoveButton extends Component {
    constructor() {
        super();
        this.remove = this.remove.bind( this );
    }
    remove() {
        this.props.removeItem( this.props.item );
    }
    render() {
        return (
            <ContentRemoveCircle style={{ position: "absolute",
                top: "13px",
                right: "5px" }}
                color="#c62828"
                onClick={this.remove}/>
        );
    }
}
