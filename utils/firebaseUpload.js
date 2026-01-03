import { bucket } from "../firebase.js";

export const uploadToFirebase = async (fileBuffer, fileName, mimeType) => {
  try {
    const file = bucket.file(fileName);
    await file.save(fileBuffer, {
      contentType: mimeType,
      public: true, // file will be public
      metadata: {
        firebaseStorageDownloadTokens: Date.now(), // unique token
      },
    });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return publicUrl;
  } catch (err) {
    console.error("Firebase upload error:", err);
    return null;
  }
};
