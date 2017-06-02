import React from "react";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";

export default class Menu extends React.Component {

    constructor( props ) {
        super( props );
        this.state = { open: true };
    }

    handleToggle = () => this.setState( { open: !this.state.open } );

    render() {
        return (
      <div >
        <Drawer open={this.state.open}>
          <MenuItem>Proposals</MenuItem>
        </Drawer>
      </div>
        );
    }
}
