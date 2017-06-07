import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Card from "material-ui/Card";
import CardHeader from "material-ui/Card";
import ListExampleSimple from "./ItemList";
import ContentAdd from "material-ui/svg-icons/content/add";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Upload from "material-ui-upload/Upload";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class ProposalForm extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            abstract: null,
            topics: [],
            keywords: [],
            authors: [],
            file: null,
            uploaded: false
        };
        this.setAuthor = this.setAuthor.bind( this );
        this.addAuthor = this.addAuthor.bind( this );
        this.setName   = this.setName.bind( this );
        this.setKeyword = this.setKeyword.bind( this );
        this.addKeyword = this.addKeyword.bind( this );
        this.setTopic  = this.setTopic.bind( this );
        this.addTopic  = this.addTopic.bind( this );
        this.onFormSubmit = this.onFormSubmit.bind( this );
        this.onChange = this.onChange.bind( this );
        this.fileUpload = this.fileUpload.bind( this );
        this.removeAuthor = this.removeAuthor.bind( this );
        this.removeKeyword = this.removeKeyword.bind( this );
        this.removeTopic = this.removeTopic.bind( this );
        this.setAbstract = this.setAbstract.bind( this );
    }
    onFormSubmit( e ) {
        e.preventDefault(); // Stop form submit
        this.fileUpload( this.state.file ).then( ( response )=>{
            axios.post(
                "/proposals/create",
                {   userId: cookies.get( "iss_userId" ),
                    proposal: {
                        name: this.state.name,
                        abstract: this.state.abstract,
                        topics: this.state.topics,
                        authors: this.state.authors,
                        keywords: this.state.keywords,
                        file: response.data
                    } }
            ).then( ( res ) => {
            }  );
        } );
    }
    onChange( e ) {
        this.setState( { file: e.target.files[ 0 ] } );
    }
    fileUpload( file ) {
        const url = "/papers";
        const formData = new FormData();
        formData.append( "file", file );
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        return  axios.post( url, formData, config );
    }
    setName( event ) {
        this.setState( { name: event.target.value.trim() } );
    }
    setKeyword( event ) {
        this.setState( { keyword: event.target.value.trim() } );
    }
    addKeyword( event ) {
        if ( this.state.keyword !== "" ) {
            this.state.keywords.push( this.state.keyword );
            this.setState( this.state );
        }
    }
    setAbstract( event ) {
        this.setState( { abstract: event.target.value.trim() } );
    }
    setTopic( event ) {
        this.setState( { topic: event.target.value.trim() } );
    }
    addTopic( event ) {
        if ( this.state.topic !== "" ) {
            this.state.topics.push( this.state.topic );
            this.setState( this.state );
        }
    }
    setAuthor( event ) {
        this.setState( { author: event.target.value.trim() } );
    }
    addAuthor() {
        if ( this.state.author !== "" ) {
            this.state.authors.push( this.state.author );
            this.setState( this.state );
        }
    }
    removeAuthor( item ) {
        const index = this.state.authors.indexOf( item );
        this.state.authors.splice( index, 1 );
        this.setState( this.state );
    }
    removeKeyword( item ) {
        const index = this.state.keywords.indexOf( item );
        this.state.keywords.splice( index, 1 );
        this.setState( this.state );
    }
    removeTopic( item ) {
        const index = this.state.topics.indexOf( item );
        this.state.topics.splice( index, 1 );
        this.setState( this.state );
    }
    render() {
        return (
            <div>
                    <div className="container ">
                        <div className="row u-text-center">
                            <div className="col-lg-10 col-md-10 col-xs-12 u-margin-0">
                            <Card className="form u-text-center" expanded={true}>
                                <CardHeader
                                    title="URL Avatar"
                                    />
                                <div className="u-margin-0">
                                    <TextField
                                        style={{ width: "100%" }}
                                        hintText="Name"
                                        onChange={ this.setName }
                                    /><br />
                                    <TextField
                                        style={{ width: "100%" }}
                                        hintText="Abstract"
                                        multiLine={true}
                                        rows={8}
                                        rowsMax={10}
                                        onChange={this.setAbstract}
                                        /><br />
                                    <TextField
                                        style={{ width: "85%" }}
                                        hintText="Keywords"
                                        onChange={this.setKeyword}
                                    />
                                    <FloatingActionButton mini={true} onClick={this.addKeyword}> <ContentAdd/> </FloatingActionButton>
                                    <br />
                                     <ListExampleSimple  removeItem={this.removeKeyword} items={this.state.keywords} /><br/>
                                  <TextField
                                        style={{ width: "85%" }}
                                        hintText="Authors"
                                        onChange={this.setAuthor}
                                    />
                                    <FloatingActionButton mini={true} onClick={this.addAuthor}> <ContentAdd/> </FloatingActionButton>
                                    <br />
                                     <ListExampleSimple removeItem={this.removeAuthor} items={this.state.authors}/><br/>
                                  <TextField
                                        style={{ width: "85%" }}
                                        hintText="Topics"
                                        onChange={this.setTopic}
                                    />
                                    <FloatingActionButton mini={true} onClick={this.addTopic}> <ContentAdd/> </FloatingActionButton>
                                    <br />
                                     <ListExampleSimple removeItem={this.removeTopic}items={this.state.topics}/><br/>
                                     <input style={{ display: "block", margin: "0 auto" }} type="file" onChange={this.onChange} />
                                    <RaisedButton onClick={this.onFormSubmit} className="login-button" label="Submit" color="#4CAF50" />

                                </div>
                            </Card>
                            </div>
                         </div>
                    </div>

            </div>
        );
    }
}
