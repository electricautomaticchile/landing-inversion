
# ElectricAutomaticChile — Dos landings con home selector

Sitio en español (estructura preparada para inglés en una segunda fase) con identidad visual basada en el logo: bombilla naranja sobre circuitos, fondo claro, acentos en naranja vibrante (#F59E0B / ámbar) y gris carbón para texto. Tipografía moderna sans-serif, mucho whitespace, estilo "deep-tech serio pero accesible".

## Rutas

- `/` — **Home selector**: hero corto con logo, tagline ("Convertimos medidores tradicionales en medidores inteligentes"), y dos cards grandes que dirigen a cada audiencia (Inversores / Distribuidoras). Footer común.
- `/inversores` — landing para captar capital.
- `/distribuidoras` — landing para captar clientes B2B.
- `/gracias` — confirmación tras enviar formulario.

Navegación superior compartida (logo + cambio de audiencia + idioma ES placeholder).

## Landing /inversores

Pensada para que un inversor en 90 segundos entienda oportunidad, tracción y ask.

1. **Hero** — "Buscamos $50–80K USD para escalar la red eléctrica inteligente de Chile". Subtítulo con elevator pitch. Botones: "Solicitar pitch deck" (scroll a form) + "Hablar con el fundador".
2. **El problema cuantificado** — 3 stats: $3.4M USD/año desperdicia solo Chilquinta · 89.000 reposiciones manuales/año · 24-48h tiempo promedio de reposición.
3. **La solución en una frase + diagrama simple** — retrofit no invasivo vs. AMI tradicional. Comparativa visual: AMI $200-500/medidor y 3-5 años vs. nosotros $37-150 e instalación en 30 min.
4. **Tracción técnica** — chips/badges: Hardware ESP32+4G ✅ · Backend Go (22 APIs) ✅ · Frontend Next.js ✅ · Apps Flutter ✅ · AWS productivo ✅ · IA integrada ✅. Mensaje: "MVP completo, no slideware".
5. **Mercado y oportunidad** — TAM/SAM/SOM: 5M+ medidores Chile, expansión LATAM (Brasil, Colombia, Perú, México). Mapa o ilustración simple.
6. **Unit economics** — tabla limpia con costo por dispositivo (250 / 1.000 / 10.000 uds), pricing de paquetes, márgenes proyectados, MRR objetivo año 2 (~$37K USD).
7. **La ronda** — qué pedimos ($50-80K pre-semilla), uso de fondos (donut: certificaciones / piloto 250 disp. / equipo comercial / GTM), milestones a 12 meses, posicionamiento para Serie A $500K-1M.
8. **Por qué ahora** — ventana AMI cerrándose, presión SEC, founder con sistema ya en producción.
9. **Roadmap visual 12 meses** — timeline horizontal de fases.
10. **Riesgos y mitigaciones** — sección de transparencia (3-4 riesgos con mitigación), refuerza credibilidad.
11. **Formulario "Solicitar pitch deck completo"** — nombre, email, fondo/empresa, ticket estimado (select), mensaje. Guarda en base + envía email al fundador y confirmación al inversor.
12. **Footer** — contacto directo, logo, links.

## Landing /distribuidoras

Pensada para gerente de operaciones / innovación de una distribuidora eléctrica.

1. **Hero** — "Reposición de suministro en segundos, no en días". Sub: "Dispositivo IoT retrofit que se instala sobre el medidor existente sin reemplazarlo". CTA: "Agendar demo" + "Ver ROI estimado".
2. **El dolor que conocen** — bullets con el costo logístico actual: cuadrillas en terreno, reclamos SEC, lectura manual con errores, sin visibilidad en tiempo real.
3. **Cómo funciona en 4 pasos** — instalación 30 min → lectura cada 30s → corte/reposición remota → alertas IA. Iconografía clara.
4. **Tabla "Antes vs. Después"** — la del PDF (5 filas: reposición, lectura, visibilidad cliente, facturación, anomalías).
5. **Calculadora de ROI** — inputs: nº de medidores morosos, costo promedio cuadrilla, reposiciones/mes. Output: ahorro anual estimado + payback en meses. Interactiva sin backend.
6. **Paquetes y pricing** — 3 cards (Piloto 250 / Estándar 2.000 / Escala 10.000+) con setup fee, fee mensual, qué incluye.
7. **Especificaciones técnicas** — acordeón con: hardware (ESP32, 4G, sensor corriente), conectividad, certificaciones SEC/SUBTEL en proceso, integración con sistemas existentes (API REST), seguridad.
8. **Casos de uso** — cooperativas rurales (entrada rápida), distribuidoras medianas (piloto), grandes (escala post-piloto).
9. **Arquitectura cloud** — diagrama simple AWS, énfasis en escalabilidad y SLA.
10. **FAQ** — 6-8 preguntas: ¿reemplaza el medidor? ¿qué pasa si pierde 4G? ¿cumple normativa SEC? ¿cómo se integra con SAP/sistemas actuales? ¿tiempos de despliegue?
11. **Formulario "Agendar demo técnica"** — nombre, cargo, distribuidora, email corporativo, nº aprox. de medidores, mensaje. Guarda en base + email al fundador.
12. **Footer** — igual al resto.

## Backend (Lovable Cloud)

- Tabla `leads` con columnas: id, tipo (`investor` | `distributor`), nombre, email, organización, datos extra (JSONB), creado_en. RLS con insert público, select solo para rol admin (preparado para futuro panel).
- Edge function que recibe el lead, lo guarda y dispara dos correos vía Lovable Email: notificación al fundador y confirmación a quien contactó.
- Requiere configurar dominio de email (te pediré hacerlo durante implementación).

## Diseño y assets

- Paleta: blanco/crema base (#FCFBF8), texto carbón (#1A1A1A), naranja primario (~#F59E0B), naranja oscuro hover, gris suaves para superficies. Todo definido como tokens HSL en `index.css` y `tailwind.config.ts`.
- Logo subido se guarda en `src/assets/logo.png` y se usa en navbar y footer.
- Componentes shadcn ya instalados (Card, Accordion, Form, Input, Select, Button, Tabs, Toast).
- Animaciones sutiles (fade-in al hacer scroll, hover en cards). Sin librerías pesadas.
- Mobile-first, totalmente responsive.

## Preparación para inglés (segunda fase)

- Todos los textos centralizados en archivos `src/i18n/es.ts` (y `en.ts` vacío) listos para conectar con un toggle EN/ES más adelante. En esta primera entrega solo se renderiza español; el toggle en navbar queda visible pero deshabilitado con tooltip "Próximamente".

## Fuera de alcance (siguiente iteración)

- Panel admin para ver leads (por ahora se consultan en Lovable Cloud / llegan por email).
- Traducción real al inglés.
- Blog / casos de éxito reales (cuando exista el piloto).
