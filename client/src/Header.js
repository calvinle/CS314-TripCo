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
import '/Users/Boulderc30/IdeaProjects/t12/client/css/styles.css';
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
    <nav>
    <div className="add-header-height">
                                        <div id="responsiveHeaderContainer">

                                            <a href="http://cs.colostate.edu" id="csuHeaderLink">
                                                <img id="csuLargeLogo" src="http://cs.colostate.edu/~tomcavey/signature-oneline.svg" width="350" height="45" alt="Colorado State University"/>
                                                <img id="csuMedLogo" src="http://cs.colostate.edu/~tomcavey/signature-stacked.svg" width="172" height="45" alt="Colorado State University"/>
                                                <img id="csuSmallLogo" src="http://cs.colostate.edu/~tomcavey/signature-mobile.svg" width="113" height="45" alt="Colorado State University"/>
                                            </a>

                                            <div id="responsiveLogoSubsystem">
                                                <a href="https://www.cs.colostate.edu" id="cnsHeaderLink" title="">
                                                    <h1 id="cnsHeaderText" className="larger-CSUtext">
                                                        <div>computer </div>
                                                        <div> science</div>
                                                        {/*id={"csText"}*/}

                                                    </h1>
                                                </a>
                                            </div>



                                            {/*/!*<img src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%" id="topLogo"/>*!/*/}
                                        </div>
    </div>
    </nav>

                                        <SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}
                                                      updateTrip={this.props.updateTrip} trip={this.props.trip}
                                                      updateUserDef={this.props.updateUserDef} updatePort = {this.props.updatePort} host={this.props.host}
                                                      updateOptimization={this.props.updateOptimization}
                                                      updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>

</div>




        )
    };

}

export default Header;
