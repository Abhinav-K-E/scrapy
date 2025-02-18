import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import "./UsersPage.scss";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      console.log(userList)
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Delete user from Firestore
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers(users.filter((user) => user.id !== userId)); // Remove from UI
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="user-page">
      <h2 className="head">Users List</h2>
      <div className="users-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user.id}>
              <div className="user-info">
                <div className="user-image-container">
                  <img
                    src={user?.photoURL}
                    // alt={`${user.name}'s profile`}
                    className="user-image"
                  />
                </div>
                <div className="user-details">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-subtitle">User Profile</p>
                </div>
              </div>

              <button
                onClick={() => deleteUser(user.id)}
                className="delete-button"
                aria-label={`Delete ${user.name}`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;

{
  /* <ul>
{users.map((user) => (
  <li key={user.id}>
    <strong>{user.name || "No Name"}</strong> (
    {user.email || "No Email"})
    <button onClick={() => deleteUser(user.id)}>❌ Delete</button>
  </li>
))}
</ul> */
}
