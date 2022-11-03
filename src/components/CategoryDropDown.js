import { useState,  useEffect } from "react";
import { db } from '../firebase.js';
import { collection , query, onSnapshot } from 'firebase/firestore';
import Select from "react-dropdown-select";

export default function CategoryDropDown({valueSelected}) {
    const categoriesRef = collection(db,"categories");
    let q=query(categoriesRef);

    let options = [
        {label:"hello", value: 1},
        {label:"world", value: 2}
    ];

    const [categories, setCategories] = useState([]);


    useEffect(() => {
        onSnapshot(q,(snapshot)=>{
            setCategories(Array.from(snapshot.docs.map(doc=>({
                label: doc.id,
                value: doc.data().value
                }))));
        })
    }, []);

    return (
        <Select
            name="category"
            options={categories}
            required={true}
            dropdownPosition="bottom"
            onChange={valueSelected}
        >
        </Select>
    );
}