import React, { Component } from 'react';
var duration = 0;
class FileUpload extends Component {
    state = {
        selectedFile: null
    };
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        //get duration of file
        var reader = new FileReader();
        reader.onload = function() {
            var aud = new Audio(reader.result);
            aud.onloadedmetadata = function() {
                console.log(aud.duration);
                document.getElementById('duration').innerHTML = aud.duration;
                duration = aud.duration;
            };
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    onFileUpload = () => {
        const formData = new FormData();
        formData.append("myFile", this.state.selectedFile, this.state.selectedFile.name, this.state.duration);
        console.log(this.state.selectedFile, duration);
    };
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>File Duration: </p> <span id = 'duration'>Loading...</span> 
                </div>
            );
        } else {
            return(
                <div>
                    <br></br>
                        Choose file.
                </div>
            );
        }
    };
    render() {
        return(
            <div>
                <h1>
                    File Upload
                </h1>
                <div>
                    <input type = "file" onChange = {this.onFileChange}></input>
                    <button onClick = {this.onFileUpload}>Upload!</button>
                </div>
                {this.fileData()}
            </div>
        )
    }
}

export default FileUpload;