// Airtable – reviews CRUD
// The API key is readable in the client bundle (unavoidable without a backend).
// Worst-case: someone spams reviews → you delete them from Airtable. Acceptable for a portfolio.

const BASE =
  `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Reviews`;
const KEY = import.meta.env.VITE_AIRTABLE_API_KEY ?? "";

const headers = () => ({
  Authorization: `Bearer ${KEY}`,
  "Content-Type": "application/json",
});

export interface DynReview {
  id:      string;
  name:    string;
  role:    string;
  comment: string;
  rating:  number;
  date:    string;
}

/** Fetch all reviews where Visible = true */
export async function fetchPublishedReviews(): Promise<DynReview[]> {
  if (!KEY || !import.meta.env.VITE_AIRTABLE_BASE_ID) return [];
  try {
    const params = new URLSearchParams({
      filterByFormula:      "({Visible}=TRUE())",
      "sort[0][field]":     "Date",
      "sort[0][direction]": "desc",
    });
    const res = await fetch(`${BASE}?${params}`, { headers: headers() });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.records ?? []).map((r: any): DynReview => ({
      id:      r.id,
      name:    r.fields.Name    ?? "",
      role:    r.fields.Role    ?? "",
      comment: r.fields.Comment ?? "",
      rating:  r.fields.Rating  ?? 5,
      date:    r.fields.Date    ?? "",
    }));
  } catch {
    return [];
  }
}

/** Create a new review (auto-published: Visible = true) */
export async function submitReview(data: {
  name: string;
  role: string;
  comment: string;
  rating: number;
}): Promise<void> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      fields: {
        Name:    data.name,
        Role:    data.role,
        Comment: data.comment,
        Rating:  data.rating,
        Visible: true,
        Date:    new Date().toISOString().slice(0, 10),
      },
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Airtable error ${res.status}: ${text}`);
  }
}
