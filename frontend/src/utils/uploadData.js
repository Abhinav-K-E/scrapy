import { storage , db } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const uploadToFirebase = async (imageFile, imageData) => {
  if (!imageFile || !imageData) {
    console.error("No image or data to upload.");
    return;
  }

  try {
    // 1. Upload Image to Firebase Storage
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);

    // 2. Save Metadata to Firestore
    const docRef = await addDoc(collection(db, "uploadedImages"), {
      title: imageData?.title,
      description: imageData?.desc,
      qualityScore: imageData?.quality_score,
      recyclabilityScore: imageData?.recyclability_score,
      estimatedValue: imageData?.price,
      attributes: imageData?.attributes,
      imageUrl: downloadURL,
      timestamp: new Date(),
    });

    console.log("Document written with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error uploading to Firebase:", error);
    return false;
  }
};
