import {
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../firebase";

export const addActivity = async (uid, activity) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef,{
    aktivitas: arrayUnion({
        text: activity,
        createdAt: Date.now(),
    }),
});

  } catch (err) {
    console.error("Gagal menambah aktivitas:", err);
  }
};