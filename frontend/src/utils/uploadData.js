import { storage, db, auth } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export const uploadToFirebase = async (uid, imageFile, uploadDetail) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("User not authenticated!");
    return;
  }

  try {
    // 1. Upload Image to Firebase Storage
    const storageRef = ref(storage, `images/${uid}/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // 2. Save Metadata to Firestore (with UID)
    const docRef = await addDoc(collection(db, "scraps"), {
      userId: uid, // Store UID
      title: uploadDetail.title,
      description: uploadDetail.desc,
      qualityScore: uploadDetail.quality_score,
      recyclabilityScore: uploadDetail.recyclability_score,
      estimatedValue: uploadDetail.price,
      attributes: uploadDetail.attributes,
      imageUrl: downloadURL,
      marketplace: false, // List in marketplace
      scrapDbImport: true, // Not imported
      timestamp: new Date(),
    });

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    return false;
  }
};
