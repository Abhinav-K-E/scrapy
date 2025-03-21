import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

import "./UsersList.scss";

const UsersList = () => {
  const { uid, selectedUser, setSelectedUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
    const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "users"));
      setUsers(usersCollection.docs.map((doc) => doc.data()));
      setUserId(localStorage.getItem("uid") || "null");
    };
    fetchUsers();
  }, []);
  console.log(users);

    // Handle image load error
    const handleImageError = () => {
      setImageError(true);
    };

  // Get user initials for fallback avatar
  const getUserInitials = (user) => {
    if (!user || !user.name) return "U";
    const nameParts = user.name.split(" ");
    if (nameParts.length > 1) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

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
            {!imageError && user.photoURL ? (
              <img
                src={user.photoURL}
                className="profile-pic"
                onError={handleImageError}
                alt={user.name || "User"}
              />
            ) : (
              <div className="profile-pic-fallback">{getUserInitials(user)}</div>
            )}
            <p>{user?.name}</p>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
