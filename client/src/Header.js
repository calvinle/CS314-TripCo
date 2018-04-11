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
        this.loadTFFI = this.loadTFFI.bind(this);
        this.fieldChange = this.fieldChange.bind(this);
        this.plan = this.plan.bind(this);
    }

    fetchResponse() {
        // need to get the request body from the trip in state object.
        let requestBody = this.props.trip;

        console.log(process.env.SERVICE_URL);
        console.log(requestBody);

        return fetch('http://' + location.host + '/plan', {
            method: "POST",
            body: JSON.stringify(requestBody)
        });
    }

    async plan() {
        try {
            let serverResponse = await this.fetchResponse();
            let tffi = await serverResponse.json();
            console.log(tffi);
            this.props.updateTrip(tffi);
        } catch (err) {
            console.error(err);
        }
    }

    loadTFFI(event) {
        console.log(event.target.files[0].name);
        //Found via StackOverflow and modified:
        //https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
        let file = event.target.files[0];
        if (!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = function (event) {
            let fileContents = JSON.parse(event.target.result);
            if (this.validTFFI(fileContents)) {
                this.setState({count: fileContents.places.length - 1});
                this.props.updateTrip(fileContents);
            }
            else {
                this.alertMsg();
            }
        }.bind(this);
        reader.readAsText(file);
        // then you need to set the trip property
        // this.props.updateTrip(??);
    }

    fieldChange(event) {
        this.props.updateTitle(event.target.value);
    }

    render() {
        return (
            <div>
                <Navbar id="header" fixed="top">
                    <InputGroup id="titleEntry">
                        <InputGroupAddon addonType="prepend"><Button disabled={!this.props.trip.title}
                                                                     onClick={this.plan}
                                                                     type="button">Plan</Button></InputGroupAddon>
                        <Input placeholder="Enter Title..." type="text" value={this.props.trip.title}
                               onChange={this.fieldChange}/>
                    </InputGroup>
                    <img src="http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png" width="30%"
                         id="topLogo"/>
                    <SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}
                                  updateTrip={this.props.updateTrip} trip={this.props.trip}
                                  updateUserDef={this.props.updateUserDef}
                                  updateOptimization={this.props.updateOptimization}
                                  updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>
                </Navbar>
            </div>
        )
    };

}

export default Header;
