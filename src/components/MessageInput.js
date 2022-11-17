import React from 'react';
import { addDoc, doc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getAuth } from "firebase/auth"

export default function MessageInput({ chatId }) {
    const auth = getAuth();
    const user = auth.currentUser;
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (chatId){
            try {
                addDoc(collection(db,"chats", chatId, 'messages'), {
                    uid: user.uid,
                    displayName: user.displayName,
                    text: value.trim(),
                    timestamp: serverTimestamp(),
                }).then(() => {
                    const chatRef = doc(db, 'chats', chatId);
                    setDoc(chatRef, {
                        lastMessageTime: serverTimestamp(),
                        lastMessageText: value.trim()
                    }, { merge: true } ).then(() => {
                        setValue('');
                    });
                });

            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Enter a message"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
                Send
            </button>
        </form>
    );
}

export { MessageInput };