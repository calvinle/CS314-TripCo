import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter, InputGroup, Input, Row, Col } from 'reactstrap';
import DistanceOptions from "./DistanceOptions";
import OptimizationOptions from "./OptimizationOptions";

/* Renders a text heading above the application with useful information.
 */
class SettingModal extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            settingsModalOpen: false,
            count:0
        };
        this.loadTFFI = this.loadTFFI.bind(this);
        this.destroyClickedElement = this.destroyClickedElement.bind(this);
        this.saveTFFI = this.saveTFFI.bind(this);
    }

    validTFFI(fileContents)
    {

        let myArray1 = ["type", "title", "options", "places", "distances", "map"];
        let myArray2 = ["version","type", "title", "options", "places", "distances", "map"];
        let myArray3 = ["version", "title", "type", "options", "places"];
        let key = [];
        let i;
        let distFlag = false;

        for(let s in fileContents)
        {
            key.push(s);
        }

        console.log("key: ", key.length);

        if (key.length === 7)
        {
            for (i = 0; i < 7; i++)
            {
                if (!fileContents.hasOwnProperty(myArray2[i]))
                {
                    return false;
                }
            }
        }

        else if (key.length === 6)
        {
            for (i = 0; i < 6; i++)
            {
                if (!fileContents.hasOwnProperty(myArray1[i]))
                {
                    return false;
                }
            }
        }

        else if (key.length === 5)
        {
            distFlag = true;
            for (i = 0; i < 5; i++)
            {
                if (!fileContents.hasOwnProperty(myArray3[i]))
                {

                    return false;
                }
            }
            return true;
        }

        else
            return false;

        if(distFlag === false) {
            if (fileContents.distances[0] !== 0) {
                fileContents.places.push(fileContents.places[0]);
                fileContents.distances.unshift(0);
                return true;
            }
        }

    }

    alertMsg()
    {
        alert("File data is corrupt. Please review file format, or create new file below.");
        this.setState({ count: 0 });
    }

    loadTFFI(event) {
        console.log(event.target.files[0].name);
        //Found via StackOverflow and modified:
        //https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
        let file = event.target.files[0];
        if(!file) {
            console.log("in not file");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(event) {
            let fileContents = JSON.parse(event.target.result);
            console.log("after fileContents");
            if(this.validTFFI(fileContents)){
                console.log("in file validtffi file contents");
                this.setState({count: fileContents.places.length-1});
                this.props.updateTrip(fileContents);
            }
            else{
                console.log("in else this alertmsg");
                this.alertMsg();
            }
        }.bind(this);
        reader.readAsText(file);
        // then you need to set the trip property
        // this.props.updateTrip(??);
    }

    destroyClickedElement(event){
        document.body.removeChild(event.target);
    }

    //https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
    saveTFFI(){
        let contents = this.props.trip;
        contents.title = this.props.title;

        let textToSave = JSON.stringify(contents);
        let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        let fileNameToSaveAs = this.props.title;

        let downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = this.destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
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
                        <Button onClick={this.saveTFFI} type="button">Save</Button>
                        <Input type="file" name="file" onChange={this.loadTFFI} id="tffifile" />
                        {/*<h5>There are {this.state.count} destinations. </h5>*/}
                        <hr />
                        <DistanceOptions config = {this.props.config} query= {this.props.query} trip = {this.props.trip} updateUserDef={this.props.updateUserDef} updateOptions={this.props.updateOptions}/>
                        <OptimizationOptions config = {this.props.config} query= {this.props.query} trip = {this.props.trip} updateOptimization={this.props.updateOptimization} />
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </span>
        )
    };

}

export default SettingModal;
