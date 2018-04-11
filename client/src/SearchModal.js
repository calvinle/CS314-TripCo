import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Row, Col } from 'reactstrap';
import FilterOptions from "./FilterOptions";
/* Renders a text heading above the application with useful information.
 */
class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);
        this.state = {
            trip: {
                title: "",
            },
            modalOpen: false,
            filterModal: false

        }
    }

    toggle() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }
    toggleFilter() {
        this.setState({
            filterModal: !this.state.filterModal
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
                                <Button onClick={this.toggleFilter}>Filter</Button>
                                <Modal isOpen={this.state.filterModal} toggle={this.toggleFilter}>
                                    <ModalHeader size ="sm" toggle={this.toggleFilter}>Pick Filters</ModalHeader>
                                    <ModalBody>
                                        <FilterOptions config = {this.props.config} query={this.props.query} updateQuery = {this.props.updateQuery}/>
                                        {/*<Button onClick={this.saveFilters} type="button">Save</Button>*/}

                                    </ModalBody>
                                </Modal>

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
