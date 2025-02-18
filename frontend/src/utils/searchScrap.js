// Import Firebase dependencies
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";


// Firebase search function
export const searchScrap = async (term) => {
  try {
    const db = getFirestore();
    const scrapRef = collection(db, "scraps");
    let searchResults = [];

    // Create an array of queries for different fields
    const queries = [
      // Search by title
      query(
        scrapRef,
        where("title", ">=", term),
        where("title", "<=", term + "\uf8ff"),
        orderBy("title")
      ),
      // Search by description
      query(
        scrapRef,
        where("description", ">=", term),
        where("description", "<=", term + "\uf8ff"),
        orderBy("description")
      ),
      // Search in attributes array
      query(scrapRef, where("attributes", "array-contains-any", [term])),
    ];

    // Execute all queries in parallel
    const querySnapshots = await Promise.all(queries.map((q) => getDocs(q)));

    // Combine results and remove duplicates
    const uniqueResults = new Map();

    querySnapshots.forEach((snapshot) => {
      snapshot.forEach((doc) => {
        if (!uniqueResults.has(doc.id)) {
          uniqueResults.set(doc.id, {
            id: doc.id,
            ...doc.data(),
          });
        }
      });
    });

    searchResults = Array.from(uniqueResults.values());
    return searchResults;
  } catch (err) {
    console.error("Search error:", err);
    // setError("Failed to search items. Please try again.");
  } finally {
    // setIsLoading(false);
  }
};
