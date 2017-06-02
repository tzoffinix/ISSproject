import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import Menu from "../components/Menu";
import MyAppBar from "../components/AppBar";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

export default class UserDashboard extends Component {
    constructor() {
        super();
        this.state = {
            userId: cookies.get( "iss_userId" ),
            user: {

            }
        };
    }
    componentWillMount() {
        axios.get( `users/${  this.state.userId }` ).then( ( response )=>{
            this.setState( { user: response.data.payload.user } );
        } );
    }
    render() {
        console.log( this.state );
        return ( <div>
                { `Welcome, ${  this.state.user.username } !` }
                 </div>
        );
    }
}
