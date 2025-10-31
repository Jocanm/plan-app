# Internacionalización (i18n) Routing - next-intl

Este documento explica la estrategia de internacionalización de la aplicación usando `next-intl` y la migración de cookie-based a URL-based routing.

---

## 📋 Tabla de Contenidos

1. [Arquitectura Actual (Cookie-based)](#arquitectura-actual-cookie-based)
2. [Arquitectura Objetivo (URL-based)](#arquitectura-objetivo-url-based)
3. [Componentes Clave](#componentes-clave)
4. [Estrategias de localePrefix](#estrategias-de-localeprefix)
5. [Migración Paso a Paso](#migración-paso-a-paso)
6. [Consideraciones Especiales](#consideraciones-especiales)
7. [Best Practices](#best-practices)

---

## Arquitectura Actual (Cookie-based)

### ❌ Problemas con la Implementación Actual

```typescript
// src/i18n/request.ts (ACTUAL)
export default getRequestConfig(async () => {
  const cookieStore = await cookies(); // ⚠️ Dynamic API
  const cookieLocale =
    cookieStore.get(LOCALE_COOKIE_KEY)?.value ?? DEFAULT_LOCALE;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
```

**Consecuencias**:

- ❌ **Layout completamente dinámico** - No puede pre-renderizarse en build time
- ❌ **Requiere `<Suspense>` wrapper** - Con `cacheComponents: true` habilitado
- ❌ **Performance degradada** - Cada request ejecuta el layout completo
- ❌ **SEO subóptimo** - URLs no únicas por idioma (`/dashboard` para todos)
- ❌ **Arquitectura compleja** - Necesita `RootLayoutContent` separado

### Flujo Actual:

```
Usuario visita /dashboard
  ↓
Middleware lee cookie 'locale'
  ↓
await cookies() en layout (Dynamic)
  ↓
Layout renderizado en request time (ƒ)
  ↓
Todo el árbol de componentes es dinámico
```

---

## Arquitectura Objetivo (URL-based)

### ✅ Solución: [locale] Segment + generateStaticParams

```typescript
// Estructura:
src/app/
├── layout.tsx                 // Root layout (minimalista)
└── [locale]/
    ├── layout.tsx             // Locale layout (con params)
    ├── page.tsx
    └── dashboard/
        └── page.tsx
```

**Ventajas**:

- ✅ **Layout estático** - Pre-renderizado en build time
- ✅ **No necesita Suspense** - `await params` es estático con `generateStaticParams`
- ✅ **Mejor performance** - HTML estático servido desde CDN
- ✅ **SEO mejorado** - URLs únicas: `/en/dashboard`, `/es/dashboard`
- ✅ **Arquitectura más simple** - Un solo layout, sin wrappers

### Flujo Objetivo:

```
Build time:
  ↓
generateStaticParams() → ['en', 'es']
  ↓
Pre-renderiza /en/dashboard (○ Static)
Pre-renderiza /es/dashboard (○ Static)
  ↓
Usuario visita /dashboard
  ↓
Middleware detecta locale → redirige a /en/dashboard
  ↓
CDN sirve HTML estático (○)
```

---

## Componentes Clave

### 1. `src/i18n/routing.ts` - Configuración Central

```typescript
import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, locales } from "../features/i18n/domain/constants";

export const routing = defineRouting({
  locales: locales, // ['en', 'es']
  defaultLocale: DEFAULT_LOCALE, // 'en'

  // ⚡ Estrategia de prefijo (ver sección siguiente)
  localePrefix: "always", // Siempre incluye /en o /es
});
```

**Opciones disponibles**:

- `locales`: Array de locales soportados
- `defaultLocale`: Locale por defecto
- `localePrefix`: Estrategia de URL (ver siguiente sección)
- `pathnames`: Rutas localizadas (ej: `/about` → `/es/acerca-de`)
- `domains`: Routing basado en dominio (ej: `us.example.com` → `en-US`)

---

### 2. `src/i18n/request.ts` - Request Configuration

#### ❌ Actual (Cookie-based):

```typescript
export default getRequestConfig(async () => {
  const cookieStore = await cookies(); // ⚠️ Dynamic
  const cookieLocale =
    cookieStore.get(LOCALE_COOKIE_KEY)?.value ?? DEFAULT_LOCALE;

  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}.json`)).default,
  };
});
```

#### ✅ Objetivo (URL-based):

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale viene de [locale] segment
  let locale = await requestLocale;

  // Valida y fallback al default
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Cambio clave**: `requestLocale` viene del **URL param `[locale]`**, no de cookies.

---

### 3. Middleware - Detección y Redirección

```typescript
// src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excluye API routes, assets, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

**Lo que hace el middleware**:

1. **Detecta locale preferido** del usuario:
   - Cookie `NEXT_LOCALE` (si existe)
   - Header `Accept-Language`
   - Locale por defecto
2. **Redirige automáticamente**:
   - `/dashboard` → `/en/dashboard` (para usuarios con locale `en`)
   - `/dashboard` → `/es/dashboard` (para usuarios con locale `es`)
3. **Guarda preferencia** en cookie para próximas visitas

---

### 4. Root Layout vs Locale Layout

#### Root Layout (minimalista):

```typescript
// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

**Nota**: No tiene `lang`, no accede a cookies, completamente estático.

---

#### Locale Layout (con params):

```typescript
// src/app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales } from "@/features/i18n/domain/constants";

type Locale = (typeof locales)[number];

// ⚡ CLAVE: Pre-genera en/es en build time
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ⚡ Metadata localizada
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      languages: {
        en: `/en`,
        es: `/es`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Valida locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Puntos clave**:

- ✅ `await params` es **estático** porque `generateStaticParams` pre-genera `['en', 'es']`
- ✅ `<html lang={locale}>` dinámico pero estático (paradoja: valor viene de params estáticos)
- ✅ No necesita `<Suspense>` porque no hay cache miss

---

## Estrategias de localePrefix

### 1. `always` (Recomendado para esta app)

```typescript
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always", // ← SIEMPRE incluye locale
});
```

**Resultado**:

- `/en/dashboard` (default locale)
- `/es/dashboard` (otros locales)
- `/dashboard` → redirige a `/en/dashboard` o `/es/dashboard`

**Ventajas**:

- ✅ URLs explícitas y consistentes
- ✅ Mejor para SEO (URLs únicas)
- ✅ Más fácil de cachear en CDN

---

### 2. `as-needed`

```typescript
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed", // ← Omite default locale
});
```

**Resultado**:

- `/dashboard` (default locale `en`)
- `/es/dashboard` (otros locales)

**Ventajas**:

- ✅ URLs más limpias para locale principal
- ⚠️ Puede confundir usuarios (¿qué idioma es `/dashboard`?)

---

### 3. `never` (No recomendado sin dominio)

```typescript
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "never", // ← Nunca incluye locale en URL
});
```

**Resultado**:

- `/dashboard` (para todos los locales)

**Uso**:

- Solo con **domain-based routing** (`us.example.com` → `en`, `es.example.com` → `es`)
- O con **cookie/header detection** (pero pierde beneficio de static rendering)

---

## Migración Paso a Paso

### Paso 1: Actualizar `src/i18n/request.ts`

```diff
import { getRequestConfig } from "next-intl/server";
- import { cookies } from "next/headers";
import {
  DEFAULT_LOCALE,
-  LOCALE_COOKIE_KEY,
} from "../features/i18n/domain/constants";
- import { isLocaleValid } from "../features/i18n/domain/validations";
+ import { routing } from "./routing";

- export default getRequestConfig(async () => {
+ export default getRequestConfig(async ({ requestLocale }) => {
-   const cookieStore = await cookies();
-   const cookieLocale = cookieStore.get(LOCALE_COOKIE_KEY)?.value ?? DEFAULT_LOCALE;
+   let locale = await requestLocale;

-   const validLocale = isLocaleValid(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;
+   if (!locale || !routing.locales.includes(locale as any)) {
+     locale = routing.defaultLocale;
+   }

  return {
-     locale: validLocale,
+     locale,
-     messages: (await import(`../../messages/${validLocale}.json`)).default,
+     messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

---

### Paso 2: Crear `src/app/[locale]/layout.tsx`

Ver código completo en sección [Locale Layout](#locale-layout-con-params).

---

### Paso 3: Actualizar Root Layout

```diff
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
-     <Suspense>
-       <RootLayoutContent cookies={cookies()}>{children}</RootLayoutContent>
-     </Suspense>
+     <html suppressHydrationWarning>
+       <body>{children}</body>
+     </html>
  );
}
```

---

### Paso 4: Mover Rutas a `[locale]`

```bash
# Estructura antes:
src/app/
├── layout.tsx
├── page.tsx
├── dashboard/
│   ├── layout.tsx
│   └── page.tsx

# Estructura después:
src/app/
├── layout.tsx                 # Root (minimalista)
└── [locale]/
    ├── layout.tsx             # Locale layout
    ├── page.tsx               # ← MOVIDO
    └── dashboard/             # ← MOVIDO
        ├── layout.tsx
        └── page.tsx
```

**Comando**:

```bash
mkdir -p src/app/[locale]
mv src/app/page.tsx src/app/[locale]/
mv src/app/dashboard src/app/[locale]/
# ... mover otras rutas
```

---

### Paso 5: Actualizar Middleware

```typescript
// src/middleware.ts (ANTES: proxy.ts con auth)
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

**Si necesitas auth + i18n**:

```typescript
import { auth } from "@/lib/auth";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default auth(req => {
  // 1. Maneja i18n primero
  const intlResponse = intlMiddleware(req);

  // 2. Luego maneja auth
  const isLoggedIn = !!req.auth?.user;
  const pathname = req.nextUrl.pathname;

  // Tu lógica de auth...

  return intlResponse || NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

### Paso 6: Crear Navigation Helpers

```typescript
// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**Uso en componentes**:

```typescript
// Antes:
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Después:
import { Link, useRouter } from '@/i18n/navigation';

// El Link automáticamente incluye locale:
<Link href="/dashboard">Dashboard</Link>
// Renderiza: <a href="/en/dashboard"> o <a href="/es/dashboard">
```

---

### Paso 7: Eliminar Código Viejo

Archivos a eliminar:

- ✅ `src/shared/components/ui/layouts/RootLayoutContent.tsx`
- ✅ Lógica de cookies en `proxy.ts` (si solo era para i18n)

Código a actualizar:

- ✅ Todos los `import Link from 'next/link'` → `import { Link } from '@/i18n/navigation'`
- ✅ Todos los `useRouter` de next → `useRouter` de `@/i18n/navigation`

---

### Paso 8: Verificar Build

```bash
npm run build
```

**Resultado esperado**:

```
Route (app)
├ ○ /en                        ← ESTÁTICO ○
├ ○ /en/dashboard              ← ESTÁTICO ○
├ ○ /en/dashboard/[projectId]  ← PPR (partial) ◐
├ ○ /es                        ← ESTÁTICO ○
├ ○ /es/dashboard              ← ESTÁTICO ○
├ ○ /es/dashboard/[projectId]  ← PPR (partial) ◐
```

**Si ves `ƒ` (dynamic) en vez de `○` (static)**:

- ❌ Falta `generateStaticParams` en layout
- ❌ Estás usando `cookies()` o `headers()` sin `use cache`
- ❌ Tienes `await params` pero el valor no está en `generateStaticParams`

---

## Consideraciones Especiales

### 1. Static Rendering con `setRequestLocale`

Si usas Server Components con `useTranslations`, necesitas `setRequestLocale`:

```typescript
// src/app/[locale]/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // ⚡ Habilita static rendering
  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return <h1>{t('title')}</h1>;
}
```

**Regla**: Llama `setRequestLocale` en **cada layout y page** que use `useTranslations`.

---

### 2. Metadata Localizada

```typescript
// src/app/[locale]/layout.tsx
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      locale: locale,
    },
    alternates: {
      canonical: `/`,
      languages: {
        en: `/en`,
        es: `/es`,
      },
    },
  };
}
```

---

### 3. 404 Localizado

```typescript
// src/app/[locale]/not-found.tsx
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

**Catch-all para rutas desconocidas**:

```typescript
// src/app/[locale]/[...rest]/page.tsx
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}
```

---

### 4. Cambio de Idioma en Cliente

```typescript
// src/components/LanguageSwitcher.tsx
'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { locales } from '@/features/i18n/domain/constants';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select onChange={(e) => switchLocale(e.target.value)}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

---

### 5. Rutas Localizadas (Pathnames)

Si quieres diferentes URLs por idioma:

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",

  pathnames: {
    "/": "/",
    "/dashboard": "/dashboard",
    "/about": {
      en: "/about",
      es: "/acerca-de",
    },
    "/news/[slug]": {
      en: "/news/[slug]",
      es: "/noticias/[slug]",
    },
  },
});
```

**Resultado**:

- EN: `/en/about` → renderiza `app/[locale]/about/page.tsx`
- ES: `/es/acerca-de` → renderiza `app/[locale]/about/page.tsx` (mismo archivo!)

---

## Best Practices

### 1. Cuándo usar cada estrategia

| Caso de Uso                       | localePrefix      | Razón                                |
| --------------------------------- | ----------------- | ------------------------------------ |
| **Sitio multiidioma estándar**    | `always`          | URLs explícitas, mejor SEO           |
| **Inglés como principal + otros** | `as-needed`       | URLs limpias para principal          |
| **Múltiples dominios**            | `never` + domains | `us.example.com` vs `es.example.com` |
| **Single-page app**               | `always`          | Consistencia                         |

---

### 2. Performance

**Static Generation (○)**:

- Pre-renderiza todas las páginas en build time
- CDN sirve HTML instantáneamente
- **Tiempo de respuesta**: 5-20ms

**Server-Side Rendering (ƒ)**:

- Renderiza en cada request
- No cacheable en CDN
- **Tiempo de respuesta**: 100-500ms

**Objetivo**: Maximizar páginas estáticas (○).

---

### 3. SEO

✅ **Buenas prácticas**:

- Usa `localePrefix: 'always'` para URLs únicas
- Implementa `alternates.languages` en metadata
- Agrega `hreflang` tags para Google

```typescript
export async function generateMetadata() {
  return {
    alternates: {
      canonical: `https://example.com/${locale}`,
      languages: {
        en: "https://example.com/en",
        es: "https://example.com/es",
        "x-default": "https://example.com/en",
      },
    },
  };
}
```

---

### 4. Testing

**Test checklist**:

- [ ] `/` redirige a `/en` o `/es` según `Accept-Language`
- [ ] `/en/dashboard` renderiza correctamente
- [ ] `/es/dashboard` renderiza con textos en español
- [ ] Cambiar idioma con switcher funciona
- [ ] Cookie `NEXT_LOCALE` se guarda correctamente
- [ ] Build genera rutas estáticas (○)
- [ ] Metadata está localizada
- [ ] 404 localizado funciona (`/en/nonexistent` → 404 en inglés)

---

## 🎯 Checklist Final

Antes de considerar la migración completa:

- [ ] `generateStaticParams` en `[locale]/layout.tsx`
- [ ] `src/i18n/request.ts` usa `requestLocale` (no cookies)
- [ ] Middleware configurado con `createMiddleware`
- [ ] Todas las rutas movidas a `[locale]/`
- [ ] Navigation helpers creados (`Link`, `useRouter`, etc.)
- [ ] Código viejo eliminado (`RootLayoutContent`)
- [ ] Build exitoso con rutas estáticas (○)
- [ ] Tests pasando

---

## 📚 Referencias

- [next-intl Routing Setup](https://next-intl.dev/docs/routing/setup)
- [next-intl Configuration](https://next-intl.dev/docs/routing/configuration)
- [Next.js i18n Routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)

---

**Creado**: 2025-01-24
**Versión**: 1.0
**Autor**: José Angarita (con ayuda de Claude Code)
