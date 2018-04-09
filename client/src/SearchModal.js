import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Row, Col } from 'reactstrap';

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
            modalOpen: false
        }
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    render() {
        return (
            <span>
                <Button className="float-right" onClick={this.toggle}>
                    +
                </Button>
                <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Destination</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs={2}>
                                <Button>Filter</Button>
                            </Col>
                            <Col xs={7}>
                                <InputGroup id="searchEntry">
                                    <Input placeholder="Enter Search" />
                                </InputGroup>
                            </Col>
                            <Col xs={3}>
                                <Button block>Search</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button>Cancel</Button>
                        <Button>Add</Button>
                    </ModalFooter>
                </Modal>
            </span>
        )
    };

}

export default SearchModal;
