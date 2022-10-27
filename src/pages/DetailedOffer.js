

import { db } from '../firebase.js';
import { doc, getFirestore, getDoc} from 'firebase/firestore';
import { React, useEffect, useState } from 'react';
import { useParams, Router } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    let images;
    if (offer.images) {
      images = Array.from(offer.images);
    }
    return (<>
      <Carousel>
        {images?.map(imageUrl => ImageDivForCarousel(imageUrl))}
      </Carousel>
      <h1>{offer.name}</h1>
      <p>{offer.desc}</p>
      <h1>{offer.price}</h1>
      </>
      )
  }

}

function ImageDivForCarousel(imageUrl) {
  return (
    <div>
      <img src={imageUrl} alt="Image" className="center"/>
    </div>
  )
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


