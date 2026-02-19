import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_iozn5nq";
const EMAILJS_TEMPLATE_ID = "template_4sbdw9q";
const EMAILJS_PUBLIC_KEY = "cfI-UY19MhL7qGI8I";

emailjs.init(EMAILJS_PUBLIC_KEY);

export async function sendEmailNotification(params: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  page: string;
  time: string;
  form_data: string;
}) {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    name: params.name,
    email: params.email,
    phone: params.phone || "Not provided",
    company: params.company || "Not provided",
    message: params.message,
    page: params.page,
    time: params.time,
    form_data: params.form_data,
  });
}
