import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import MyAppBar from "../components/AppBar";
import UserDashboard from "../pages/userDashboard";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            issUser: cookies.get( "iss_user" ),
            user: {
                name: ""
            }
        };
        this.logOut = this.logOut.bind( this );
        this.getUserInfo = this.getUserInfo.bind( this );
    }
    getUserInfo( userId ) {
        axios.get( `users/${ userId }` ).then( ( response )=>{
            this.setState( { user: response.data.payload.user } );
        } );
    }
    logOut() {
        cookies.remove( "iss_user" );
        cookies.remove( "iss_userId" );
        this.setState( {
            issUser: cookies.get( "iss_user" )
        } );
    }
    render() {
        const name = "" ||  this.state.user.name;
        return ( <div>
                    <MyAppBar name={name} logOut={this.logOut} logged={ this.state.issUser !== undefined }/>
                    {this.state.issUser !== undefined ? <UserDashboard user={this.state.user} getUserInfo={this.getUserInfo}/> : <div>Please log in.</div>}
                 </div>
        );
    }
}
