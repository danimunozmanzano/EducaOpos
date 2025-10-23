"use client";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Benvingut/da a EducaOpos</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-4 py-2 rounded-lg border"
        >
          Tancar sessió
        </button>
      </div>

      <p className="mt-2 text-gray-600">Has iniciat sessió correctament.</p>

      <div className="mt-6 grid gap-3 max-w-md">
        <a href="/progres" className="px-4 py-2 rounded-lg border">Panell de Progrés</a>
        <a href="/reserves" className="px-4 py-2 rounded-lg border">Reserves Pro</a>
        <a href="/programacio" className="px-4 py-2 rounded-lg border">Programació</a>
        <a href="/preus" className="px-4 py-2 rounded-lg border">Plans i pagament</a>
      </div>
    </main>
  );
}
