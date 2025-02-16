import React, { useState, useEffect } from "react";
import { db,auth } from "../../../firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

import './ChatRoom.scss'

const Chat = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = auth.currentUser;
  if (!selectedUser) return <p>Please select a user to chat.</p>;

  // Create unique chat ID based on two user UIDs (sorted for consistency)
  const chatId = [currentUser.uid, selectedUser.uid].sort().join("_");

  useEffect(() => {
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: newMessage,
      senderId: currentUser.uid,
      receiverId: selectedUser.uid,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  return (
    <div className="chat-container">
      {/* <h2>Chat with {selectedUser.name}</h2> */}
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.senderId === currentUser.uid ? "sent" : "received"}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
