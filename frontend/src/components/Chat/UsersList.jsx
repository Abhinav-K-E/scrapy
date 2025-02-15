import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const UsersList = ({ setSelectedUser }) => {
  const { uid } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "users"));
      setUsers(usersCollection.docs.map((doc) => doc.data()));
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-list">
      <h2>Select a User</h2>
      {users
        .filter((user) => user.uid !== uid) // Exclude self
        .map((user) => (
          <div
            key={user.uid}
            className="user"
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.photoURL} alt="User" />
            <p>{user.name}</p>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
