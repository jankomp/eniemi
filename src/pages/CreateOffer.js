
import React from "react";
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';


export default function CreateOffer() {
    return (<><OfferForm></OfferForm></>)
}

class OfferForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            price: 0,
            images: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });

        if (target.type === 'file') {
            const storage = getStorage();

            const metadata = {
            contentType: 'image/jpeg'
            };
            for (let i = 0; i < target.files.length; i++) { 
                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'images/' + target.names[i]);
                //name = ref(storage, 'images/' + target.name);
                const uploadTask = uploadBytesResumable(storageRef, target.files[i], metadata);
                
                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                
                    // ...
                
                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                    }
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    });
                }
                );
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        addDoc( collection(db, "offers"), {
        name: this.state.name,
        desc: this.state.desc,
        price: this.state.price,
        images: this.state.images,
        timestamp: serverTimestamp()
    } )}

    render() {
        return (
        <form onSubmit={this.submitForm}>
            <label>
            Name:
            <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
            Description:
            <textarea
                name="desc"
                type="text"
                value={this.state.desc}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
            Price:
            <input
                name="price"
                type="number"
                value={this.state.price}
                onChange={this.handleInputChange} />
                €
            </label>
            <br />
            <label>
            Images:
            <input
                name="images"
                type="file"
                multiple
                onChange={this.handleInputChange} />
            </label>

            <br />
            <input type="submit" value="Create Offer" onSubmit={this.submitForm}/>
        </form>
        );
    }

}
