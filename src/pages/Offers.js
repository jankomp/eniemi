import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot, where, startAfter, limit, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";

import OfferListItem from '../components/OfferListItem'
import OfferListFilter from "../components/OfferListFilter.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { ContentCutOutlined } from "@mui/icons-material";

const offersRef = collection(db,"offers");
const itemsPerPage = 8;
let localFilter;
let q=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
let offerSnapshot;

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    q=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
    getOffers();
  }, []);

  const returnFilter = (event, filter) => {
    event.preventDefault();
    console.log(filter);
    localFilter = filter;
    
    setOffers([]);
    console.log(filter.maxPrice && filter.category);
    if (!filter.maxPrice && !filter.category) {
      q=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
    } else {
      q=query(offersRef, where("price", "<=", Number(filter.maxPrice)),orderBy("price", "asc"), where("category","==",filter.category), limit(itemsPerPage));
      
      if (filter.maxPrice) {
        q=query(offersRef, where("price", "<=", Number(filter.maxPrice)),orderBy("price", "asc"), limit(itemsPerPage));
      }
      if (filter.category) {
        q=query(offersRef, where("category","==",filter.category), limit(itemsPerPage));
      }
    }

    getOffers();
  };

  async function getOffers() {
    offerSnapshot = await getDocs(q);
    setOffers(offers.concat(offerSnapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
    }))));
  }


  const GetMoreOffers = async () => {
    //e.preventDefault();
    const lastOffer = offerSnapshot.docs[offerSnapshot.docs.length - 1];

    if (!localFilter || (!localFilter.maxPrice && !localFilter.category)) {
        q=query(offersRef,orderBy("timestamp","desc"), startAfter(lastOffer), limit(itemsPerPage));
    } else {
      q=query(offersRef, where("price", "<=", Number(localFilter.maxPrice)),orderBy("price", "asc"), where("category","==",localFilter.category), startAfter(lastOffer), limit(itemsPerPage));
      
      if (localFilter.maxPrice) {
        q=query(offersRef, where("price", "<=", Number(localFilter.maxPrice)),orderBy("price", "asc"), startAfter(lastOffer), limit(itemsPerPage));
      }
      if (localFilter.category) {
        q=query(offersRef, where("category","==",localFilter.category), startAfter(lastOffer), limit(itemsPerPage));
      }
    }
    
    console.log(q);

    getOffers();
  }

  return (
    <>
    {/* <h1>Offers</h1> */}
    <OfferListFilter returnFilter={returnFilter}></OfferListFilter>
    <div className="listBox">
      {offers.map(item=>
        MapItem(item))}
        </div>
      </InfiniteScroll>
    </div>
    </>
  )

  function MapItem(item)
  {
    return<Link to={'/DetailedOffer/' + item.id} key={item.id} className="noLink"><OfferListItem  key={item.id} arr={item} /></Link>
  }
}



