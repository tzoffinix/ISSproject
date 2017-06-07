import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import SvgIcon from "material-ui/SvgIcon";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Avatar from "material-ui/Avatar";
const cookies = new Cookies();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
const HomeIcon = ( props ) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500
} from "material-ui/styles/colors";

const style = { margin: 5 };

class Login extends Component {
    static muiName = "FlatButton";

    render() {
        return (
          <IconMenu
            {...this.props}
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
          >
            <MenuItem primaryText="Refresh" />
            <Link to="/login"><MenuItem primaryText="Sign in" /> </Link>
            <Link to="/register"><MenuItem primaryText="Register" /> </Link>
          </IconMenu>
        );
    }
}

const Logged = ( props ) => {
    return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      <MenuItem primaryText="Refresh" />
      <MenuItem primaryText="Help" />
      <MenuItem onClick={props.logOut} primaryText="Sign out" />
    </IconMenu>
    );
};

Logged.muiName = "IconMenu";

class MyAppBar extends Component {
    state = {
        logged: false
    };
    componentWillMount() {
        this.setState( { logged: this.props.logged } );
    }

    componentWillReceiveProps( newProps ) {
        this.setState( { logged: newProps.logged } );
    }

    handleChange = ( event, logged ) => {
        this.setState( { logged } );
    };

    render() {
        const name = "" || this.props.name;
        return (
      <div>
        <AppBar
          title ={ this.state.logged ? `Welcome, ${ name.capitalize() }` : "Conference Management System" }
          iconElementLeft={ this.state.logged ? <Avatar
          size={35}
          backgroundColor={purple500}
          style={style}
        >
          {name.toUpperCase()[ 0 ]}
        </Avatar> : <IconButton> <HomeIcon/></IconButton>}
          iconElementRight={ this.state.logged ? <Logged logOut={this.props.logOut}/> : <Login />}
        />
      </div>
        );
    }
}

export default MyAppBar;
