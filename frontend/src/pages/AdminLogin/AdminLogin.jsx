// AdminLoginPage.jsx
import React, { useEffect, useState } from "react";
import "./AdminLogin.scss";
import logo from "../../assets/images/logo.svg"; // Make sure to add your logo file
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const AdminLoginPage = ({ onLogin }) => {
  const { isAdmin, setIsAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      const adminsCollection = await getDocs(collection(db, "admins"));
      setAdmin(adminsCollection.docs.map((doc) => doc.data()));
      //   console.log(admin[0]);
    };
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (email == admin[0].email && password == admin[0].pass) {
      navigate("/admin/users");
      setIsAdmin(true);
      localStorage.setItem("isAdmin", true);
    } else {
      setError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="admin-page">
      {/* Top Navigation Bar */}
      <nav className="admin-navbar">
        <div className="logo-container">
          <img src={logo} alt="Company Logo" className="logo-image" />
        </div>
      </nav>

      {/* Main Container */}
      <div className="admin-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome, Admin</h1>
            <p>Please log in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
