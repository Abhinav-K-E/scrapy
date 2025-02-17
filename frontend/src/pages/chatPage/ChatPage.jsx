import { useState } from "react";
import UsersList from "../../components/Chat/UsersList";
import Chat from "../../components/Chat/ChatRoom";
import "./ChatPage.scss";
import { useAuth } from "../../context/AuthContext";

const ChatPage = () => {
  const { selectedUser, setSelectedUser } = useAuth();
  return (
    <div className="chat-page">
      <UsersList setSelectedUser={setSelectedUser} />
      {selectedUser && <Chat selectedUser={selectedUser} />}
    </div>
  );
};

export default ChatPage;
