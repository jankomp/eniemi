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
                    user2Id: users[1],
                    user1DisplayName: user.displayName,
                    user2DisplayName: displayName
                }, { merge: true } );
            }
        }
      }, []);

    return (
        <>
            <div className="messages-container">
                <h1 className="heading">Chat</h1>
                <br></br>
                <br></br>
                <MessageList chatId={chatId}/>
                <MessageInput chatId={chatId}/>
            </div>
        </>
    );
}


export { Chat };