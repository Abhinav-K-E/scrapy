import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

import "./UsersList.scss";

const UsersList = () => {
  const { uid, selectedUser, setSelectedUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "users"));
      setUsers(usersCollection.docs.map((doc) => doc.data()));
      setUserId(localStorage.getItem("uid") || "null");
    };
    fetchUsers();
  }, []);
  console.log(users);

  return (
    <div className="users-list-com">
      <h2>Chat</h2>
      {users
        .filter((user) => user.uid !== userId) // Exclude self
        .map((user) => (
          <div
            key={user.uid}
            className="user"
            onClick={() => setSelectedUser(user.uid)}
          >
            <img src={`${user?.photoURL}`} alt="User" />
            <p>{user?.name}</p>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
