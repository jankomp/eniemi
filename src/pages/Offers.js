import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot, where, startAfter, limit, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";

import OfferListItem from '../components/OfferListItem'
import OfferListFilter from "../components/OfferListFilter.js";
import InfiniteScroll from "react-infinite-scroll-component";

const offersRef = collection(db,"offers");
const itemsPerPage = 8;
let localFilter = { category: '', maxPrice: 0 };
let q=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
let offerSnapshot;

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    q=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
    getOffers();
  }, []);

  const returnFilter = async(event, filter) => {
    event.preventDefault();
    
    localFilter = filter;
    
    q = ReturnQuery(filter);


    //TODO: setOffers([]); <- why is array not cleared from this?
    await clearOffers();

    await getOffers();
  };

  function clearOffers() {
    const offersLength = offers.length;
    for (let i = 0; i < offersLength; i++) {
      offers.pop();
    }
    setOffers(offers);
  }

  async function getOffers() {
    offerSnapshot = await getDocs(q);
    setOffers(offers.concat(offerSnapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data()
    }))));
  }

  const GetMoreOffers = async () => {
    const lastOffer = offerSnapshot.docs[offerSnapshot.docs.length - 1];

    if (lastOffer){
      ReturnQuery(localFilter, lastOffer);
      
      getOffers();
    }
  }

  function ReturnQuery(filter, lastOffer) {
    let localQuery;
    if (lastOffer) {
      if (!localFilter || (!localFilter.maxPrice && !localFilter.category)) {
        q=query(offersRef,orderBy("timestamp","desc"), startAfter(lastOffer), limit(itemsPerPage));
      }
      if (localFilter.maxPrice && localFilter.category) {
        q=query(offersRef, where("price", "<=", Number(localFilter.maxPrice)),orderBy("price", "asc"), where("category","==",localFilter.category), startAfter(lastOffer), limit(itemsPerPage));
      }
      if (localFilter.maxPrice && !localFilter.category) {
        q=query(offersRef, where("price", "<=", Number(localFilter.maxPrice)),orderBy("price", "asc"), startAfter(lastOffer), limit(itemsPerPage));
      }
      if (localFilter.category && !localFilter.maxPrice) {
        q=query(offersRef, where("category","==",localFilter.category), startAfter(lastOffer), limit(itemsPerPage));
      }
    } else {
      if (!filter.maxPrice && !filter.category) {
        localQuery=query(offersRef,orderBy("timestamp","desc"), limit(itemsPerPage));
      } 
      if (filter.maxPrice && filter.category) {
        localQuery=query(offersRef, where("price", "<=", Number(filter.maxPrice)),orderBy("price", "asc"), where("category","==",filter.category), limit(itemsPerPage));
      }  
      if (filter.maxPrice && !filter.category) {
        localQuery=query(offersRef, where("price", "<=", Number(filter.maxPrice)),orderBy("price", "asc"), limit(itemsPerPage));
      }
      if (filter.category && !filter.maxPrice) {
        localQuery=query(offersRef, where("category","==",filter.category), limit(itemsPerPage));
      }
    }
    return localQuery;
  }

  return (
    <>
    <OfferListFilter returnFilter={returnFilter}></OfferListFilter>
    <div>
      <InfiniteScroll
        dataLength={offers.length} 
        next={GetMoreOffers}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen all the offers</b>
          </p>
      }>
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
    return <Link to={'/DetailedOffer/' + item.id} key={item.id} className="noLink"><OfferListItem  key={item.id} arr={item} /></Link>
  }
}



