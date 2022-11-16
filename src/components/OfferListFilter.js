import {React, useState} from "react";
import CategoryDropDown from "./CategoryDropDown";


export default function OfferListFilter({returnFilter}) {
    const [filter, setFilter] = useState(
        {
            category: '',
            maxPrice: 0
        }
    );

    const localClearFilter =(e) => {
        e.preventDefault();
        setFilter({
            category: '',
            maxPrice: 0
        });
        returnFilter(e, filter);
    }

    function CategorySelected(newCategory) {
        setFilter({
            ...filter,
            category: newCategory[0].label
        });
    }

    const HandleInputChange = (e) => {
        e.preventDefault();
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    }

    return (<>
        <form onSubmit={event => returnFilter(event, filter)}>
             <label>
            Category:
            </label>
            <CategoryDropDown valueSelected={CategorySelected}/>
            <br />
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
        <button onClick={localClearFilter}>Clear filter</button>
        </>
    )
}