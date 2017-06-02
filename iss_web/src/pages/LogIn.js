import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card";
import axios from "axios";
import MyAppBar from "../components/AppBar";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            user: cookies.get( "iss_user" ),
            userName: " ",
            password: " ",
            userNameErrorText: null,
            passwordErrorText: null
        };
        this.login = this.login.bind( this );
        this.setPassword = this.setPassword.bind( this );
        this.setUserName = this.setUserName.bind( this );
        this._handleKeyPress = this._handleKeyPress.bind( this );
    }

    componentWillMount() {
        if ( this.state.user ) {
            this.props.history.push( "/" );
        }
    }

    setUserName( event ) {
        this.setState( { userName: event.target.value } );
    }

    setPassword( event ) {
        this.setState( { password: event.target.value } );
    }

    _handleKeyPress = ( e ) => {
        if ( e.key === "Enter" ) {
            this.login();
        }
    }

    login() {
        this.setState( {
            userNameErrorText: null,
            passwordErrorText: null
        } );
        axios.post( "users/login", {
            username: this.state.userName,
            password: this.state.password
        } ).then( ( response )=>{
            const data = response.data;
            console.log( data );
            if ( data.message === "Authentication failed. Wrong password." ) {
                this.setState( {
                    passwordErrorText: "wrong password"
                } );
            }
            if ( data.message === "Authentication failed. User not found." ) {
                this.setState( {
                    userNameErrorText: "user not found"
                } );
            }
            if ( data.success === true ) {
                const d = new Date();
                d.setTime( d.getTime() + ( 3600 * 60 * 1000 ) );

                cookies.set( "iss_user", data.token, { path: "/", expires: d } );
                cookies.set( "iss_userId", data.user._id, { path: "/", expires: d } );
                this.props.history.push( "/" );
            }
        } );
    }

    render() {
        return (
            <div>
            <MyAppBar/>
                    <div className="container ">
                        <div className="row u-text-center">
                            <div className="col-lg-6 col-md-8 col-xs-12 u-margin-0">
                            <Card className="form u-text-center" expanded={true}>
                                <CardHeader
                                    title="URL Avatar"
                                    />
                                <div className="u-margin-0">
                                    <TextField
                                        onChange={this.setUserName}
                                        floatingLabelText="Username"
                                        errorText={this.state.userNameErrorText}
                                        onKeyPress={this._handleKeyPress}
                                    /><br />
                                    <TextField
                                        onChange={this.setPassword}
                                        floatingLabelText="Password"
                                        type="password"
                                        errorText={this.state.passwordErrorText}
                                        onKeyPress={this._handleKeyPress}
                                    /><br />
                                    <RaisedButton onClick={this.login} className="login-button" label="LogIn"  />
                                </div>
                            </Card>
                            </div>
                         </div>
                    </div>

            </div>
        );
    }
}
