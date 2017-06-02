import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card";

import MyAppBar from "../components/AppBar";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            username: null,
            email: null,
            affiliation: null,
            password: null,
            cPassword: null
        };
    }
    componentWillMount() {
        if ( this.state.user ) {
            this.props.history.push( "/" );
        }
    }
    setUsername( event ) {
        this.setState( { username: event.target.value } );
    }
    setPassword( event ) {
        this.setState( { password: event.target.value } );
    }
    setcPassword( event ) {
        this.setState( { cPassword: event.target.value } );
    }
    setEmail( event ) {
        this.setState( { email: event.target.value } );
    }
    setAffiliation( event ) {
        this.setState( { affiliation: event.target.value } );
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
                                        floatingLabelText="Username"
                                        onChange={ this.setUsername }
                                    /><br />
                                    <TextField
                                        floatingLabelText="Email"
                                        onChange={ this.setEmail }
                                        errorText={this.state.EmailErrorText}
                                    /><br />
                                     <TextField
                                        floatingLabelText="Affiliation"
                                        onChange={ this.setAffiliation }
                                    /><br />
                                    <TextField
                                        onChange={ this.setPassword }
                                        floatingLabelText="Password"
                                        type="password"
                                        errorText={this.state.passwordErrorText}
                                    /><br />
                                    <TextField
                                        onChange={ this.setcPassword }
                                        floatingLabelText="Confirm Password"
                                        type="password"
                                        errorText={this.state.cPasswordErrorText}
                                    /><br />
                                    <RaisedButton className="login-button" label="Register" color="#4CAF50" />
                                </div>
                            </Card>
                            </div>
                         </div>
                    </div>

            </div>
        );
    }
}
