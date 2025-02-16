import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export const fetchAllData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Fetched Data:", data);
    return data; // Returns an array of objects
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
