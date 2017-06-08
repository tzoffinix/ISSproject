import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import MyAppBar from "../components/AppBar";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            affiliation: "",
            password: "",
            cPassword: "",
            role: "AUTHOR",
            name: "",
            conferences: [],
            registered: false
        };
        this.setUsername = this.setUsername.bind( this );
        this.setPassword = this.setPassword.bind( this );
        this.setcPassword = this.setcPassword.bind( this );
        this.setEmail = this.setEmail.bind( this );
        this.setAffiliation = this.setAffiliation.bind( this );
        this.validateEmail = this.validateEmail.bind( this );
        this.submitData = this.submitData.bind( this );
        this.setName = this.setName.bind( this );
        this.generateConferences = this.generateConferences.bind( this );
    }
    componentWillMount() {
        axios.get( "conferences/getConferences" ).then( ( response ) =>{
            this.setState( { conferences: response.data.payload } );
        } );
        if ( this.state.user ) {
            this.props.history.push( "/" );
        }
    }
    generateConferences() {
        return this.state.conferences.map(
            ( conf )=> <MenuItem value={conf.id} primaryText={conf.name}/>
            );
    }
    setUsername( event ) {
        this.setState( { username: event.target.value, usernameErrorText: null }, ()=> {
            if ( this.state.username.length === 0  )            {
                this.setState( { usernameErrorText: "Username cannot be empty" } );
            }
        } );
    }
    setName( event ) {
        this.setState( { name: event.target.value, sernameErrorText: null }, ()=> {
            if ( this.state.name.length === 0  )            {
                this.setState( { nameErrorText: "name cannot be empty" } );
            }
        } );
    }
    setPassword( event ) {
        this.setState( { password: event.target.value, passwordErrorText: null }, ()=>{
            if ( this.state.password.length === 0  )            {
                this.setState( { passwordErrorText: "Password cannot be empty" } );
            }
        } );
    }
    setcPassword( event ) {
        this.setState( { cPassword: event.target.value, cPasswordErrorText: null }, ()=>{
            if ( this.state.cPassword !== this.state.password )            {
                this.setState( { cPasswordErrorText: "Passwords do not match" } );
            }
        } );
    }
    setEmail( event ) {
        this.setState( { email: event.target.value, emailErrorText: null }, ()=>{
            if ( !this.validateEmail( this.state.email ) )            {
                this.setState( { emailErrorText: "Invalid Email" } );
            }
        } );
    }
    setAffiliation( event ) {
        this.setState( { affiliation: event.target.value } );
    }

    validateEmail( email ) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( email );
    }
    handleChange = ( event, index, value ) => this.setState( { role: value } );
    handleConferenceChange = ( event, index, value ) => this.setState( { conference: value } );

    submitData() {
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            affiliation: this.state.affiliation,
            role: this.state.role,
            name: this.state.name,
            conferenceId: this.state.conferenceId
        };
        axios.post( "/users/registration", data ).then(
            ( res )=>{
                this.setState( { registered: true } );
            }
        );
    }
    render() {
        return ( <div className="u-text-center">
            { this.state.registered ? <h3 style={{ marginTop: "200px" }}className="u-margin-0">Registration succesful</h3> :
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
                                        floatingLabelText="Name"
                                        onChange={ this.setName }
                                        errorText={this.state.nameErrorText}
                                    /><br />
                                    <TextField
                                        floatingLabelText="Username"
                                        onChange={ this.setUsername }
                                        errorText={this.state.usernameErrorText}
                                    /><br />
                                    <TextField
                                        floatingLabelText="Email"
                                        onChange={ this.setEmail }
                                        errorText={this.state.emailErrorText}
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
                                    <div>
                                    <DropDownMenu style={{ width: "71%" }}value={this.state.role} onChange={this.handleChange}>
                                        <MenuItem value="AUTHOR" primaryText="Author" />
                                        <MenuItem value="REVIEWER" primaryText="PC Member" />
                                        <MenuItem value="CHAIR/CO-CHAIR" primaryText="Chair/Co-chair" />
                                        <MenuItem value="LISTENER" primaryText="Listener" />
                                    </DropDownMenu>
                                    </div>
                                    <DropDownMenu
                                        disabled={this.state.role === "CHAIR/CO-CHAIR"}
                                        style={{ width: "71%" }} value={this.state.conference} onChange={this.handleConferenceChange}>
                                        {this.generateConferences()}
                                    </DropDownMenu>
                                    <RaisedButton
                                     disabled={ !!this.state.cPasswordErrorText || !!this.state.emailErrorText || !!this.state.usernameErrorText || !!this.state.passwordErrorText}
                                     className="login-button"
                                     onClick={this.submitData}
                                     label="Register" color="#4CAF50" />
                                </div>
                            </Card>
                            </div>
                         </div>
                    </div>

            </div> } </div>
        );
    }
}
