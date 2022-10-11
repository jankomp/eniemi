
import React from "react";
import { db } from '../firebase.js';
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';

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
