/**
 * Full translation dictionaries for ElectricAutomaticChile.
 * Spanish is the source of truth for the shape; English mirrors it 1:1.
 * The shared `Dictionary` type is derived from `es` to guarantee parity at compile time.
 */

export const es = {
  brand: {
    name: "ElectricAutomaticChile",
    tagline: "Convertimos medidores tradicionales en medidores inteligentes",
    contactEmail: "contacto@electricautomaticchile.cl",
    location: "Santiago, Chile",
  },
  nav: {
    home: "Inicio",
    investors: "Inversores",
    distributors: "Distribuidoras",
    contact: "Contacto",
    panel: "Panel",
    languageLabel: "Cambiar idioma",
    openMenu: "Abrir menú",
  },
  home: {
    eyebrow: "Red eléctrica inteligente · Made in Chile",
    title: "Convertimos medidores tradicionales en",
    titleAccent: "medidores inteligentes",
    subtitle:
      "Dispositivo IoT retrofit que se instala sobre el medidor existente. Sin reemplazar hardware. Lectura en tiempo real, corte y reposición remotos, IA integrada.",
    badges: {
      hardware: "Hardware ESP32 + 4G",
      reading: "Lectura cada 30s",
      remote: "Corte y reposición remota",
    },
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
    otherInquiry: "¿Otra consulta?",
    writeUs: "Escríbenos directamente",
  },
  footer: {
    rights: "Todos los derechos reservados.",
    builtIn: "Hecho en Chile.",
    sections: {
      solutions: "Soluciones",
      contact: "Contacto",
    },
    links: {
      forInvestors: "Para inversores",
      forDistributors: "Para distribuidoras",
    },
    description:
      "Hardware, software y datos para la próxima red eléctrica de Latinoamérica.",
  },
  thanks: {
    title: "¡Gracias por contactarnos!",
    subtitle:
      "Recibimos tu mensaje. Te responderemos en menos de 48 horas hábiles desde contacto@electricautomaticchile.cl.",
    cta: "Volver al inicio",
  },
  notFound: {
    title: "404",
    message: "Ups, no encontramos esta página.",
    cta: "Volver al inicio",
  },
  investors: {
    docTitle: "Inversores · ElectricAutomaticChile",
    hero: {
      eyebrow: "Ronda pre-semilla abierta",
      titleStart: "Buscamos",
      titleAmount: "USD 50–80K",
      titleEnd: "para escalar la red eléctrica inteligente de Chile.",
      subtitle:
        "Hardware en producción, software completo, mercado de 5M+ medidores. Buscamos capital para certificaciones, piloto comercial y equipo de ventas.",
      ctaPrimary: "Solicitar pitch deck",
      ctaSecondary: "Hablar con el fundador",
      mailSubject: "Hablar con el fundador",
    },
    problem: {
      eyebrow: "Mercado",
      title: "El problema, en cifras",
      stats: [
        { value: "USD 3,4M", label: "/ año desperdicia solo Chilquinta" },
        { value: "89.000", label: "reposiciones manuales / año" },
        { value: "24–48 h", label: "tiempo promedio de reposición" },
      ],
      footnote:
        "Las distribuidoras chilenas pierden miles de millones cada año en visitas a terreno, lecturas manuales y reposición de servicio. Nuestra solución corta ese costo de raíz.",
    },
    solution: {
      eyebrow: "Solución",
      title: "Retrofit no invasivo vs. AMI tradicional",
      ami: {
        label: "AMI tradicional",
        price: "USD 200–500 / medidor",
        bullets: [
          "Reemplazo total del medidor",
          "Despliegue: 3 a 5 años",
          "Inversión inicial millonaria",
          "Resistencia política y regulatoria",
        ],
      },
      ours: {
        label: "ElectricAutomaticChile",
        price: "USD 37–150 / dispositivo",
        bullets: [
          "Se instala sobre el medidor existente",
          "Despliegue: 30 minutos por unidad",
          "CAPEX bajo, modelo SaaS recurrente",
          "Mismo resultado funcional que AMI",
        ],
      },
    },
    traction: {
      eyebrow: "Tracción técnica",
      title: "MVP completo, no slideware",
      items: [
        "Hardware ESP32 + 4G",
        "Backend Go (22 APIs)",
        "Frontend Next.js",
        "Apps Flutter (iOS + Android)",
        "Infra AWS productiva",
        "IA integrada",
      ],
      footnote:
        "Toda la pila tecnológica está construida y operativa. La inversión financia ventas, certificaciones y manufactura — no I+D base.",
    },
    market: {
      eyebrow: "Mercado",
      title: "5M+ medidores en Chile, expansión LATAM",
      tam: {
        label: "TAM",
        value: "LATAM",
        description:
          "Brasil, Colombia, Perú, México y Chile suman más de 200M medidores eléctricos residenciales.",
      },
      sam: {
        label: "SAM",
        value: "Chile",
        description:
          "5M+ medidores residenciales y PYME, todos retrofit-compatibles. Marco SEC presiona modernización.",
      },
      som: {
        label: "SOM 12 meses",
        value: "10–20K disp.",
        description:
          "Cooperativas rurales y un piloto con distribuidora mediana son la entrada realista a 12 meses.",
      },
    },
    economics: {
      eyebrow: "Modelo",
      title: "Unit economics",
      headers: ["Volumen", "Costo / dispositivo", "Precio venta", "Margen bruto", "Fee SaaS / mes"],
      rows: [
        ["250 uds (piloto)", "USD 75", "USD 150", "50%", "USD 4 / disp"],
        ["1.000 uds", "USD 55", "USD 110", "50%", "USD 3 / disp"],
        ["10.000 uds", "USD 37", "USD 80", "54%", "USD 2 / disp"],
      ] as readonly (readonly string[])[],
      kpis: [
        { label: "MRR objetivo año 2", value: "USD 37K" },
        { label: "LTV / CAC objetivo", value: "> 5x" },
        { label: "Margen blended", value: "50–55%" },
      ],
    },
    round: {
      eyebrow: "Inversión",
      title: "La ronda",
      headlineStart: "USD",
      headlineAmount: "50K – 80K",
      headlineEnd: "pre-semilla",
      description:
        "SAFE / nota convertible. Posiciona para Serie A de USD 500K–1M al alcanzar piloto comercial validado y MRR consistente.",
      milestones: [
        { q: "Mes 1–3", t: "Cierre de ronda + certificaciones iniciadas" },
        { q: "Mes 3–6", t: "Piloto 250 dispositivos en distribuidora aliada" },
        { q: "Mes 6–9", t: "Primer contrato comercial (2.000 unidades)" },
        { q: "Mes 9–12", t: "MRR ~USD 37K, preparación Serie A USD 500K–1M" },
      ],
      useOfFundsLabel: "Uso de fondos",
      useOfFunds: [
        { label: "Certificaciones SEC / SUBTEL", pct: 25 },
        { label: "Piloto 250 dispositivos", pct: 35 },
        { label: "Equipo comercial", pct: 25 },
        { label: "Go-to-market & marketing", pct: 15 },
      ],
    },
    why: {
      eyebrow: "Timing",
      title: "¿Por qué ahora?",
      reasons: [
        {
          title: "Ventana AMI cerrándose",
          text: "Las distribuidoras evalúan ahora cómo modernizar su parque. Quien no entre en los próximos 18 meses queda fuera.",
        },
        {
          title: "Presión SEC creciente",
          text: "Multas por mala calidad de servicio y reclamos están al alza. Reducirlos es CFO-priority.",
        },
        {
          title: "Founder con sistema en producción",
          text: "No es prototipo: hardware, backend, app y dashboard funcionan hoy. Es escalar lo que ya existe.",
        },
      ],
    },
    roadmap: {
      eyebrow: "Ejecución",
      title: "Roadmap a 12 meses",
    },
    risks: {
      eyebrow: "Transparencia",
      title: "Riesgos y mitigaciones",
      items: [
        {
          risk: "Ciclo de venta largo en distribuidoras",
          mit: "Entrada por cooperativas rurales (decisión rápida) + piloto pagado.",
        },
        {
          risk: "Competencia de soluciones AMI tradicionales",
          mit: "Costo 5x menor y despliegue 30 min vs. años. Ventana antes de roll-outs masivos.",
        },
        {
          risk: "Dependencia regulatoria SEC",
          mit: "Certificaciones en proceso. Asesor regulatorio ya integrado al equipo.",
        },
        {
          risk: "Hardware en terreno",
          mit: "Componentes industriales probados, OTA updates, garantía y reposición incluidas.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Solicitar pitch deck completo",
      description:
        "Déjanos tus datos y te enviaremos el deck completo, métricas actualizadas y agendamos una llamada de 30 minutos con el fundador.",
      angelNote:
        "También aceptamos rondas más pequeñas (USD 5K+) de inversores ángeles del sector energía o IoT.",
    },
  },
  distributors: {
    docTitle: "Distribuidoras · ElectricAutomaticChile",
    hero: {
      eyebrow: "Para distribuidoras y cooperativas eléctricas",
      titleStart: "Reposición en",
      titleAccent: "segundos",
      titleEnd: ", no en días.",
      subtitle:
        "Dispositivo IoT retrofit que se instala sobre el medidor existente. Reduce visitas en terreno, mejora indicadores SEC y entrega visibilidad en tiempo real sin reemplazar tu parque.",
      ctaPrimary: "Agendar demo",
      ctaSecondary: "Ver ROI estimado",
    },
    pains: {
      eyebrow: "Hoy",
      title: "El dolor que ya conoces",
      items: [
        {
          title: "Cuadrillas en terreno todos los días",
          text: "Reposiciones manuales tras pago de cuentas atrasadas, cortes y lecturas mensuales. Costo logístico alto y creciente.",
        },
        {
          title: "Reclamos SEC por tiempos de respuesta",
          text: "Tiempos de reposición de 24 a 48 horas generan multas, escaladas y mala reputación.",
        },
        {
          title: "Sin visibilidad en tiempo real",
          text: "Lecturas mensuales con errores manuales, anomalías que se detectan tarde, fraude difícil de identificar.",
        },
      ],
    },
    how: {
      eyebrow: "Solución",
      title: "Cómo funciona",
      steps: [
        {
          title: "Instalación retrofit en 30 minutos",
          text: "Se monta sobre el medidor existente. No se reemplaza hardware ni se interrumpe el servicio.",
        },
        {
          title: "Lectura automatizada cada 30s",
          text: "Datos de consumo y estado en tiempo real, sincronizados a tu plataforma o a la nuestra.",
        },
        {
          title: "Corte y reposición remota",
          text: "Acción comandada desde el dashboard. Cero visitas en terreno para gestiones rutinarias.",
        },
        {
          title: "Alertas con IA",
          text: "Detección automática de fraude, hurto, anomalías de consumo y caídas de servicio.",
        },
      ],
    },
    beforeAfter: {
      eyebrow: "Impacto operativo",
      title: "Antes vs. después",
      headers: ["Proceso", "Antes", "Después"],
      rows: [
        {
          label: "Reposición de servicio",
          before: "24–48 horas, cuadrilla en terreno",
          after: "Segundos, comando remoto",
        },
        {
          label: "Lectura del consumo",
          before: "Mensual, manual, con errores",
          after: "Cada 30 segundos, automático",
        },
        {
          label: "Visibilidad para el cliente final",
          before: "Boleta una vez al mes",
          after: "App móvil con consumo en vivo",
        },
        {
          label: "Facturación",
          before: "Atrasada y con disputas",
          after: "Datos certeros, sin disputa",
        },
        {
          label: "Detección de anomalías",
          before: "Reactiva, días después",
          after: "Proactiva con alertas IA",
        },
      ],
    },
    roi: {
      eyebrow: "Simulación",
      title: "Calculadora de ROI",
      fields: {
        meters: "Nº de medidores a instrumentar",
        crewCost: "Costo promedio cuadrilla por visita (CLP)",
        repos: "Reposiciones / cortes manuales por mes",
        device: "Precio por dispositivo (USD)",
      },
      result: {
        title: "Resultado estimado",
        annualSavings: "Ahorro anual estimado",
        investment: "Inversión inicial",
        payback: "Payback",
        paybackUnit: "meses",
        disclaimer:
          "* Estimación referencial: 85% reducción en visitas en terreno y tipo de cambio CLP 950/USD. Los valores reales se ajustan al contrato.",
      },
    },
    pricing: {
      eyebrow: "Comercial",
      title: "Paquetes y pricing",
      mostPopular: "Más popular",
      setupLabel: "Setup",
      recurringLabel: "Recurrente",
      requestCta: "Solicitar este plan",
      footnote:
        "Precios referenciales. Se ajustan según volumen, conectividad y nivel de integración requerido.",
      packages: [
        {
          name: "Piloto",
          units: "250 dispositivos",
          setup: "USD 2.500",
          monthly: "USD 1.000 / mes",
          features: [
            "Hardware + instalación incluida",
            "Dashboard web + apps móviles",
            "Soporte técnico dedicado",
            "Reportes mensuales",
          ],
          highlight: false,
        },
        {
          name: "Estándar",
          units: "2.000 dispositivos",
          setup: "USD 8.000",
          monthly: "USD 6.000 / mes",
          features: [
            "Todo lo del piloto",
            "Integración API a tus sistemas",
            "Alertas IA personalizadas",
            "SLA 99,5%",
          ],
          highlight: true,
        },
        {
          name: "Escala",
          units: "10.000+ dispositivos",
          setup: "A medida",
          monthly: "Desde USD 20.000 / mes",
          features: [
            "Todo lo del estándar",
            "Despliegue por fases",
            "Equipo dedicado en sitio",
            "SLA 99,9% + soporte 24/7",
          ],
          highlight: false,
        },
      ],
    },
    specs: {
      eyebrow: "Producto",
      title: "Especificaciones técnicas",
      items: [
        {
          title: "Hardware",
          text: "ESP32 dual-core, módem 4G LTE Cat-1, sensor de corriente CT, relé industrial para corte/reposición, gabinete IP65, fuente de alimentación parasitaria desde la línea.",
        },
        {
          title: "Conectividad",
          text: "4G LTE multi-operador con SIM gestionada. Fallback a 2G donde el mercado lo requiera. Buffer local de hasta 30 días sin red.",
        },
        {
          title: "Certificaciones",
          text: "SEC y SUBTEL en proceso. Cumplimiento RoHS y CE en hardware. Documentación regulatoria entregada en cada despliegue.",
        },
        {
          title: "Integración",
          text: "API REST documentada (OpenAPI), webhooks de eventos, exportación CSV/Parquet. Conectores ejemplo para SAP IS-U y MDM propietarios.",
        },
        {
          title: "Seguridad",
          text: "TLS 1.3 punta a punta, firma firmware, OTA updates seguros, control de accesos por rol y auditoría completa.",
        },
      ],
    },
    useCases: {
      eyebrow: "A quién servimos",
      title: "Casos de uso",
      items: [
        {
          title: "Cooperativas rurales",
          text: "Decisión rápida, alto dolor logístico por dispersión geográfica. Ideal para entrar y validar en terreno.",
        },
        {
          title: "Distribuidoras medianas",
          text: "Piloto de 250–2.000 unidades en zonas críticas con alta morosidad o reclamos SEC.",
        },
        {
          title: "Grandes distribuidoras",
          text: "Despliegue por fases tras piloto exitoso. Integración profunda con sistemas existentes.",
        },
      ],
    },
    architecture: {
      eyebrow: "Tecnología",
      title: "Arquitectura cloud",
      items: [
        {
          title: "AWS productivo",
          text: "Stack desplegado en AWS con autoescalamiento. Multi-AZ para alta disponibilidad.",
        },
        {
          title: "Datos durables",
          text: "Series temporales en bases optimizadas. Retención configurable, exportación nativa.",
        },
        {
          title: "SLA",
          text: "99,5% en plan estándar, 99,9% en plan escala con monitoreo 24/7 y soporte dedicado.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Reemplaza el medidor existente?", a: "No. Se monta sobre el medidor actual sin alterar su funcionamiento ni la facturación regulada. La lectura es paralela." },
        { q: "¿Qué pasa si pierde conexión 4G?", a: "El dispositivo almacena lecturas localmente y las sincroniza al recuperar señal. No se pierden datos." },
        { q: "¿Cumple normativa SEC?", a: "Las certificaciones SEC y SUBTEL están en proceso. La operación piloto se realiza bajo el marco existente y se adapta a cada distribuidora." },
        { q: "¿Cómo se integra con SAP u otros sistemas internos?", a: "Vía API REST documentada. Soportamos webhooks, exportación periódica y conectores hacia los sistemas más comunes (SAP, Oracle, MDM propietarios)." },
        { q: "¿Cuánto demora un despliegue de 2.000 unidades?", a: "Aproximadamente 6 a 10 semanas, incluyendo coordinación logística y cuadrillas. Despliegues mayores se realizan por fases." },
        { q: "¿Quién es dueño de los datos?", a: "La distribuidora. Los datos se almacenan en infraestructura AWS y son accesibles vía API y exportación." },
        { q: "¿Qué garantía tienen los dispositivos?", a: "2 años de garantía contra defectos de fábrica, con reposición incluida. Componentes industriales calidad outdoor IP65." },
      ],
    },
    contact: {
      eyebrow: "Contacto comercial",
      title: "Agendar demo técnica",
      description:
        "Te mostramos el dispositivo en vivo, el dashboard en operación y modelamos el ROI específico para tu parque de medidores. Tiempo estimado: 45 minutos.",
    },
  },
  forms: {
    common: {
      required: "*",
      sending: "Enviando…",
      replyNote: "Te responderemos en menos de 48 horas hábiles. Tus datos solo se usan para este contacto.",
      errors: {
        nameMin: "Ingresa tu nombre",
        emailInvalid: "Email no válido",
        organizationRequired: "Indica la distribuidora",
      },
    },
    investor: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Email",
      emailPlaceholder: "tucorreo@fondo.com",
      orgLabel: "Fondo / empresa",
      orgPlaceholder: "Acme Ventures",
      ticketLabel: "Ticket estimado",
      ticketPlaceholder: "Selecciona un rango",
      ticketOptions: [
        "USD 5K – 10K",
        "USD 10K – 25K",
        "USD 25K – 50K",
        "USD 50K – 80K (lead)",
        "Solo quiero conocer la oportunidad",
      ],
      messageLabel: "Mensaje",
      messagePlaceholder:
        "Cuéntanos brevemente tu tesis o qué te interesa de ElectricAutomaticChile.",
      submit: "Solicitar pitch deck completo",
      errorTitle: "No pudimos enviar tu mensaje",
      errorDescription: "Intenta nuevamente o escríbenos por email.",
    },
    distributor: {
      nameLabel: "Nombre",
      roleLabel: "Cargo",
      rolePlaceholder: "Gerente de operaciones",
      orgLabel: "Distribuidora",
      emailLabel: "Email corporativo",
      metersLabel: "Nº aproximado de medidores",
      metersPlaceholder: "Selecciona un rango",
      metersOptions: [
        "Menos de 1.000",
        "1.000 – 10.000",
        "10.000 – 100.000",
        "Más de 100.000",
      ],
      messageLabel: "Mensaje",
      messagePlaceholder:
        "Cuéntanos qué problema operativo te gustaría resolver primero.",
      submit: "Agendar demo técnica",
      replyNote: "Coordinaremos una demo en menos de 48 horas hábiles.",
      errorTitle: "No pudimos enviar tu solicitud",
      errorDescription: "Intenta nuevamente o escríbenos por email.",
    },
  },
  auth: {
    docTitle: "Acceso · ElectricAutomaticChile",
    cardTitle: "Acceso al panel",
    cardDescription:
      "Solo personal autorizado. El primer usuario registrado obtiene rol de administrador.",
    tabs: { signIn: "Iniciar sesión", signUp: "Crear cuenta" },
    emailLabel: "Email",
    passwordLabel: "Contraseña",
    signInBusy: "Entrando…",
    signUpBusy: "Creando…",
    signInCta: "Iniciar sesión",
    signUpCta: "Crear cuenta",
    invalidTitle: "Datos inválidos",
    accountCreated: "Cuenta creada",
    accountCreatedDescription: "Iniciando sesión…",
    failureTitle: "No pudimos completar la acción",
    unexpectedError: "Error inesperado",
    passwordMin: "Mínimo 8 caracteres",
  },
  admin: {
    docTitle: "Panel · ElectricAutomaticChile",
    title: "Panel de leads",
    sessionLabel: "Sesión",
    refresh: "Actualizar",
    logout: "Salir",
    loading: "Cargando…",
    accessDeniedTitle: "Acceso restringido",
    accessDeniedDescription: "Tu cuenta no tiene permisos de administrador.",
    stats: {
      total: "Total",
      investors: "Inversores",
      distributors: "Distribuidoras",
      newUncontacted: "Nuevos sin contactar",
    },
    filters: {
      title: "Filtros",
      searchPlaceholder: "Buscar por nombre, email, organización…",
      typeAll: "Todos los tipos",
      typeInvestor: "Inversor",
      typeDistributor: "Distribuidora",
      statusAll: "Todos los estados",
      from: "Desde",
      to: "Hasta",
    },
    status: {
      new: "Nuevo",
      contacted: "Contactado",
      qualified: "Calificado",
      discarded: "Descartado",
    },
    types: {
      investor: "Inversor",
      distributor: "Distribuidora",
    },
    table: {
      date: "Fecha",
      type: "Tipo",
      name: "Nombre",
      email: "Email",
      organization: "Organización",
      message: "Mensaje",
      status: "Estado",
      empty: "Sin resultados con los filtros actuales.",
    },
    pagination: {
      showing: "Mostrando",
      of: "de",
      filteredLeads: "leads filtrados",
      perPage: "Por página",
      loadMore: "Cargar más",
      loading: "Cargando…",
      noMore: "No hay más",
    },
    export: {
      csv: "CSV",
      pdf: "PDF",
      pdfTitle: "ElectricAutomaticChile — Leads",
      generated: "Generado",
      typeLabel: "Tipo",
      statusLabel: "Estado",
      fromLabel: "Desde",
      toLabel: "Hasta",
      searchLabel: "Búsqueda",
      resultsLabel: "Resultados",
      pageOf: "Página {n} de {total}",
      csvDoneTitle: "CSV generado",
      pdfDoneTitle: "PDF generado",
      doneDescription: "{count} registros exportados.",
      errorTitle: "Error al exportar",
    },
    update: {
      errorTitle: "No se pudo actualizar",
    },
    fetchError: "Error al cargar leads",
    locale: "es-CL",
  },
};

/**
 * The shape of every dictionary. The English translation is enforced to match the Spanish keys.
 */
export type Dictionary = typeof es;

export const en: Dictionary = {
  brand: {
    name: "ElectricAutomaticChile",
    tagline: "We turn traditional meters into smart meters",
    contactEmail: "contacto@electricautomaticchile.cl",
    location: "Santiago, Chile",
  },
  nav: {
    home: "Home",
    investors: "Investors",
    distributors: "Utilities",
    contact: "Contact",
    panel: "Dashboard",
    languageLabel: "Switch language",
    openMenu: "Open menu",
  },
  home: {
    eyebrow: "Smart electric grid · Made in Chile",
    title: "We turn traditional meters into",
    titleAccent: "smart meters",
    subtitle:
      "Retrofit IoT device that installs on top of the existing meter. No hardware replacement. Real-time readings, remote disconnect and reconnect, integrated AI.",
    badges: {
      hardware: "ESP32 + 4G hardware",
      reading: "Readings every 30s",
      remote: "Remote disconnect & reconnect",
    },
    chooseAudience: "What brought you here?",
    investorCard: {
      label: "I'm an investor",
      title: "Raising USD 50–80K to scale",
      description:
        "MVP in production, validated market, pre-seed round open. See the opportunity to invest in LATAM's next electric grid.",
      cta: "View investment thesis",
    },
    distributorCard: {
      label: "I represent a utility",
      title: "Reconnect in seconds, not days",
      description:
        "Cut field visits, regulatory complaints and operational costs. Retrofit installation in 30 minutes — your base meter stays.",
      cta: "See solution & ROI",
    },
    otherInquiry: "Different inquiry?",
    writeUs: "Write to us directly",
  },
  footer: {
    rights: "All rights reserved.",
    builtIn: "Built in Chile.",
    sections: {
      solutions: "Solutions",
      contact: "Contact",
    },
    links: {
      forInvestors: "For investors",
      forDistributors: "For utilities",
    },
    description:
      "Hardware, software and data for Latin America's next electric grid.",
  },
  thanks: {
    title: "Thanks for reaching out!",
    subtitle:
      "We received your message. We'll get back to you within 48 business hours from contacto@electricautomaticchile.cl.",
    cta: "Back to home",
  },
  notFound: {
    title: "404",
    message: "Oops, we couldn't find this page.",
    cta: "Back to home",
  },
  investors: {
    docTitle: "Investors · ElectricAutomaticChile",
    hero: {
      eyebrow: "Pre-seed round open",
      titleStart: "We're raising",
      titleAmount: "USD 50–80K",
      titleEnd: "to scale Chile's smart electric grid.",
      subtitle:
        "Production-grade hardware, complete software, a market of 5M+ meters. We're raising capital for certifications, commercial pilot and sales team.",
      ctaPrimary: "Request pitch deck",
      ctaSecondary: "Talk to the founder",
      mailSubject: "Talk to the founder",
    },
    problem: {
      eyebrow: "Market",
      title: "The problem, in numbers",
      stats: [
        { value: "USD 3.4M", label: "/ year wasted by Chilquinta alone" },
        { value: "89,000", label: "manual reconnects per year" },
        { value: "24–48 h", label: "average reconnect time" },
      ],
      footnote:
        "Chilean utilities lose billions every year on field visits, manual readings and service reconnects. Our solution cuts that cost at the root.",
    },
    solution: {
      eyebrow: "Solution",
      title: "Non-invasive retrofit vs. traditional AMI",
      ami: {
        label: "Traditional AMI",
        price: "USD 200–500 / meter",
        bullets: [
          "Full meter replacement",
          "Rollout: 3 to 5 years",
          "Massive upfront investment",
          "Political and regulatory friction",
        ],
      },
      ours: {
        label: "ElectricAutomaticChile",
        price: "USD 37–150 / device",
        bullets: [
          "Installs on top of the existing meter",
          "Rollout: 30 minutes per unit",
          "Low CAPEX, recurring SaaS model",
          "Same functional outcome as AMI",
        ],
      },
    },
    traction: {
      eyebrow: "Technical traction",
      title: "Complete MVP, no slideware",
      items: [
        "ESP32 + 4G hardware",
        "Go backend (22 APIs)",
        "Next.js frontend",
        "Flutter apps (iOS + Android)",
        "Production AWS infra",
        "Integrated AI",
      ],
      footnote:
        "The full tech stack is built and operating. Capital funds sales, certifications and manufacturing — not core R&D.",
    },
    market: {
      eyebrow: "Market",
      title: "5M+ meters in Chile, LATAM expansion",
      tam: {
        label: "TAM",
        value: "LATAM",
        description:
          "Brazil, Colombia, Peru, Mexico and Chile add up to over 200M residential electric meters.",
      },
      sam: {
        label: "SAM",
        value: "Chile",
        description:
          "5M+ residential and SMB meters, all retrofit-compatible. SEC framework pushes modernization.",
      },
      som: {
        label: "SOM 12 months",
        value: "10–20K units",
        description:
          "Rural cooperatives and a pilot with a mid-size utility are the realistic 12-month entry point.",
      },
    },
    economics: {
      eyebrow: "Model",
      title: "Unit economics",
      headers: ["Volume", "Cost / device", "Sale price", "Gross margin", "SaaS fee / month"],
      rows: [
        ["250 units (pilot)", "USD 75", "USD 150", "50%", "USD 4 / device"],
        ["1,000 units", "USD 55", "USD 110", "50%", "USD 3 / device"],
        ["10,000 units", "USD 37", "USD 80", "54%", "USD 2 / device"],
      ] as readonly (readonly string[])[],
      kpis: [
        { label: "Year-2 target MRR", value: "USD 37K" },
        { label: "Target LTV / CAC", value: "> 5x" },
        { label: "Blended margin", value: "50–55%" },
      ],
    },
    round: {
      eyebrow: "Investment",
      title: "The round",
      headlineStart: "USD",
      headlineAmount: "50K – 80K",
      headlineEnd: "pre-seed",
      description:
        "SAFE / convertible note. Positions us for a USD 500K–1M Series A once a validated commercial pilot and consistent MRR are reached.",
      milestones: [
        { q: "Month 1–3", t: "Round close + certifications kicked off" },
        { q: "Month 3–6", t: "250-device pilot with partner utility" },
        { q: "Month 6–9", t: "First commercial contract (2,000 units)" },
        { q: "Month 9–12", t: "MRR ~USD 37K, prep for USD 500K–1M Series A" },
      ],
      useOfFundsLabel: "Use of funds",
      useOfFunds: [
        { label: "SEC / SUBTEL certifications", pct: 25 },
        { label: "250-device pilot", pct: 35 },
        { label: "Commercial team", pct: 25 },
        { label: "Go-to-market & marketing", pct: 15 },
      ],
    },
    why: {
      eyebrow: "Timing",
      title: "Why now?",
      reasons: [
        {
          title: "AMI window closing",
          text: "Utilities are deciding right now how to modernize their fleet. Whoever doesn't enter in the next 18 months is left out.",
        },
        {
          title: "Growing SEC pressure",
          text: "Fines for poor service quality and complaints are rising. Reducing them is a CFO priority.",
        },
        {
          title: "Founder with a system in production",
          text: "Not a prototype: hardware, backend, app and dashboard work today. We're scaling what already exists.",
        },
      ],
    },
    roadmap: {
      eyebrow: "Execution",
      title: "12-month roadmap",
    },
    risks: {
      eyebrow: "Transparency",
      title: "Risks and mitigations",
      items: [
        {
          risk: "Long sales cycle in utilities",
          mit: "Entry through rural cooperatives (fast decisions) + paid pilot.",
        },
        {
          risk: "Competition from traditional AMI",
          mit: "5x lower cost and 30-min deployment vs. years. Window before mass roll-outs.",
        },
        {
          risk: "SEC regulatory dependency",
          mit: "Certifications underway. Regulatory advisor already on the team.",
        },
        {
          risk: "Hardware in the field",
          mit: "Proven industrial components, OTA updates, warranty and replacement included.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Request the full pitch deck",
      description:
        "Leave us your details and we'll send the complete deck, up-to-date metrics and schedule a 30-minute call with the founder.",
      angelNote:
        "We also accept smaller checks (USD 5K+) from angel investors in energy or IoT.",
    },
  },
  distributors: {
    docTitle: "Utilities · ElectricAutomaticChile",
    hero: {
      eyebrow: "For electric utilities and cooperatives",
      titleStart: "Reconnect in",
      titleAccent: "seconds",
      titleEnd: ", not days.",
      subtitle:
        "Retrofit IoT device that installs on top of the existing meter. Cuts field visits, improves SEC indicators and delivers real-time visibility — without replacing your fleet.",
      ctaPrimary: "Schedule a demo",
      ctaSecondary: "See estimated ROI",
    },
    pains: {
      eyebrow: "Today",
      title: "The pain you already know",
      items: [
        {
          title: "Field crews on the road every day",
          text: "Manual reconnects after overdue payments, disconnects, monthly readings. High and growing logistics cost.",
        },
        {
          title: "SEC complaints over response times",
          text: "24–48h reconnect times trigger fines, escalations and reputational damage.",
        },
        {
          title: "No real-time visibility",
          text: "Monthly readings with manual errors, anomalies detected late, fraud hard to identify.",
        },
      ],
    },
    how: {
      eyebrow: "Solution",
      title: "How it works",
      steps: [
        {
          title: "Retrofit install in 30 minutes",
          text: "Mounts on top of the existing meter. No hardware swap, no service interruption.",
        },
        {
          title: "Automated readings every 30s",
          text: "Consumption and status data in real time, synced to your platform or ours.",
        },
        {
          title: "Remote disconnect and reconnect",
          text: "Action commanded from the dashboard. Zero field visits for routine operations.",
        },
        {
          title: "AI alerts",
          text: "Automatic detection of fraud, theft, consumption anomalies and outages.",
        },
      ],
    },
    beforeAfter: {
      eyebrow: "Operational impact",
      title: "Before vs. after",
      headers: ["Process", "Before", "After"],
      rows: [
        {
          label: "Service reconnect",
          before: "24–48 hours, field crew",
          after: "Seconds, remote command",
        },
        {
          label: "Consumption reading",
          before: "Monthly, manual, with errors",
          after: "Every 30 seconds, automatic",
        },
        {
          label: "End-customer visibility",
          before: "Bill once a month",
          after: "Mobile app with live consumption",
        },
        {
          label: "Billing",
          before: "Late and disputed",
          after: "Accurate data, no disputes",
        },
        {
          label: "Anomaly detection",
          before: "Reactive, days later",
          after: "Proactive with AI alerts",
        },
      ],
    },
    roi: {
      eyebrow: "Simulation",
      title: "ROI calculator",
      fields: {
        meters: "Number of meters to instrument",
        crewCost: "Average crew cost per visit (CLP)",
        repos: "Manual reconnects / disconnects per month",
        device: "Price per device (USD)",
      },
      result: {
        title: "Estimated result",
        annualSavings: "Estimated annual savings",
        investment: "Initial investment",
        payback: "Payback",
        paybackUnit: "months",
        disclaimer:
          "* Reference estimate: 85% reduction in field visits and CLP 950/USD exchange rate. Actual values are tuned to each contract.",
      },
    },
    pricing: {
      eyebrow: "Commercial",
      title: "Packages and pricing",
      mostPopular: "Most popular",
      setupLabel: "Setup",
      recurringLabel: "Recurring",
      requestCta: "Request this plan",
      footnote:
        "Reference pricing. Adjusted by volume, connectivity and required integration depth.",
      packages: [
        {
          name: "Pilot",
          units: "250 devices",
          setup: "USD 2,500",
          monthly: "USD 1,000 / month",
          features: [
            "Hardware + installation included",
            "Web dashboard + mobile apps",
            "Dedicated technical support",
            "Monthly reports",
          ],
          highlight: false,
        },
        {
          name: "Standard",
          units: "2,000 devices",
          setup: "USD 8,000",
          monthly: "USD 6,000 / month",
          features: [
            "Everything in Pilot",
            "API integration with your systems",
            "Custom AI alerts",
            "99.5% SLA",
          ],
          highlight: true,
        },
        {
          name: "Scale",
          units: "10,000+ devices",
          setup: "Custom",
          monthly: "From USD 20,000 / month",
          features: [
            "Everything in Standard",
            "Phased rollout",
            "Dedicated on-site team",
            "99.9% SLA + 24/7 support",
          ],
          highlight: false,
        },
      ],
    },
    specs: {
      eyebrow: "Product",
      title: "Technical specifications",
      items: [
        {
          title: "Hardware",
          text: "Dual-core ESP32, 4G LTE Cat-1 modem, CT current sensor, industrial relay for disconnect/reconnect, IP65 enclosure, parasitic line-powered supply.",
        },
        {
          title: "Connectivity",
          text: "Multi-operator 4G LTE with managed SIM. 2G fallback where the market requires it. Local buffer up to 30 days without network.",
        },
        {
          title: "Certifications",
          text: "SEC and SUBTEL in process. RoHS and CE compliance on hardware. Regulatory documentation delivered with each rollout.",
        },
        {
          title: "Integration",
          text: "Documented REST API (OpenAPI), event webhooks, CSV/Parquet exports. Sample connectors for SAP IS-U and proprietary MDMs.",
        },
        {
          title: "Security",
          text: "End-to-end TLS 1.3, signed firmware, secure OTA updates, role-based access control and full audit log.",
        },
      ],
    },
    useCases: {
      eyebrow: "Who we serve",
      title: "Use cases",
      items: [
        {
          title: "Rural cooperatives",
          text: "Fast decision-making, high logistics pain due to geographic dispersion. Ideal entry point to validate in the field.",
        },
        {
          title: "Mid-size utilities",
          text: "250–2,000 unit pilots in critical zones with high default rates or SEC complaints.",
        },
        {
          title: "Large utilities",
          text: "Phased rollout after a successful pilot. Deep integration with existing systems.",
        },
      ],
    },
    architecture: {
      eyebrow: "Technology",
      title: "Cloud architecture",
      items: [
        {
          title: "Production AWS",
          text: "Stack deployed on AWS with autoscaling. Multi-AZ for high availability.",
        },
        {
          title: "Durable data",
          text: "Time series in optimized stores. Configurable retention, native export.",
        },
        {
          title: "SLA",
          text: "99.5% on Standard, 99.9% on Scale with 24/7 monitoring and dedicated support.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        { q: "Does it replace the existing meter?", a: "No. It mounts on top of the current meter without altering its operation or regulated billing. The reading runs in parallel." },
        { q: "What happens if 4G connection is lost?", a: "The device stores readings locally and syncs them when signal returns. No data is lost." },
        { q: "Is it SEC-compliant?", a: "SEC and SUBTEL certifications are in progress. Pilot operations run within the existing framework and adapt to each utility." },
        { q: "How does it integrate with SAP or other internal systems?", a: "Through a documented REST API. We support webhooks, periodic exports and connectors for the most common systems (SAP, Oracle, proprietary MDMs)." },
        { q: "How long does a 2,000-unit rollout take?", a: "Roughly 6 to 10 weeks, including logistics coordination and crews. Larger rollouts run in phases." },
        { q: "Who owns the data?", a: "The utility. Data is stored on AWS infrastructure and accessible via API and export." },
        { q: "What warranty do the devices have?", a: "2-year warranty against manufacturing defects, replacement included. Industrial-grade outdoor IP65 components." },
      ],
    },
    contact: {
      eyebrow: "Commercial contact",
      title: "Schedule a technical demo",
      description:
        "We'll show you the device live, the dashboard in operation, and model the specific ROI for your meter fleet. Estimated time: 45 minutes.",
    },
  },
  forms: {
    common: {
      required: "*",
      sending: "Sending…",
      replyNote: "We'll get back to you within 48 business hours. Your data is only used for this contact.",
      errors: {
        nameMin: "Enter your name",
        emailInvalid: "Invalid email",
        organizationRequired: "Tell us the utility name",
      },
    },
    investor: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@fund.com",
      orgLabel: "Fund / company",
      orgPlaceholder: "Acme Ventures",
      ticketLabel: "Estimated ticket",
      ticketPlaceholder: "Pick a range",
      ticketOptions: [
        "USD 5K – 10K",
        "USD 10K – 25K",
        "USD 25K – 50K",
        "USD 50K – 80K (lead)",
        "I just want to learn about the opportunity",
      ],
      messageLabel: "Message",
      messagePlaceholder:
        "Tell us briefly your thesis or what interests you about ElectricAutomaticChile.",
      submit: "Request the full pitch deck",
      errorTitle: "We couldn't send your message",
      errorDescription: "Please try again or write to us by email.",
    },
    distributor: {
      nameLabel: "Name",
      roleLabel: "Role",
      rolePlaceholder: "Operations Manager",
      orgLabel: "Utility",
      emailLabel: "Corporate email",
      metersLabel: "Approx. number of meters",
      metersPlaceholder: "Pick a range",
      metersOptions: [
        "Under 1,000",
        "1,000 – 10,000",
        "10,000 – 100,000",
        "Over 100,000",
      ],
      messageLabel: "Message",
      messagePlaceholder:
        "Tell us which operational problem you'd like to solve first.",
      submit: "Schedule technical demo",
      replyNote: "We'll set up a demo within 48 business hours.",
      errorTitle: "We couldn't send your request",
      errorDescription: "Please try again or write to us by email.",
    },
  },
  auth: {
    docTitle: "Sign in · ElectricAutomaticChile",
    cardTitle: "Dashboard access",
    cardDescription:
      "Authorized personnel only. The first registered user gets the admin role.",
    tabs: { signIn: "Sign in", signUp: "Sign up" },
    emailLabel: "Email",
    passwordLabel: "Password",
    signInBusy: "Signing in…",
    signUpBusy: "Creating…",
    signInCta: "Sign in",
    signUpCta: "Sign up",
    invalidTitle: "Invalid input",
    accountCreated: "Account created",
    accountCreatedDescription: "Signing in…",
    failureTitle: "We couldn't complete the action",
    unexpectedError: "Unexpected error",
    passwordMin: "Minimum 8 characters",
  },
  admin: {
    docTitle: "Dashboard · ElectricAutomaticChile",
    title: "Leads dashboard",
    sessionLabel: "Session",
    refresh: "Refresh",
    logout: "Sign out",
    loading: "Loading…",
    accessDeniedTitle: "Access restricted",
    accessDeniedDescription: "Your account doesn't have admin permissions.",
    stats: {
      total: "Total",
      investors: "Investors",
      distributors: "Utilities",
      newUncontacted: "New, not contacted",
    },
    filters: {
      title: "Filters",
      searchPlaceholder: "Search by name, email, organization…",
      typeAll: "All types",
      typeInvestor: "Investor",
      typeDistributor: "Utility",
      statusAll: "All statuses",
      from: "From",
      to: "To",
    },
    status: {
      new: "New",
      contacted: "Contacted",
      qualified: "Qualified",
      discarded: "Discarded",
    },
    types: {
      investor: "Investor",
      distributor: "Utility",
    },
    table: {
      date: "Date",
      type: "Type",
      name: "Name",
      email: "Email",
      organization: "Organization",
      message: "Message",
      status: "Status",
      empty: "No results match the current filters.",
    },
    pagination: {
      showing: "Showing",
      of: "of",
      filteredLeads: "filtered leads",
      perPage: "Per page",
      loadMore: "Load more",
      loading: "Loading…",
      noMore: "No more results",
    },
    export: {
      csv: "CSV",
      pdf: "PDF",
      pdfTitle: "ElectricAutomaticChile — Leads",
      generated: "Generated",
      typeLabel: "Type",
      statusLabel: "Status",
      fromLabel: "From",
      toLabel: "To",
      searchLabel: "Search",
      resultsLabel: "Results",
      pageOf: "Page {n} of {total}",
      csvDoneTitle: "CSV generated",
      pdfDoneTitle: "PDF generated",
      doneDescription: "{count} records exported.",
      errorTitle: "Export error",
    },
    update: {
      errorTitle: "Couldn't update",
    },
    fetchError: "Error loading leads",
    locale: "en-US",
  },
};