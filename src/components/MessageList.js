import React, { useEffect, useRef, useState } from 'react';
import { getAuth } from "firebase/auth"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot} from 'firebase/firestore';
import { Container } from '@mui/system';



export default function MessageList({ chatId }) {
    const containerRef = React.useRef(null);
    const auth = getAuth();
    const user = auth.currentUser;
    
    const bottomRef = useRef(null);

    const [messages, setMessages] = useState();

    useEffect(() => {
        if (chatId)
        {
            const chatRef = collection(db,"chats", chatId, 'messages');
            let q=query(chatRef,orderBy("timestamp","asc"));
            onSnapshot(q,(snapshot)=>{
                setMessages(snapshot.docs.map(doc=>({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }
    }, []);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    if (messages) {
        return (
            <div className="message-list-container" ref={containerRef}>
                <ul className="message-list">
                    {messages.map((x) => (
                        <Message
                            key={x.id}
                            message={x.data}
                            isOwnMessage={x.data.uid === user.uid}
                        />
                    ))}
                    <div ref={bottomRef} />
                </ul>
            </div>
        );  
    }
}

function Message({ message, isOwnMessage }) {
    const { displayName, text } = message;
    return (
  
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
            <h4 className="sender">{isOwnMessage ? 'You' : displayName}</h4>
            <div className="text">{text}</div>
        </li>

    );
}

export { MessageList };