import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_iozn5nq";
const EMAILJS_TEMPLATE_ID = "template_4sbdw9q";
const EMAILJS_PUBLIC_KEY = "cfI-UY19MhL7qGI8I";

emailjs.init(EMAILJS_PUBLIC_KEY);

export async function sendEmailNotification(params: {
  from_name: string;
  from_email: string;
  business_name?: string;
  message: string;
  form_type: string;
}) {
  return emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    from_name: params.from_name,
    from_email: params.from_email,
    business_name: params.business_name || "Not provided",
    message: params.message,
    form_type: params.form_type,
  });
}
