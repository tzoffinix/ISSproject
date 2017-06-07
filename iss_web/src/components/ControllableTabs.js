import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import ProposalForm from "./ProposalForm";
import ReviewForm from "./ReviewForm";
import BottomNavigationExampleSimple from "./ReviewForm";

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    }
};

export default class TabsExampleControlled extends React.Component {

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
        <Tab label="Submit a proposal" value="a">
          <ProposalForm/>
        </Tab>
        <Tab label="Review proposals" value="b">
            <BottomNavigationExampleSimple user={this.props.user}/>
        </Tab>
      </Tabs>
        );
    }
}
