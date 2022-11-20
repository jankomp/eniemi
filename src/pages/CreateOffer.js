
import React,{ useRef, Component } from "react";
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { getAuth } from "firebase/auth"
import CategoryDropDown from "../components/CategoryDropDown.js";


export default CreateOfferComponent

function CreateOfferComponent(props) {
    const auth = getAuth();
    const user = auth.currentUser;

    const nameRef = useRef(null);
    const imageRef = useRef(null);

    const [offer, setOffer] = useState(
        {
            category: '',
            name: '',
            desc: '',
            price: 0,
            images: [],
            creator: '',
            creatorId: ''
        }
    );

    const navigate = useNavigate();

    function CategorySelected(newCategory) {
        setOffer({
            ...offer,
            category: newCategory[0].label
        });
    }

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
                //console.log(e.target.files[i]);
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
                            //console.log(updatedOffer);
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
        //console.log(offer);
        if (validateForm()) {
            addDoc( collection(db, "offers"), {
                category: offer.category,
                name: offer.name,
                desc: offer.desc,
                price: Number(offer.price),
                images: offer.images,
                creator: user.displayName,
                creatorId: user.uid,
                timestamp: serverTimestamp()
            } ).then((newOffer) => {
                //console.log(newOffer);
                navigate('/detailedOffer/' + newOffer.id);
            });
        }
    }

    function validateForm() {
        let name = nameRef.current?.value;
        if (name == "") {
          alert("Name must be filled out");
          return false;
        }
        let image = imageRef.current?.value;
        if (image == "") {
            alert("Upload at least one image");
            return false;
          }
        return true;
      }

      

    if (user) {
        return (
        <form onSubmit={SubmitForm}>
            <div className="uploadImgBox">
                <div className="image-upload">
                    <span>+</span>
                    <input
                        className="image-input"
                        type="file"
                        accept="image"
                        multiple
                        onChange={HandleInputChange}
                        ref={imageRef} />
                </div>
                <div className="image-upload">
                    <span>+</span>
                    <input
                        className="image-input"
                        type="file"
                        accept="image"
                        multiple
                        onChange={HandleInputChange}
                        ref={imageRef} />
                </div>
            </div>
            <div>
                <input 
                    name="name"
                    className="textInput"
                    type="text"
                    value={offer.name}
                    placeholder="Title"
                    onChange={HandleInputChange}
                    ref={nameRef} />

            </div>
            <div className="uploadImgBox uploadImgBox1">
                <input
                    name="price"
                    type="number"
                    className="textInput1"
                    placeholder="Price €"
                    value={offer.price}
                    onChange={HandleInputChange} />

                <CategoryDropDown  valueSelected={CategorySelected} />
            </div>
            <br />
            
           
            <textarea
                name="desc"
                type="textarea"
                className="textInput-textarea"
                placeholder="Description"
                value={offer.desc}
                onChange={HandleInputChange} />
            
            
            <br />
            <div>
                <input 
                    name="name"
                    className="textInput"
                    type="text"
                    value={offer.name}
                    placeholder="Location"
                    onChange={HandleInputChange}
                    ref={nameRef} />

            </div>
            <br />

            <div className="uploadImgBox uploadImgBox1">
                <input 
                    name="name"
                    className="textInput1"
                    type="text"
                    value={offer.name}
                    placeholder="Brand"
                    onChange={HandleInputChange}
                    ref={nameRef} />

                    <CategoryDropDown  valueSelected={CategorySelected} />

                     {/* <input 
                    name="name"
                    className="textInput1"
                    type="text"
                    value={offer.name}
                    placeholder="Condition"
                    onChange={HandleInputChange}
                    ref={nameRef} /> */}


            </div>
            <br />

            <input type="submit" className="submitCreate" value="Post" onSubmit={SubmitForm}/>
        </form>
        );
    } else {
        return (<h1>Not signed in.</h1>)
    }
}
