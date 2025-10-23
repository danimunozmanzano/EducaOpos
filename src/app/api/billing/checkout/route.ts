import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { plan } = await req.json(); // "standard" | "pro"
  // En aquesta demo, usem només l'email fictici; més endavant lligarem l'usuari real de sessió
  const price = plan === "pro" ? process.env.STRIPE_PRICE_PRO! : process.env.STRIPE_PRICE_STANDARD!;
  const success = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?status=success`;
  const cancel  = `${process.env.NEXT_PUBLIC_APP_URL}/preus?status=cancel`;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    allow_promotion_codes: true,
    customer_email: "demo@educaopos.com", // (més endavant: email real de l’usuari autenticat)
    success_url: success,
    cancel_url: cancel,
    line_items: [{ price, quantity: 1 }],
    subscription_data: { trial_period_days: 7, metadata: { plan } },
    metadata: { plan },
  });

  return new Response(JSON.stringify({ url: session.url }), { headers: { "content-type": "application/json" } });
}
