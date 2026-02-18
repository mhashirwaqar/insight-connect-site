// Edge function to notify on new lead submissions

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { leadType, name, email, businessName } = await req.json();

    console.log(`New ${leadType} lead received:`, { name, email, businessName });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    // For now, just log the notification
    const notificationData = {
      to: "mhashir.services@gmail.com",
      subject: `New ${leadType === "intake" ? "Client Intake" : "Contact Form"} Submission`,
      body: `
        New lead received!
        
        Name: ${name}
        Email: ${email}
        Business: ${businessName || "Not provided"}
        Type: ${leadType}
        
        Please follow up within 1 business day.
      `,
    };

    console.log("Email notification would be sent:", notificationData);

    return new Response(
      JSON.stringify({ success: true, message: "Notification logged" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process notification" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
