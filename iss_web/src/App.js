import React, { Component } from "react";
import logo from "./logo.svg";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Register from "./pages/Register";

injectTapEventPlugin();
import Cookies from "universal-cookie";
const cookies = new Cookies();

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: cookies.get( "iss_user" )
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router>
                    <div>
                        <Route exact path="/" component={ Home } />
                        <Route path="/login" component={ LogIn } />
                        <Route path="/register" component={ Register } />
                    </div>
                </Router>

            </MuiThemeProvider>
        );
    }
}

export default App;
