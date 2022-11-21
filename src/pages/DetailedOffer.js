
import { db } from '../firebase.js';
import { doc, getDoc, deleteDoc} from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { React, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';

import "./styles_css/detailed_offer.css"

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
      <div className="detailedOffer">
        <Carousel>
          {images?.map(imageUrl => ImageDivForCarousel(imageUrl))}
        </Carousel>
        <h1 className="itemName">{offer.name}</h1>
        
        <div className="offerBox">
        <div className="offer-price">
          <h1 className="">{offer.price} €</h1>	
        </div>
        </div>
        <div className="Description">Description</div>
        <div><p className="itemInfoLine">{offer.desc}</p>
        <br/>	
        <br/>	
        <p className="itemInfoLine">Seller: {offer.creator}</p></div>
      
        <br/>
        <DeleteBtn/>
        <ContactBtn/>
        <br/>
      </div>
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
        return (<DeleteIcon fontSize="large" onClick={deleteEvent}/>)
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
        return (<MessageIcon fontSize="large" style={{ color: '#3477eb'}} onClick={contactEvent}/>)
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


