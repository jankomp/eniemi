

import { db } from '../firebase.js';
import { doc, getFirestore, getDoc} from 'firebase/firestore';
import { React, useEffect, useState } from 'react';
import { useParams, Router } from 'react-router-dom';

import defaultImg from '../res/default.jpg';

export default function DetailedOffer() { 
  const [offer, setOffer] = useState([]);
  
  const { id } = useParams(); 

  useEffect( () => {
      (async () => {
        if (id) {
          const newOffer = await read(id);
          setOffer(newOffer);
        }
      })();  
   }, []);
  
  if (typeof offer === "undefined") {
    return (<h1>offer not found!</h1>)
  } else {
    return (<>
      <img src={offer.img} alt={defaultImg} className="center"/>
      <h1>{offer.name}</h1>
      <p>{offer.desc}</p>
      <h1>{offer.price}</h1>
      </>
      )
  }

}

async function read(id) {
  const db = getFirestore()
  const docRef = doc(db, 'offers', id);
  try {
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? docSnap.data() : null;

    if (data === null || data === undefined) return null;
    return {id, ...data};
  } catch(error) {
      console.log(error)
  }
}


