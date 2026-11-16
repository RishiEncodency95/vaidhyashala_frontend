/**
 * Appointment and consultation requests sent from the website's booking forms and popups.
 */

import { API_BASE } from "@/lib/api";

export interface AppointmentPayload {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  consultationType: "clinic" | "online";
}

export interface ConsultationPayload {
  consultationType: "clinic" | "online";
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  consent: boolean;
}

/** POST {API}/website/home2/consultations ("Plan your consultation" popup). Throws Error(message) on failure. */
export async function submitConsultation(payload: ConsultationPayload): Promise<void> {
  await postJson(`${API_BASE}/website/home2/consultations`, payload);
}

async function postJson(url: string, payload: unknown): Promise<void> {
  let res: Response;
  try {
    res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  } catch {
    throw new Error("We could not reach the server. Please try again.");
  }
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    const detail = Array.isArray(json?.errors) && json.errors.length ? String(json.errors[0]) : "";
    throw new Error(detail || json?.message || "Something went wrong. Please try again.");
  }
}

/** POST {API}/website/home2/appointments. Throws Error(message) on failure. */
export async function submitAppointment(payload: AppointmentPayload): Promise<void> {
  await postJson(`${API_BASE}/website/home2/appointments`, payload);
}
