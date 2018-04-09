import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Row, Col } from 'reactstrap';
import DistanceOptions from "./DistanceOptions";
import OptimizationOptions from "./OptimizationOptions";

/* Renders a text heading above the application with useful information.
 */
class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            trip: {
                title: "",
            },
            settingsModalOpen: false
        }
    }

    toggle() {
        this.setState({
            settingsModalOpen: !this.state.settingsModalOpen
        });
    }

    render() {
        return (
            <span>
                <Button className="float-right" onClick={this.toggle}>
                    Menu
                </Button>
                <Modal isOpen={this.state.settingsModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Menu</ModalHeader>
                    <ModalBody>
                        <Button>Save</Button>
                        <Button>Load</Button>
                        <hr />
                        <DistanceOptions config = {this.props.config} updateOptions={this.props.updateOptions}/>
                        <OptimizationOptions config = {this.props.config} updateOptimization={this.props.updateOptimization}/>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </span>
        )
    };

}

export default SearchModal;
