type Plan = {
  id: string;
  title: string;
  priceMonthly: number;
  features: string[];
  ctaHref: string;
};

const PLANS: Plan[] = [
  {
    id: "monthly",
    title: "Mensual",
    priceMonthly: 19,
    features: [
      "Accés complet a l’especialitat d’Educació Física",
      "Supòsits pràctics",
      "Desenvolupament de tema",
      "Programació didàctica",
      "Exposició oral",
    ],
    ctaHref: "/checkout",
  },
];

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Plans de subscripció</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-md p-4 flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="text-lg font-bold mt-2">{p.priceMonthly} €/mes</p>
            <ul className="mt-2 text-sm list-disc pl-5">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href={p.ctaHref}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-center"
            >
              Subscriu-t’hi
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
