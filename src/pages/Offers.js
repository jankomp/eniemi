import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot, where} from 'firebase/firestore';
import {React, useState, useEffect} from "react";

import OfferListItem from '../components/OfferListItem'
import OfferListFilter from "../components/OfferListFilter.js";

const offersRef = collection(db,"offers");
let q=query(offersRef,orderBy("timestamp","desc"));

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    onSnapshot(q,(snapshot)=>{
      setOffers(snapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
      })))
    })
  }, []);

  const returnFilter = (event, filter) => {
    event.preventDefault();
    //console.log(filter);
    
    setOffers([]);
    q=query(offersRef,where("price", "<=", Number(filter.maxPrice)),orderBy("price", "asc"),where("category","==",filter.category));
    onSnapshot(q,(snapshot)=>{
      setOffers(snapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
      })))
    })
  };

  return (
    <>
    <h1>Offers</h1>
    <OfferListFilter returnFilter={returnFilter}></OfferListFilter>
    <div>
      {offers.map(item=>
        MapItem(item))}
    </div>
    </>
  )

  function MapItem(item)
  {
    return <Link to={'/DetailedOffer/' + item.id} key={item.id} className="noLink"><OfferListItem  key={item.id} arr={item} /></Link>
  }
}



