import {React, useState} from "react";


export default function OfferListFilter({returnFilter}) {
    const [filter, setFilter] = useState(
        {
            maxPrice: 0
        }
    );

    const HandleInputChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form onSubmit={event => returnFilter(event, filter)}>
            <label >
                Maximum price:
            </label>
            <input 
                name="maxPrice"
                type="number"
                value={filter.maxPrice}
                onChange={HandleInputChange} />
            <input type="submit" value="Apply Filter"/>
        </form>
    )
}