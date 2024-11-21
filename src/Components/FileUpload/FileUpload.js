import React, { Component } from 'react';
import axios from 'axios';
import './FileUpload.css';
import ecgImage from '../../assets/ecgImage.png';
import { db, auth } from '../../firebase';  // Import Firestore and Auth instances from your Firebase config
import { doc, setDoc, collection, getDocs } from "firebase/firestore";  // Import Firestore functions

// var duration = 0;

class FileUpload extends Component {
    state = {
        selectedFile: null,
        modelType: "EKG",
        result: null,
        userUploads: []
    };
    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
        //get duration of file
        // var reader = new FileReader();
        // reader.onload = function() {
        //     var aud = new Audio(reader.result);
        //     aud.onloadedmetadata = function() {
        //         console.log(aud.duration);
        //         document.getElementById('duration').innerHTML = aud.duration;
        //         duration = aud.duration;
        //     };
        // };
        //reader.readAsDataURL(event.target.files[0]);

    };

    onModelChange = event => {
        this.setState({ modelType: event.target.value });
    };

    componentDidMount() {
        const user = auth.currentUser;
        if (user) {
            this.fetchUserUploads(user.uid);
        }
    }

    onFileUpload = async () => {
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        formData.append("model_choice", this.state.modelType);
        
        await axios.post("http://localhost:5000/upload", formData).then (async function (response) {
            const result = response.data;
            this.setState(result);
            console.log(result);
            document.getElementById('res').innerHTML = result;

            try {
                const user = auth.currentUser;
                if (user) {
                    const docRef = doc(db, "users", user.uid, "uploads", this.state.selectedFile.name);
                    await setDoc(docRef, {
                        modelType: this.state.modelType,
                        dateUploaded: new Date().toISOString(),
                        result: result
                    });
                    console.log("Data stored");
                    this.fetchUserUploads(user.uid);
                }
            } catch (error) {
                console.error("Error writing document: ", error);
            }

        }).catch(function (error) {
            console.log(error.response.data);
        });
    };

    fetchUserUploads = async (userId) => {
        const uploadsRef = collection(db, "users", userId, "uploads");
        const querySnapshot = await getDocs(uploadsRef);
        const uploads = querySnapshot.docs.map(doc => doc.data());
        this.setState({ userUploads: uploads });
    };

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div className = "fileDetails" >
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>Result: </p> <span id = 'res'>Loading...</span>
                </div>
            );
        } else {
            return 
            // return(
            //     <div className="chooseFile">
            //         <br></br>
            //             Choose file
            //     </div>
            // );
        }
    };
    render() {
        return(
            <div >
                <div>
                    <h1 className="pageHeader">
                        Arrhythmia Detection Project
                    </h1>
                    <p className="projectDescription">
                    The objective of this project is to develop a machine learning system for the detection of arrhythmias using
                    sound data captured from the heart. Arrhythmia is an abnormal heart rhythm that can have serious health
                    implications. Traditional methods for diagnosing arrhythmia primarily rely on electrocardiogram (ECG) signals,
                    and technologicals advancements have shown that signals captured from these ECGs can also provide valuable
                    information for accurate detection. The challenge is to design an algorithm that can analyze an ECG, extract
                    relevant features, and classify them into normal or arrhythmic categories. The development of such a system
                    has the potential to complement existing diagnostic methods and enhance the accuracy of arrhythmia detection,
                    leading to improved and expedited patient care and management of cardiac conditions. 
                    </p>
                </div>
                <div className="fileUpload ">
                    <h2 className="fileUploadHeader">
                        Upload ECG
                    </h2>
                    <div>
                        <label>Select Model: </label>
                        <select value={this.state.modelType} onChange={this.onModelChange}>
                            <option value="EKG">EKG</option>
                            <option value="Audio">Heartbeat Audio</option>
                        </select>
                    </div>

                    <div className="fileButton">
                        <input type="file" onChange={this.onFileChange}></input>
                    </div>

                    <div>
                        <button className="uploadButton"
                                onClick={this.onFileUpload}>Upload!
                        </button>
                    </div>

                    {this.fileData()}

                    <div className="userUploads">
                        <h2>Your Upload History:</h2>
                        {this.state.userUploads.length > 0 ? (
                            <ul>
                                {this.state.userUploads.map((upload, index) => (
                                    <li key={index}>
                                        <p><strong>Model Type:</strong> {upload.modelType}</p>
                                        <p><strong>Date
                                            Uploaded:</strong> {new Date(upload.dateUploaded).toLocaleString()}</p>
                                        <p><strong>Result:</strong> {upload.result}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No uploads yet.</p>
                        )}
                    </div>
                </div>

                <div>
                    <img className='ecgImage' src={ecgImage} alt="ecgImage"/>
                </div>
            </div>
        )
    }
}

export default FileUpload;