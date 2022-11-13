import { getAuth } from "firebase/auth"
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import { db } from '../firebase.js';
import { addDoc, setDoc, doc } from "firebase/firestore";

import { MessageList } from "../components/MessageList.js";
import { MessageInput } from "../components/MessageInput.js"


export default function Chat() {
    const auth = getAuth();
    const user = auth.currentUser;
    const user1Id = user.uid;
    
    const params = useParams();
    const user2Id = params.otherUserId;

    const {state} = useLocation();
    
    const users = [user1Id, user2Id];
    users.sort();
    const chatId = users[0] + users[1];

    useEffect(() => {
        if (chatId)
        {
            const chatRef = doc(db, 'chats', chatId);

            if (state) {                
                const { id, displayName } = state;
                setDoc(chatRef, {
                    user1Id: users[0],
                    user2Id: id,
                    user1DisplayName: user.displayName,
                    user2DisplayName: displayName
                }, { merge: true } );
            } else 
            {
                setDoc(chatRef, {
                    user1Id: users[0],
                    user2Id: users[1],
                    user1DisplayName: user.displayName
                }, { merge: true } );
            }
        }
      }, []);

    return (
        <>
            <div className="messages-container">
                <h1>Chat</h1>
                <MessageList chatId={chatId}/>
                <MessageInput chatId={chatId}/>
            </div>
        </>
    );
}


export { Chat };