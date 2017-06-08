import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import AssignForm from "./AssignForm";
import BottomNavigationExampleSimple from "./ReviewForm";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    }
};

export default class ChairTabs extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            value: "a"
        };
    }

    handleChange = ( value ) => {
        this.setState( {
            value
        } );
    };

    render() {
        return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Create conference" value="a">
        </Tab>
        <Tab label="Assign proposal" value="b">
            <AssignForm user={this.props.user}/>
        </Tab>
      </Tabs>
        );
    }
}
