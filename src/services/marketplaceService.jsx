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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, storage } from "../firebase";

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

// Upload file (PDF/PPT/DOC/JPG/PNG) ke Firebase Storage.
// onProgress(percent) dipanggil berkala selama upload berjalan.
// Resolusinya berupa { url, path } — path disimpan biar bisa dihapus nanti.
export function uploadResourceFile(file, uid, onProgress) {
  return new Promise((resolve, reject) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `resources/${uid}/${Date.now()}_${safeName}`;
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      "state_changed",
      (snapshot) => {
        const pct = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        if (onProgress) onProgress(pct);
      },
      (error) => {
        console.error("UPLOAD FILE ERROR", error);
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
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

// storagePath opsional: kalau materi diunggah lewat file (bukan link),
// file di Storage ikut dihapus juga.
export async function deleteResource(id, storagePath) {
  if (storagePath) {
    try {
      await deleteObject(ref(storage, storagePath));
    } catch (err) {
      console.warn("Gagal menghapus file di storage (mungkin sudah terhapus):", err);
    }
  }
  return deleteDoc(doc(db, "resources", id));
}

export async function incrementDownload(id) {
  return updateDoc(doc(db, "resources", id), {
    downloads: increment(1),
  });
}