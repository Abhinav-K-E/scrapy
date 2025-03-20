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

    // Fetch all scraps and filter results locally for maximum flexibility
    const querySnapshot = await getDocs(scrapRef);

    const normalizedTerm = term.toLowerCase();

    // Helper function to check if the term exists in any field or nested object
    const matchesSearch = (obj) => {
      const checkValue = (value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(normalizedTerm);
        } else if (Array.isArray(value)) {
          return value.some((item) => checkValue(item));
        } else if (typeof value === "object" && value !== null) {
          return Object.values(value).some((nestedValue) => checkValue(nestedValue));
        }
        return false;
      };
      return Object.values(obj).some((value) => checkValue(value));
    };

    // Filter the results based on the search term
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (matchesSearch(data)) {
        searchResults.push({ id: doc.id, ...data });
      }
    });

    return searchResults;
  } catch (err) {
    console.error("Search error:", err);
    return [];
  }
};

