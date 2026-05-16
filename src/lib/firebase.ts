import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

// ── Init (safe to call multiple times) ────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Review {
  id:      string; // = deleteToken (used as doc ID)
  name:    string;
  role:    string;
  comment: string;
  rating:  number;
  date:    string;
}

// ── Fetch all published reviews ───────────────────────────────────────────────
export async function fetchPublishedReviews(): Promise<Review[]> {
  if (!import.meta.env.VITE_FIREBASE_PROJECT_ID) return [];
  try {
    // Single-field query (no composite index needed) — sorted client-side
    const q = query(
      collection(db, "reviews"),
      where("visible", "==", true),
    );
    const snap = await getDocs(q);
    return snap.docs
      .map(d => ({
        id:        d.id,
        name:      d.data().name    ?? "",
        role:      d.data().role    ?? "",
        comment:   d.data().comment ?? "",
        rating:    d.data().rating  ?? 5,
        date:      d.data().date    ?? "",
        createdAt: d.data().createdAt?.toMillis?.() ?? 0,
      }))
      .sort((a, b) => b.createdAt - a.createdAt); // newest first
  } catch {
    return [];
  }
}

// ── Submit a new review ───────────────────────────────────────────────────────
// Returns the deleteToken so the caller can build the delete link for the email.
export async function submitReview(data: {
  name:    string;
  role:    string;
  comment: string;
  rating:  number;
}): Promise<string> {
  // Use the deleteToken as the document ID — no query needed to delete later.
  const deleteToken = crypto.randomUUID();
  await setDoc(doc(db, "reviews", deleteToken), {
    ...data,
    visible:     true,
    deleteToken,
    createdAt:   serverTimestamp(),
    date:        new Date().toISOString().slice(0, 10),
  });
  return deleteToken;
}

// ── Delete a review by its token ──────────────────────────────────────────────
// The token IS the document ID, so no query needed.
export async function deleteReviewByToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    await deleteDoc(doc(db, "reviews", token));
    return true;
  } catch {
    return false;
  }
}
