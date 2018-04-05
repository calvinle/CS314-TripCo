import React, {Component} from 'react';
import {Navbar, NavDropdown, Nav, Image, FormGroup, FormControl, Button, Glyphicon} from 'react-bootstrap';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
    this.state = {
      trip: {
        title: "",
      }
    }
  }

  render() {
    return(
      <Navbar id="header" fixedTop>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Enter Title..." />
          </FormGroup>{' '}
          <Button type="submit">
            <Glyphicon glyph="floppy-disk" />
          </Button>
        </Navbar.Form> 
        <Image src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%" id="topLogo"/>
        <Nav pullRight>
          <NavDropdown eventKey = {3} title = "Menu" id="menu">
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  };

}

export default Header;
