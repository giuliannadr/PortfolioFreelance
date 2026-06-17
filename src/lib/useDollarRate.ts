import { useState, useEffect } from "react";

interface DollarRateState {
  /** Venta price of the blue dollar */
  rate: number | null;
  loading: boolean;
  error: boolean;
  lastUpdate: string | null;
}

/**
 * Custom hook that fetches the current Argentine Blue Dollar exchange rate
 * from the DolarApi.com public API.
 *
 * Returns the "venta" (sell) rate which is what clients would pay.
 * Caches the result in sessionStorage for 10 minutes to avoid excessive API calls.
 */
export function useDollarRate(): DollarRateState {
  const [state, setState] = useState<DollarRateState>({
    rate: null,
    loading: true,
    error: false,
    lastUpdate: null,
  });

  useEffect(() => {
    const CACHE_KEY = "dolar_blue_cache";
    const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

    // Check cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setState({
            rate: parsed.rate,
            loading: false,
            error: false,
            lastUpdate: parsed.lastUpdate,
          });
          return;
        }
      }
    } catch {
      // Ignore cache errors
    }

    let cancelled = false;

    async function fetchRate() {
      try {
        const res = await fetch("https://dolarapi.com/v1/dolares/blue");
        if (!res.ok) throw new Error("API error");
        const data = await res.json();

        if (!cancelled) {
          const rate = data.venta as number;
          const lastUpdate = data.fechaActualizacion as string;

          setState({ rate, loading: false, error: false, lastUpdate });

          // Cache the result
          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ rate, lastUpdate, timestamp: Date.now() })
            );
          } catch {
            // Ignore storage errors
          }
        }
      } catch {
        if (!cancelled) {
          setState({ rate: null, loading: false, error: true, lastUpdate: null });
        }
      }
    }

    fetchRate();
    return () => { cancelled = true; };
  }, []);

  return state;
}
