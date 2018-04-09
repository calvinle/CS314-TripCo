import React, {Component} from 'react';
import { Navbar, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, InputGroupText, Input, Button} from 'reactstrap';
import SettingModal from './SettingModal';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      trip: {
        title: "",
      },
    }
  }

  render() {
    return(
      <div>
        <Navbar id="header" fixed="top">
          <InputGroup id="titleEntry">
            <Input placeholder="Enter Title..." />
          </InputGroup>
          <img src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%" id="topLogo" />
          <SettingModal />
        </Navbar>
      </div>
    )
  };

}

export default Header;
