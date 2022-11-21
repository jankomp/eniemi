import { useState,  useEffect } from "react";
import { db } from '../firebase.js';
import { collection , query, onSnapshot, orderBy } from 'firebase/firestore';
import Select from "react-dropdown-select";

export default function CategoryDropDown({valueSelected}) {
    const categoriesRef = collection(db,"categories");
    let q=query(categoriesRef,orderBy("value","asc"));

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
            className="category"
            options={categories}
            required={true}
            placeholder="Category"
            dropdownPosition="bottom"
            onChange={valueSelected}
            sx={{ color: 'primary.main' }}
        >
        </Select>
    );
}