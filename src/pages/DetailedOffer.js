

import { db } from '../firebase.js';
import { doc, getDoc, deleteDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
 
export default function DetailedOffer() { 
  const [offer, setOffer] = useState([]);
  
  const { id } = useParams(); 

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

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
      <h1 className="itemName">{offer.name}</h1>
      <p className="itemInfoLine">{offer.desc}</p>
      <h1 className="itemInfoLine">{offer.price} €</h1>
      <p className="itemInfoLine">Seller: {offer.creator}</p>
      <DeleteBtn></DeleteBtn>
      <ContactBtn></ContactBtn>
      </>
      )
  }

  function DeleteBtn() {
    const deleteEvent = (e) => {
      e.preventDefault();

      if (window.confirm("Do you really want to delete this offer?")) {
        deleteDoc(doc(db,'offers',id));
        navigate('/');
        alert("Item " + offer.name +  " deleted");
      }
    }

    if(user) {
      if (user.uid === offer.creatorId) {
        return (<button onClick={deleteEvent}>Delete</button>)
      }
    }
  }

  function ContactBtn() {
    const contactEvent = (e) => {
      e.preventDefault();

      navigate('/chat/' + offer.creatorId, { state: { id: offer.creatorId, displayName: offer.creator } });
    }

    
    if(user) {
      if (user.uid !== offer.creatorId) {
        return (<button onClick={contactEvent}>Contact</button>)
      }
    }
  }
}


function ImageDivForCarousel(imageUrl) {
  return (
    <div>
      <img key={imageUrl} src={imageUrl} alt="item" className="center"/>
    </div>
  )
}

async function read(id) {
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


