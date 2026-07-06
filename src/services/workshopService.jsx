import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const workshopsRef = collection(db, "workshops");

// Real-time listener — dipakai di halaman list (Workshop.jsx & KelolaWorkshop.jsx)
export function subscribeWorkshops(callback) {
  const q = query(workshopsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
}

export async function getWorkshopById(id) {
  const snap = await getDoc(doc(db, "workshops", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addWorkshop(data, user) {
  return addDoc(workshopsRef, {
    ...data,
    registered: 0, // default, nanti bertambah saat ada pendaftar
    createdBy: user.uid,
    createdByName: user.name,
    createdByRole: user.role,
    createdAt: serverTimestamp(),
  });
}

export async function updateWorkshop(id, data) {
  return updateDoc(doc(db, "workshops", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteWorkshop(id) {
  return deleteDoc(doc(db, "workshops", id));
}