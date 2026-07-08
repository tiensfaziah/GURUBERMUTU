import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  increment,
} from "firebase/firestore";

import { db } from "../firebase";

const resourcesRef = collection(db, "resources");

export function subscribeResources(callback) {
  const q = query(resourcesRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      callback(data);
    },
    (error) => {
      console.error("Subscribe Error:", error);
    }
  );
}

export async function addResource(data, user) {
  try {
    const docRef = await addDoc(resourcesRef, {
      ...data,
      downloads: 0,
      createdBy: user.uid,
      createdByName:
        user.displayName ||
        user.email ||
        "Guru",
      createdAt: serverTimestamp(),
    });

    console.log("Upload berhasil", docRef.id);

    return docRef;
  } catch (err) {
    console.error("ADD RESOURCE ERROR", err);
    throw err;
  }
}

export async function deleteResource(id) {
  return deleteDoc(doc(db, "resources", id));
}

export async function incrementDownload(id) {
  return updateDoc(doc(db, "resources", id), {
    downloads: increment(1),
  });
}