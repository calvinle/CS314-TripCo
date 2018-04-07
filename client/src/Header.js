import React, {Component} from 'react';
import { Navbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import DistanceOptions from "./DistanceOptions";
import OptimizationOptions from "./OptimizationOptions";

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      trip: {
        title: "",
      },
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return(
      <div>
        <Navbar id="header" fixed="top">
          <InputGroup id="titleEntry">
            <Input placeholder="Enter Title..." />
          </InputGroup>
          <img src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%" id="topLogo" />
          <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Menu
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem><Button>Save</Button></DropdownItem>
              <DropdownItem><Button>Load</Button></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><DistanceOptions /></DropdownItem>
              <DropdownItem><OptimizationOptions /></DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </Navbar>
      </div>
    )
  };

}

export default Header;
