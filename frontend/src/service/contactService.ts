import { ContactData } from "@/types/contact";
import { fetchData, postData } from "@/lib/strapiClient";

interface ContactMessagePayload {
  fullname: string;
  email: string;
  phone?: string;
  message: string;
}

export async function fetchContactData(): Promise<ContactData> {
  return fetchData<ContactData>("/contact?populate=*");
}

export async function sendContactMessage(data: ContactMessagePayload) {
  return postData("/contact-messages", data);
}
