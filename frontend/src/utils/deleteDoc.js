import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log(`Document with ID: ${docId} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
};

export default deleteDocument;
