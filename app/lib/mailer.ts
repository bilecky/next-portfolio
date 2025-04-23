import { error } from "console";
import { contactFormData } from "../../components/Contact/Form";

export async function sendEmail(data: contactFormData) {
  const apiEndPoint = "/api/email";

  const response = await fetch(apiEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    return { success: false, error: result.error }; // Zwracamy status sukcesu jako false oraz błąd
  }

  return { success: true, message: result.message };
}
