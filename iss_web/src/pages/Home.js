import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import Menu from "../components/Menu";
import MyAppBar from "../components/AppBar";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: cookies.get( "iss_user" )
        };
        this.logOut = this.logOut.bind( this );
    }
    logOut() {
        cookies.remove( "iss_user" );
        cookies.remove( "iss_userId" );
        this.setState( {
            user: cookies.get( "iss_user" )
        } );
    }
    render() {
        return ( <div>
                    <MyAppBar logOut={this.logOut} logged={ this.state.user !== undefined }/>
                 </div>
        );
    }
}
