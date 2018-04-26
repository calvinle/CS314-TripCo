import React, { Component } from 'react';
import { ButtonToolbar, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import SearchModal from './SearchModal';
import SettingModal from './SettingModal';
import DestinationList from './DestinationList';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.fieldChange = this.fieldChange.bind(this);
        this.plan = this.plan.bind(this);
        this.loadTFFI = this.loadTFFI.bind(this);
        this.saveTFFI = this.saveTFFI.bind(this);
        this.state = {
            count:0,
            trip: this.props.trip
        };
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

    fieldChange(event) {
        this.props.updateTitle(event.target.value);
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
            return;
        }
        let reader = new FileReader();
        reader.onload = function(event) {
            let fileContents = JSON.parse(event.target.result);
            if(this.validTFFI(fileContents)){
                this.setState({count: fileContents.places.length-1});
                this.props.updateTrip(fileContents);
            }
            else{
                this.alertMsg();
            }
        }.bind(this);
        reader.readAsText(file);
        // then you need to set the trip property
        // this.props.updateTrip(??);
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


    render() {
        return (
            <span>
                <Input placeholder="Name My Trip" type="text" value={this.props.trip.title} onChange={this.fieldChange}/>
                <p></p>
                <DestinationList trip={this.state.trip}/>

                <p> Load my existing trip:</p>
                <Input type="file" name="file" onChange={this.loadTFFI} id="tffifile" />


                <p></p>
                <p> Continue creating the trip by adding destinations.</p>
                <SearchModal config = {this.props.config} query={this.props.query} addPlace= {this.props.addPlace} updateQuery = {this.props.updateQuery}/>

                <p></p>
                <p> When you're ready to see your trip, click plan. </p>
                <Button color="secondary"  disabled={!this.props.trip.title} onClick={this.plan} type="button">Plan</Button>
                <p></p>
                <Button onClick={this.saveTFFI} type="button">Save this trip</Button>

                <p></p>
                <SettingModal config={this.props.config} query = {this.props.query} title={this.props.trip.title}
                              updateTrip={this.props.updateTrip} trip={this.props.trip}
                              updateUserDef={this.props.updateUserDef} updatePort = {this.props.updatePort} host={this.props.host}
                              updateOptimization={this.props.updateOptimization}
                              updateOptions={this.props.updateOptions}  updateCount = {this.props.updateCount}/>

            </span>
        )
    };

}

export default SideDestinations;
