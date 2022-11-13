import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { getAuth } from "firebase/auth";
import { collection , query, orderBy , onSnapshot, where, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";
import { async } from "@firebase/util";

export default function Chats() {
    const [chats, setChats] = useState([]);

    const auth = getAuth();
    const user = auth.currentUser;

    const chatsRef = collection(db, "chats");
    const q1 = query(chatsRef, where("user1Id", "==", user.uid));
    const q2 = query(chatsRef, where("user2Id", "==", user.uid));

    useEffect(() => {
        const getChats = async() => {
            setChats([]);            
            const chats1Result = await getDocs(q1);
            const chats2Result = await getDocs(q2);

            const allChats = Array.from(chats1Result.docs.flatMap( doc => ({
                id: doc.id,
                data: doc.data()
                })
            ));
            
            chats2Result.docs.flatMap(doc=>(allChats.push({
                id: doc.id,
                data: doc.data()
                }))
            );
            
            //TODO: Order Chats by timestamp
            setChats(allChats);
        }
        
        getChats()
        .catch((err) => {
            console.error("failed to fetch data", err);
          });

    }, []);

    function NotMyId(chat) {
        if (chat){
            if (chat.user1Id === user.uid) {
                return chat.user2Id;
            } else {
                return chat.user1Id;
            }
        }
    }

    function NotMyName(chat) {
        if (chat){
            if (chat.user1Id === user.uid) {
                return chat.user2DisplayName;
            } else {
                return chat.user1DisplayName;
            }
        }
    }

    return (
        <>
        <h1>Chats</h1>
        <div>
          {chats.map(chatItem=>
            MapChatItem(chatItem))}
        </div>
        </>
      )
    
      function MapChatItem(chatItem)
      {
        return <Link to={'/chat/' + NotMyId(chatItem.data)} key={chatItem.id} className="noLink"><li>{NotMyName(chatItem.data)}</li></Link>
      }

}

export { Chats }
