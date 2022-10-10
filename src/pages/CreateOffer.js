
import React from "react";

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
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    render() {
        return (
        <form>
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
            <input type="submit" value="Create Offer" />
        </form>
        );
    }
}