// Spanish content for ElectricAutomaticChile.
// Centralized so a future English version can sit next to it as `en.ts`.

export const es = {
  brand: {
    name: "ElectricAutomaticChile",
    tagline: "Convertimos medidores tradicionales en medidores inteligentes",
    contactEmail: "contacto@electricautomaticchile.cl",
  },
  nav: {
    home: "Inicio",
    investors: "Inversores",
    distributors: "Distribuidoras",
    languageTooltip: "Versión en inglés próximamente",
  },
  home: {
    eyebrow: "Red eléctrica inteligente · Made in Chile",
    title: "Convertimos medidores tradicionales en",
    titleAccent: "medidores inteligentes",
    subtitle:
      "Dispositivo IoT retrofit que se instala sobre el medidor existente. Sin reemplazar hardware. Lectura en tiempo real, corte y reposición remotos, IA integrada.",
    chooseAudience: "¿Qué te trajo aquí?",
    investorCard: {
      label: "Soy inversor",
      title: "Captamos USD 50–80K para escalar",
      description:
        "MVP en producción, mercado validado, ronda pre-semilla abierta. Conoce la oportunidad de invertir en la próxima red eléctrica de LATAM.",
      cta: "Ver tesis de inversión",
    },
    distributorCard: {
      label: "Represento a una distribuidora",
      title: "Reposición en segundos, no en días",
      description:
        "Reduce visitas en terreno, reclamos SEC y costos operativos. Instalación retrofit en 30 minutos, sin cambiar tu medidor base.",
      cta: "Ver solución y ROI",
    },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    builtIn: "Hecho en Chile.",
    sections: {
      solutions: "Soluciones",
      company: "Compañía",
      contact: "Contacto",
    },
    links: {
      forInvestors: "Para inversores",
      forDistributors: "Para distribuidoras",
      about: "Sobre el proyecto",
      contactUs: "Hablar con el equipo",
    },
  },
  thanks: {
    title: "¡Gracias por contactarnos!",
    subtitle:
      "Recibimos tu mensaje. Te responderemos en menos de 48 horas hábiles desde " +
      "contacto@electricautomaticchile.cl.",
    cta: "Volver al inicio",
  },
} as const;

export type Dictionary = typeof es;