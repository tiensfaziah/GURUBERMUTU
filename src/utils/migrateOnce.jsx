import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import staticWorkshops from "../data/dataworkshop";

export async function migrateStaticWorkshops(adminUser) {
  if (!adminUser) {
    alert("Kamu harus login sebagai admin untuk migrasi data.");
    return;
  }

  const workshopsRef = collection(db, "workshops");

  const existing = await getDocs(workshopsRef);
  if (existing.size > 0) {
    const confirmAnyway = window.confirm(
      `Firestore sudah punya ${existing.size} workshop. Tetap lanjutkan migrasi data lama? (Bisa jadi duplikat kalau sudah pernah migrasi sebelumnya)`
    );
    if (!confirmAnyway) return;
  }

  try {
    for (const item of staticWorkshops) {
      await addDoc(workshopsRef, {
        title: item.title || "",
        category: item.category || "",
        speaker: item.organizer || "",
        date: item.date || "",
        time: item.time || "",
        mode: item.mode || "Online",
        location: item.location || "",
        thumbnail: item.image || "",
        description: item.description || "",
        registrationLink: item.registrationLink || "",
        quota: item.quota || null,
        registered: item.registered || 0,
        createdBy: adminUser.uid,
        createdByName: adminUser.name || "Admin",
        createdByRole: "admin",
        createdAt: serverTimestamp(),
      });
    }
    alert(`Berhasil memindahkan ${staticWorkshops.length} workshop ke Firestore.`);
  } catch (err) {
    console.error(err);
    alert("Gagal migrasi. Cek console untuk detail error.");
  }
}