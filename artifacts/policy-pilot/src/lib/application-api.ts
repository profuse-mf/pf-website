export interface ApplicationPayload {
  vehicle_type: string | null;
  reg_no: string | null;
  pincode: string | null;
  reg_year: number | null;
  model: string | null;
  brand: string | null;
  mobile_no: string | null;
  expiry_date: string | null;
  email: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_partner: string | null;
  utm_channel: string | null;
}

export async function createApplication(payload: ApplicationPayload): Promise<void> {
  try {
    await fetch("/api/application/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[application-api] failed to submit:", err);
  }
}

const UTM_KEY = "pp_utm";

export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    utm_source:  params.get("utm_source")  ?? null,
    utm_medium:  params.get("utm_medium")  ?? null,
    utm_partner: params.get("utm_partner") ?? null,
    utm_channel: params.get("utm_channel") ?? null,
  };
  if (Object.values(utm).some(Boolean)) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  }
}

export function getStoredUtm(): { utm_source: string | null; utm_medium: string | null; utm_partner: string | null; utm_channel: string | null } {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { utm_source: null, utm_medium: null, utm_partner: null, utm_channel: null };
}
