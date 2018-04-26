import React, {Component} from 'react';
import {
    Navbar,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button
} from 'reactstrap';
import SettingModal from './SettingModal';
import SearchModal from './SearchModal';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar id="header">
                    <img src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%"
                         id="topLogo"/>
                    <SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}
                                  updateTrip={this.props.updateTrip} trip={this.props.trip}
                                  updateUserDef={this.props.updateUserDef} updatePort = {this.props.updatePort} host={this.props.host}
                                  updateOptimization={this.props.updateOptimization}
                                  updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>
                </Navbar>
            </div>
        )
    };

}

export default Header;
