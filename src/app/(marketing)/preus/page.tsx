"use client";
import { useState } from "react";

async function post(url: string, body: any) {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  return r.json();
}

export default function PreusPage() {
  const [loading, setLoading] = useState<string>();

  async function checkout(plan: "standard" | "pro") {
    setLoading(plan);
    const { url } = await post("/api/billing/checkout", { plan });
    window.location.href = url;
  }

  async function portal() {
    const { url } = await post("/api/billing/portal", {});
    window.location.href = url;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Plans</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Standard</h2>
          <p className="mt-2 text-sm text-gray-500">30–40 €/mes · 7 dies de prova</p>
          <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
            <li>Accés complet als mòduls</li>
            <li>Correccions amb fair use</li>
            <li>Exportació a PDF</li>
          </ul>
          <button onClick={() => checkout("standard")} disabled={loading==="standard"} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white">
            {loading==="standard" ? "Creant sessió…" : "Comença (7 dies gratis)"}
          </button>
        </div>

        <div className="border rounded-2xl p-6">
          <h2 className="text-xl font-semibold">Pro</h2>
          <p className="mt-2 text-sm text-gray-500">Inclou sessions 1-a-1</p>
          <ul className="mt-3 text-sm text-gray-600 list-disc pl-5">
            <li>Tot l’Standard</li>
            <li>Crèdits mensuals de reserva</li>
            <li>Materials premium</li>
          </ul>
          <button onClick={() => checkout("pro")} disabled={loading==="pro"} className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white">
            {loading==="pro" ? "Creant sessió…" : "Actualitza a Pro"}
          </button>
          <button onClick={portal} className="mt-2 px-4 py-2 rounded-lg border">Gestiona la subscripció</button>
        </div>
      </div>
    </main>
  );
}
