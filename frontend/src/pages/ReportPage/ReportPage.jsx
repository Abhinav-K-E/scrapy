import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./ReportPage.scss";
import { db } from "../../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

const ReportIssueForm = () => {
  const { uid } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const issueData = {
        userId: uid,
        title: title,
        description: description,
        // severity: severity,
        // status: "open",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, "issues"), issueData);

      // Reset form and show success
      setTitle("");
      setDescription("");
      setSeverity("medium");
      setIsSubmitted(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Failed to submit issue. Please try again later.");
      console.error("Error adding document: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-page">
      <div className="report-issue-container">
        <h2>Feedback</h2>

        {isSubmitted && (
          <div className="success-message">
            Issue reported successfully! Thank you for your feedback.
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="report-issue-form">
          <div className="form-group">
            <label htmlFor="issue-title">Title *</label>
            <input
              id="issue-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief description of the issue"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="issue-description">Description *</label>
            <textarea
              id="issue-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
              rows={5}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="issue-severity">Severity</label>
            <select
              id="issue-severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="low">
                Low - Minor issue, not affecting functionality
              </option>
              <option value="medium">
                Medium - Partial functionality affected
              </option>
              <option value="high">High - Major functionality affected</option>
              <option value="critical">
                Critical - Complete failure or data loss
              </option>
            </select>
          </div> */}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Issue Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueForm;
