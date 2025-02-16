import React, { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import "./Feedbacks.scss";

const Feedbacks = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Fetch issues from Firestore
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        let issuesQuery = collection(db, "issues");

        // Apply filter if not 'all'
        if (filter !== "all") {
          issuesQuery = query(issuesQuery, where("status", "==", filter));
        }

        // Apply sorting
        issuesQuery = query(issuesQuery, orderBy(sortBy, sortDirection));

        const querySnapshot = await getDocs(issuesQuery);

        const issuesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamps to Date objects
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }));

        setIssues(issuesList);
        console.log(issuesList)
      } catch (err) {
        console.error("Error fetching issues: ", err);
        setError("Failed to load issues. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [filter, sortBy, sortDirection]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };

  // Get severity badge class
//   const getSeverityClass = (severity) => {
//     switch (severity) {
//       case "low":
//         return "severity-low";
//       case "medium":
//         return "severity-medium";
//       case "high":
//         return "severity-high";
//       case "critical":
//         return "severity-critical";
//       default:
//         return "severity-medium";
//     }
//   };

  // Get status badge class
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "open":
//         return "status-open";
//       case "in-progress":
//         return "status-in-progress";
//       case "resolved":
//         return "status-resolved";
//       case "closed":
//         return "status-closed";
//       default:
//         return "status-open";
//     }
//   };

  return (
    <div className="issues-page-container">
      <h1>Reported Issues</h1>

      {/* Filters and sorting */}
      <div className="controls-container">
        <div className="filter-controls">
          <label htmlFor="status-filter">Filter by status:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Feedback</option>
            {/* <option value="open">Open</option> */}
            {/* <option value="in-progress">In Progress</option> */}
            {/* <option value="resolved">Resolved</option> */}
            {/* <option value="closed">Closed</option> */}
          </select>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="createdAt">Creation Date</option>
            {/* <option value="updatedAt">Last Updated</option> */}
            {/* <option value="severity">Severity</option> */}
            <option value="title">Title</option>
          </select>

          <button
            className="sort-direction-button"
            onClick={toggleSortDirection}
            aria-label={`Sort ${
              sortDirection === "asc" ? "ascending" : "descending"
            }`}
          >
            {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Loading state */}
      {loading ? (
        <div className="loading-message">Loading issues...</div>
      ) : (
        <div className="issues-container">
          {issues.length === 0 ? (
            <p className="no-issues-message">
              No issues found. Adjust filters or add a new issue.
            </p>
          ) : (
            <div className="issues-grid">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className="issue-card"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <div className="issue-header">
                    <h3 className="issue-title">{issue.title}</h3>
                    {/* <span
                      className={`severity-badge ${getSeverityClass(
                        issue.severity
                      )}`}
                    >
                      {issue.severity}
                    </span> */}
                  </div>

                  <p className="issue-description">
                    {issue.description.substring(0, 100)}...
                  </p>

                  <div className="issue-footer">
                    {/* <span
                      className={`status-badge ${getStatusClass(issue.status)}`}
                    >
                      {issue.status}
                    </span> */}
                    <span className="issue-date">
                      Created: {formatDate(issue.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="modal-overlay" onClick={() => setSelectedIssue(null)}>
          <div
            className="issue-detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-modal-button"
              onClick={() => setSelectedIssue(null)}
            >
              ×
            </button>

            <div className="issue-detail-header">
              <h2>{selectedIssue.title}</h2>
              {/* <span
                className={`severity-badge ${getSeverityClass(
                  selectedIssue.severity
                )}`}
              >
                {selectedIssue.severity}
              </span> */}
            </div>

            <div className="issue-detail-metadata">
              {/* <div className="metadata-item">
                <strong>Status:</strong>
                <span
                  className={`status-badge ${getStatusClass(
                    selectedIssue.status
                  )}`}
                >
                  {selectedIssue.status}
                </span>
              </div> */}
              <div className="metadata-item">
                <strong>Created:</strong> {formatDate(selectedIssue.createdAt)}
              </div>
              <div className="metadata-item">
                <strong>Last Updated:</strong>{" "}
                {formatDate(selectedIssue.updatedAt)}
              </div>
            </div>

            <div className="issue-detail-description">
              <h3>Description</h3>
              <p>{selectedIssue.description}</p>
            </div>

            <div className="issue-detail-id">
              <strong>Issue ID:</strong> {selectedIssue.userId}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
