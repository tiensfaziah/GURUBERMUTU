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
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

export async function addResource(data, user) {
  return addDoc(resourcesRef, {
    ...data,
    downloads: 0,
    createdBy: user.uid,
    createdByName: user.name,
    createdAt: serverTimestamp(),
  });
}

export async function deleteResource(id) {
  return deleteDoc(doc(db, "resources", id));
}

export async function incrementDownload(id) {
  return updateDoc(doc(db, "resources", id), {
    downloads: increment(1),
  });
}