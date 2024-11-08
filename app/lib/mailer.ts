import { FormData } from "../components/Contact/Form";

export async function sendEmail(data: FormData) {
  const apiEndPoint = "/api/email";

  const response = await fetch(apiEndPoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(`Wystąpił błąd - ${error}`);
  }

  return await response.json();
}
