# Landing Inversion

Landing Vite/React para captar inversionistas y distribuidores de
ElectricAutomaticChile.

La landing no usa Supabase. Los formularios llaman al backend Go y el backend
persiste los leads en MongoDB.

## Requisitos

- Node.js 20 o superior.
- npm 10 o superior.
- Backend `electric-backend` disponible.

## Variables

Cliente Vite:

```env
VITE_API_URL=http://localhost:4000
VITE_TURNSTILE_SITE_KEY=
```

Backend:

```env
MONGODB_URI=mongodb://localhost:27017/electricautomaticchile
MONGODB_DATABASE=electricautomaticchile
TURNSTILE_SECRET_KEY=
CORS_ORIGINS=http://localhost:8080,https://electricautomaticchile.com
AUTH_COOKIE_DOMAIN=
```

`VITE_TURNSTILE_SITE_KEY` activa el widget de Cloudflare Turnstile en el
cliente. `TURNSTILE_SECRET_KEY` activa la verificacion en el backend. Si el
secret no esta configurado, el backend acepta leads sin Turnstile para
desarrollo local.

## Desarrollo

```bash
npm install
npm run dev
```

Vite usa el puerto `8080` en desarrollo.

Checks locales:

```bash
npm run test
npm run lint
npm run build
```

Preview de build:

```bash
npm run preview
```

## Flujo de leads

Los formularios publicos usan:

```text
POST /api/leads
```

El backend valida los datos, verifica Turnstile cuando corresponde y guarda en
la coleccion MongoDB `leads`.

El panel `/admin` usa sesion por cookie del backend:

```text
POST /api/auth/login/empresa
GET /api/auth/me
GET /api/leads
PUT /api/leads/:id/status
```

## Produccion

- Configurar `VITE_API_URL` con la URL publica del backend.
- Configurar `CORS_ORIGINS` con el dominio real de la landing.
- Si backend y landing viven en subdominios distintos, usar
  `AUTH_COOKIE_DOMAIN=.electricautomaticchile.com`.
- No definir variables `VITE_SUPABASE_*`; la landing ya no depende de Supabase.
- Ejecutar `npm run build` antes de publicar.
