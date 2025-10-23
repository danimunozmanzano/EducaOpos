export async function GET() {
  const ok = {
    NEXT_PUBLIC_APP_URL: !!process.env.NEXT_PUBLIC_APP_URL,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY, // true/false
    STRIPE_PRICE_STANDARD: !!process.env.STRIPE_PRICE_STANDARD,
    STRIPE_PRICE_PRO: !!process.env.STRIPE_PRICE_PRO,
  };
  return new Response(JSON.stringify(ok, null, 2), { headers: { "content-type": "application/json" } });
}
