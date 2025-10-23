export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Benvingut/da a EducaOpos 👋</h1>
        <p className="mb-6 text-gray-600">
          Inicia sessió per començar a preparar les teves oposicions.
        </p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Anar al login
        </a>
      </div>
    </main>
  );
}
