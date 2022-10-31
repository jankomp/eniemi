
import React from "react";
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getAuth } from "firebase/auth"


export default CreateOfferComponent

function CreateOfferComponent(props) {
    const auth = getAuth();
    const user = auth.currentUser;

    const [offer, setOffer] = useState(
        {
            name: '',
            desc: '',
            price: 0,
            images: [],
            creator: '',
            creatorId: ''
        }
    );

    const navigate = useNavigate();

    const HandleInputChange = (e) => {
        setOffer({
            ...offer,
            [e.target.name]: e.target.value
        });

        if (e.target.type === 'file') {
            setOffer(offer => {
                const updatedOffer = { ...offer };
                updatedOffer.images = [];
                return updatedOffer;
            });

            const storage = getStorage();

            const metadata = {
            contentType: 'image/jpeg'
            };
            for (let i = 0; i < e.target.files.length; i++) { 
                // Upload file and metadata to the object 'images/mountains.jpg'
                const storageRef = ref(storage, 'images/' + e.target.files[i].name);
                //name = ref(storage, 'images/' + e.target.name);
                console.log(e.target.files[i]);
                const uploadTask = uploadBytesResumable(storageRef, e.target.files[i], metadata);
                
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
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setOffer(offer => {
                            const updatedOffer = { ...offer };
                            updatedOffer.images = Array.from(updatedOffer.images);
                            updatedOffer.images.push(downloadURL);
                            console.log(updatedOffer);
                            return updatedOffer;
                        });
                        });
                    }
                );
            }
        }
    }

    function SubmitForm(event) {
        event.preventDefault();
        console.log(offer);
        addDoc( collection(db, "offers"), {
            name: offer.name,
            desc: offer.desc,
            price: Number(offer.price),
            images: offer.images,
            creator: user.displayName,
            creatorId: user.uid,
            timestamp: serverTimestamp()
        } ).then((newOffer) => {
            console.log(newOffer);
            navigate('/detailedOffer/' + newOffer.id);
        });
    }

    if (user) {
        return (
        <form onSubmit={SubmitForm}>
            <label>
            Name:
            <input
                name="name"
                type="text"
                value={offer.name}
                onChange={HandleInputChange} />
            </label>
            <br />
            <label>
            Description:
            <textarea
                name="desc"
                type="text"
                value={offer.desc}
                onChange={HandleInputChange} />
            </label>
            <br />
            <label>
            Price:
            <input
                name="price"
                type="number"
                value={offer.price}
                onChange={HandleInputChange} />
                €
            </label>
            <br />
            <label>
            Images:
            <input
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={HandleInputChange} />
            </label>

            <br />
            <input type="submit" value="Create Offer" onSubmit={SubmitForm}/>
        </form>
        );
    } else {
        return (<h1>Not signed in.</h1>)
    }
}
