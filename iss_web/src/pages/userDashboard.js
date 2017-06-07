import React, { Component } from "react";
import { Link } from "react-router-dom";
import RaisedButton from "material-ui/RaisedButton";
import MyAppBar from "../components/AppBar";
import TabsExampleControlled from "../components/ControllableTabs";

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
        this.props.getUserInfo( this.state.userId );
    }
    render() {
        return ( <div className="u-text-center">
                {/*<h2 className="u-margin-0" style={
                { background: "url(https://image.prntscr.com/image/27f4d4c05b3e41bbbbeb778cf5bd7b96.png)",
                    color: "white",
                    padding: "50px",
                    marginTop: "25px"
                }}> JS Heroes 2017</h2>*/}
                <TabsExampleControlled user={this.props.user}/>
                 </div>
        );
    }
}
