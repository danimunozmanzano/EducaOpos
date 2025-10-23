import { stripe } from "@/lib/stripe";

export async function POST() {
  // Cerca o crea el customer pel nostre email de demo
  const email = "demo@educaopos.com";
  const list = await stripe.customers.list({ email, limit: 1 });
  const customer = list.data[0] || await stripe.customers.create({ email });

  const portal = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  });

  return new Response(JSON.stringify({ url: portal.url }), { headers: { "content-type": "application/json" } });
}
