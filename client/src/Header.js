import React, {Component} from 'react';
import {
    Navbar,
    NavItem,
    Nav,
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
                <a href="https://cs.colostate.edu" id="csuHeaderLink">
                    <img id="csuLargeLogo" src="http://cs.colostate.edu/~tomcavey/signature-oneline.svg" width="350" height="45" alt="Colorado State University"/>
                    <img id="csuMedLogo" src="http://cs.colostate.edu/~tomcavey/signature-stacked.svg" width="172" height="45" alt="Colorado State University"/>
                    <img id="csuSmallLogo" src="http://cs.colostate.edu/~tomcavey/signature-mobile.svg" width="113" height="45" alt="Colorado State University"/>
                </a>
                <div id="responsiveLogoSubsystem">
                    <a href="https://www.cs.colostate.edu" id="cnsHeaderLink" title="">
                        <h1 id={"larger-CSUtext"}>
                            <span id="cnsHeaderText" style={{"display" :"inline-block;"}}> Computer </span>
                            <span id="cnsHeaderText" style={{"display" :"inline-block;"}}> Science </span>
                        </h1>
                    </a>
                </div>
            </div>
        {/*</div>*/}
        </div>
</div>

    <div id={"goldLine"}>
    </div>

    <Navbar id={"navBarLower"}>
    <div className="add-header-height">
    </div>
        <Nav>
            <NavItem>
                <NavLink>Load trip</NavLink>
            </NavItem>
            <NavItem>
                <NavLink>Save trip</NavLink>
            </NavItem>

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


    {/*<SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}*/}
                  {/*updateTrip={this.props.updateTrip} trip={this.props.trip}*/}
                  {/*updateUserDef={this.props.updateUserDef} updatePort = {this.props.updatePort} host={this.props.host}*/}
                  {/*updateOptimization={this.props.updateOptimization}*/}
                  {/*updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>*/}
                  </div>

        )
    };

}

export default Header;
