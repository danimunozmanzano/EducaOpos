// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();

async function main() {
  // Usuari DEMO
  const passwordHash = await bcrypt.hash("demo1234", 10);
  await db.user.upsert({
    where: { email: "demo@educaopos.com" },
    update: {},
    create: {
      email: "demo@educaopos.com",
      passwordHash,
      name: "Demo",
      locale: "ca",
    },
  });

  // Escala de nivells comuna
  const levels = {
    excellent: { label: { ca: "Excel·lent", es: "Excelente" }, range: [0.85, 1] },
    adequate: { label: { ca: "Adequat", es: "Adecuado" }, range: [0.7, 0.84] },
    improvable: { label: { ca: "Millorable", es: "Mejorable" }, range: [0.5, 0.69] },
    insufficient: { label: { ca: "Insuficient", es: "Insuficiente" }, range: [0, 0.49] },
  };

  // Rúbriques (creem totes les necessàries)
  await db.rubric.upsert({
    where: { id: "rub-supos-ca" },
    update: {},
    create: {
      id: "rub-supos-ca",
      scope: "SUPOSIT",
      version: "1.0",
      locale: "ca",
      weights: { formals: 0.15, didactica: 0.85 },
      levels,
      criteria: {
        formals: ["Estructura", "Llenguatge"],
        didactica: ["Adequació curricular", "Inclusió", "Coherència O-A-A", "Instruments", "Justificació"],
      },
    },
  });
  await db.rubric.upsert({
    where: { id: "rub-supos-es" },
    update: {},
    create: {
      id: "rub-supos-es",
      scope: "SUPOSIT",
      version: "1.0",
      locale: "es",
      weights: { formales: 0.15, didactica: 0.85 },
      levels,
      criteria: {
        formales: ["Estructura", "Lenguaje"],
        didactica: ["Adecuación curricular", "Inclusión", "Coherencia O-A-E", "Instrumentos", "Justificación"],
      },
    },
  });

  await db.rubric.upsert({
    where: { id: "rub-tema-ca" },
    update: {},
    create: {
      id: "rub-tema-ca",
      scope: "TEMA",
      version: "1.0",
      locale: "ca",
      weights: { formals: 0.2, cientific: 0.8 },
      levels,
      criteria: {
        formals: ["Estructura, ortografia"],
        cientific: ["Precisió i actualització", "Aplicació didàctica"],
      },
    },
  });
  await db.rubric.upsert({
    where: { id: "rub-tema-es" },
    update: {},
    create: {
      id: "rub-tema-es",
      scope: "TEMA",
      version: "1.0",
      locale: "es",
      weights: { formales: 0.2, cientifico: 0.8 },
      levels,
      criteria: {
        formales: ["Estructura, ortografía"],
        cientifico: ["Precisión y actualización", "Aplicación didáctica"],
      },
    },
  });

  await db.rubric.upsert({
    where: { id: "rub-prog-ca" },
    update: {},
    create: {
      id: "rub-prog-ca",
      scope: "PROGRAMACIO",
      version: "1.0",
      locale: "ca",
      weights: { formals: 0.1, proposta: 0.4, exposicio: 0.5 },
      levels,
      criteria: {
        formals: ["Estructura"],
        proposta: ["Coherència vertical", "Inclusió i NEE", "Metodologies"],
        exposicio: ["Claredat", "Domini"],
      },
    },
  });
  await db.rubric.upsert({
    where: { id: "rub-prog-es" },
    update: {},
    create: {
      id: "rub-prog-es",
      scope: "PROGRAMACIO",
      version: "1.0",
      locale: "es",
      weights: { formales: 0.1, propuesta: 0.4, exposicion: 0.5 },
      levels,
      criteria: {
        formales: ["Estructura"],
        propuesta: ["Coherencia vertical", "Inclusión y NEE", "Metodologías"],
        exposicion: ["Claridad", "Dominio"],
      },
    },
  });

  await db.rubric.upsert({
    where: { id: "rub-exp-ca" },
    update: {},
    create: {
      id: "rub-exp-ca",
      scope: "EXPOSICIO",
      version: "1.0",
      locale: "ca",
      weights: { estructura: 0.25, domini: 0.35, expressio: 0.25, resposta: 0.15 },
      levels,
      criteria: {
        estructura: ["Guió, temps"],
        domini: ["Científic-didàctic"],
        expressio: ["Verbal i no verbal"],
        resposta: ["Q&A"],
      },
    },
  });
  await db.rubric.upsert({
    where: { id: "rub-exp-es" },
    update: {},
    create: {
      id: "rub-exp-es",
      scope: "EXPOSICIO",
      version: "1.0",
      locale: "es",
      weights: { estructura: 0.25, dominio: 0.35, expresion: 0.25, respuesta: 0.15 },
      levels,
      criteria: {
        estructura: ["Guion, tiempo"],
        dominio: ["Científico-didáctico"],
        expresion: ["Verbal y no verbal"],
        respuesta: ["Q&A"],
      },
    },
  });

  console.log("✅ Seed complet: usuari demo + rúbriques");
}

main().finally(() => db.$disconnect());
