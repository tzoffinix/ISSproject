import React, { Component } from "react";
import FontIcon from "material-ui/FontIcon";
import { BottomNavigation, BottomNavigationItem } from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import BidProposalForm from "./BidProposalForm";
import ReviewProposalForm from "./ReviewProposalForm";
const peopleIcon = <FontIcon className="material-icons">people</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">notifications</FontIcon>;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomNavigationExampleSimple extends Component {
    state = {
        selectedIndex: 0
    };

    select = ( index ) => this.setState( { selectedIndex: index } );

    componentWillMount() {
        this.setState( { selectedIndex: 0 } );
    }
    render() {
        return (
            <div>
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Bid for Proposals"
            icon={peopleIcon}
            onTouchTap={() => this.select( 0 )}
          />
          <BottomNavigationItem
            label="See asigned"
            icon={favoritesIcon}
            onTouchTap={() => this.select( 1 )}
          />
        </BottomNavigation>
      </Paper>
      {this.state.selectedIndex === 0 ? <BidProposalForm user={this.props.user}/> : <ReviewProposalForm user={this.props.user}/>}
      </div>
        );
    }
}

export default BottomNavigationExampleSimple;
