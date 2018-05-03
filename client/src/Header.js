import React, {Component} from 'react';
import {
    Navbar,
    NavItem,
    Nav,
    NavbarBrand,
    NavLink,
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
    {/*<div className={"topbar"}>*/}
        <div id={"header"}>
            <div className="add-header-height">
            <div id="responsiveHeaderContainer">
                <a href="http://www.colostate.edu" id="csuHeaderLink">
                    <img id="csuLargeLogo" src="http://cs.colostate.edu/~tomcavey/signature-oneline.svg" width="350" height="45" alt="Colorado State University"/>
                    <img id="csuMedLogo" src="http://cs.colostate.edu/~tomcavey/signature-stacked.svg" width="172" height="45" alt="Colorado State University"/>
                    <img id="csuSmallLogo" src="http://cs.colostate.edu/~tomcavey/signature-mobile.svg" width="113" height="45" alt="Colorado State University"/>
                </a>
                <div id="responsiveLogoSubsystem">
                    <a >
                        <h1 id={"textNav"}>
                            <span> Computer </span>
                            <span > Science </span>
                        </h1>
                    </a>
                </div>
            </div>
        {/*</div>*/}
        </div>
        </div>

    <div id={"goldLine"}> </div>

    <Navbar id={"whiteNav"}>

        <NavbarBrand>T12</NavbarBrand>

    <div className="add-header-height"> </div>
        <Nav>

            <NavItem>
                <NavLink>
                    <SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}
                          updateTrip={this.props.updateTrip} trip={this.props.trip}
                          updateUserDef={this.props.updateUserDef} updatePort = {this.props.updatePort} host={this.props.host}
                          updateOptimization={this.props.updateOptimization}
                          updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>
                </NavLink>
            </NavItem>
        </Nav>
    </Navbar>
</div>
        )
    };
}

export default Header;
