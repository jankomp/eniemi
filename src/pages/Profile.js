import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot, where, startAfter, limit, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";
import { getAuth } from "firebase/auth"

import OfferListItem from '../components/OfferListItem'

export default function Profile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    if (user){
      getOffers();
    }
  }, []);

  async function getOffers() {      
    const offersRef = collection(db,"offers");
    const q=query(offersRef,where("creatorId", "==", user.uid));
    const offerSnapshot = await getDocs(q);
    setOffers(offers.concat(offerSnapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
    }))));
  }

  return (<>
    <h1>{user.displayName}</h1>
    <p>{user.email}</p>
    <div className="listBox">
        {offers.map(item=>
        MapItem(item))}
    </div>
    </>)

  function MapItem(item)
  {
    return <Link to={'/DetailedOffer/' + item.id} key={item.id} className="noLink"><OfferListItem  key={item.id} arr={item} /></Link>
  }
}
