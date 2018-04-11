import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, Input, Row, Col } from 'reactstrap';
import FilterOptions from "./FilterOptions";
import SearchTable from './SearchTable';
/* Renders a text heading above the application with useful information.
 */
class SearchModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.toggleFilter = this.toggleFilter.bind(this);

        this.updateQ = this.updateQ.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.fetchResponse = this.fetchResponse.bind(this);
        this.plan = this.plan.bind(this);
        this.conditionalSearch = this.conditionalSearch.bind(this);
        this.addEntryDB = this.addEntryDB.bind(this);
        this.fieldChange = this.fieldChange.bind(this);


        this.state = {
            trip: {
                title: "",
            },
            modalOpen: false,
            filterModal: false,
            query: { // query TFFI
                version: 3,
                type: "query",
                query: "",
                places: [],
                filters:
                    {   "attribute" : "",
                        "values" : []
                    }
            }
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

    updateQuery(tffi) {
        console.log("updateQuery");
        console.log(tffi);
        this.setState({query: tffi});
    }

    fetchResponse(tQuery){
        // need to get the request body from the trip in state object.
        //let requestBody = this.state.query;
        let requestBody = tQuery;
        console.log("request body", requestBody);

        return fetch('http://' + location.host +'/query', {
            method:"POST",
            body: JSON.stringify(requestBody)
        });
    }

    async plan(tQuery){
        try {
            console.log(this.state.query);
            let serverResponse = await this.fetchResponse(tQuery);
            let tffi = await serverResponse.json();
            console.log("in asyncPlan: ", tffi);
            this.updateQuery(tffi);
        } catch(err) {
            console.error(err);
        }
    }


    newQuery(arg) {
        //this.props.updateOptions(arg);
        console.log("in Database.js: ", arg);
        var testQuery = Object.assign({}, this.props.query);
        testQuery.query = arg;
        console.log("testQuery: ", testQuery);
        //this.setState({query: testQuery});
        this.plan(testQuery);
    }

    updateQ() {
        this.newQuery(document.getElementById("search").value);
    }

    addEntryDB(place){
        this.props.addPlace(place);
    }


    conditionalSearch(){
        if(this.state.query.query !== ""){
            return <SearchTable query={this.state.query} addEntryDB = {this.addEntryDB}/>
        }
    }

    fieldChange(event) {
        this.updateQuery(event.target.value);
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
                                    <ModalFooter>
                                    </ModalFooter>
                                </Modal>

                            </Col>
                            <Col xs={7}>

                                <InputGroup id="searchEntry">
                                    <InputGroupAddon addonType="prepend"><Button onClick={this.updateQ} type="button">Search</Button></InputGroupAddon>
                                    <Input id="search" placeholder="Enter search" type="text" />
                                </InputGroup>

                            </Col>
                            <Col xs={12}>

                                {this.conditionalSearch()}

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
