import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { getAuth } from "firebase/auth";
import { collection , query, orderBy , onSnapshot, where, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";
import { async } from "@firebase/util";

import "./styles_css/chats.css"

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

            //get the chats where user1 is the same as the current users id
            const allChats = Array.from(chats1Result.docs.flatMap( doc => ({
                id: doc.id,
                data: doc.data()
                })
            ));
            
            //add the chats where user2 is the same as the current users id
            chats2Result.docs.flatMap(doc=>(allChats.push({
                id: doc.id,
                data: doc.data()
                }))
            );
            
            //order all chats by the time of its last message
            allChats.sort((a, b) => {
                if (a.data.lastMessageTime < b.data.lastMessageTime) {
                    return 1;
                }
                if (a.data.lastMessageTime > b.data.lastMessageTime) {
                    return -1;
                }
                return 0;
            });

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
            if (chat.user1DisplayName === user.displayName) {
                return chat.user2DisplayName;
            } else {
                return chat.user1DisplayName;
            }
        }
    }

    return (
        <>
        <h1 className="chatsPageTitle">Chats</h1>
        <div>
          {chats.map(chatItem=>
            MapChatItem(chatItem))}
        </div>
        </>
      )
    
      function MapChatItem(chatItem)
      {
        return <Link to={'/chat/' + NotMyId(chatItem.data)} key={chatItem.id} className="noLink">
            <div className="chatItem">
            <li className="chatTitle">{NotMyName(chatItem.data)}</li>
            <p className="messageContent">{chatItem.data.lastMessageText}</p>
            </div>
            </Link>
      }

}

export { Chats }
