import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export function useCurrentUser() {
  const [user, setUser] = useState(null);   // { uid, name, email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        const profile = snap.exists() ? snap.data() : {};

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: profile.name || firebaseUser.displayName || "Pengguna",
          role: profile.role || "guru", // default guru kalau field role belum ada
        });
      } catch (err) {
        console.error("Gagal ambil profil user:", err);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || "Pengguna",
          role: "guru",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  return { user, loading, isAdmin: user?.role === "admin" };
}