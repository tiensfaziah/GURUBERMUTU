
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Simpan hasil kuesioner persona ke Firestore.
 * @param {string} uid - UID user yang login
 * @param {object} payload - { answers, scores, percentages, dominantKey, secondaryKey }
 */
export async function savePersonaResult(uid, payload) {
  if (!uid) throw new Error("User belum login.");

  const ref = doc(db, "users", uid);
  await setDoc(
    ref,
    {
      persona: {
        answers: payload.answers,
        scores: payload.scores,
        percentages: payload.percentages,
        dominantKey: payload.dominantKey,
        secondaryKey: payload.secondaryKey,
        completedAt: serverTimestamp(),
      },
    },
    { merge: true }
  );
}

/**
 * Ambil hasil kuesioner persona milik user (kalau ada).
 * Return null kalau user belum pernah mengisi kuesioner.
 */
export async function getPersonaResult(uid) {
  if (!uid) return null;
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return data.persona || null;
}