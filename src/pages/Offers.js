import { Link} from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot} from 'firebase/firestore';
import {React, useState, useEffect} from "react";

import OfferListItem from '../components/OfferListItem'

const q=query(collection(db,'offers'),orderBy('timestamp','desc'));

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    onSnapshot(q,(snapshot)=>{
      setOffers(snapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
      })))
    })
  });

  return (
    <>
    <h1>Offers</h1>
    <div>
    {offers.map(item=>
      MapItem(item))}
      </div>
    </>
  )

  function MapItem(item)
  {
    return <Link to={'/DetailedOffer/' + item.id} key={item.id} ><OfferListItem  key={item.id} arr={item} /></Link>
  }
}



