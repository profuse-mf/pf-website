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
