# Plan de Migración: shadcn/ui + Tailwind CSS 4 + tweakcn

> **Versión**: 1.0
> **Fecha**: 14 Noviembre 2025
> **Objetivo**: Migrar el sistema de diseño actual hacia shadcn/ui, usando Tailwind CSS 4 y habilitando iteración fácil con tweakcn.

---

## 📋 Tabla de Contenido

1. [Estado Actual del Proyecto](#1-estado-actual-del-proyecto)
2. [Visión y Objetivos](#2-visión-y-objetivos)
3. [Plan de Migración Fase por Fase](#3-plan-de-migración-fase-por-fase)
4. [Mapeo de Componentes](#4-mapeo-de-componentes)
5. [Reorganización de Estructura](#5-reorganización-de-estructura)
6. [Decisiones Técnicas Clave](#6-decisiones-técnicas-clave)
7. [Riesgos y Mitigación](#7-riesgos-y-mitigación)
8. [Checklist de Validación](#8-checklist-de-validación)

---

## 1. Estado Actual del Proyecto

### 🔍 Análisis de la Infraestructura Actual

#### Tecnologías Base
- **Framework**: Next.js 16.0.0 con App Router + Turbopack
- **React**: v19.2.0
- **TypeScript**: v5
- **Tailwind CSS**: v4 (✅ ya instalado)
- **PostCSS**: Configurado con `@tailwindcss/postcss`
- **Testing**: Vitest + React Testing Library + Cypress

#### Sistema de Diseño Actual

**Tokens CSS Variables** (`src/app/globals.css`):
- ✅ Ya usa CSS variables con Tailwind 4
- ✅ Ya tiene `@theme` directive para tokens personalizados
- ✅ Sistema de colores completo con semántica shadcn-compatible:
  - `--color-primary`, `--color-secondary`, `--color-destructive`
  - `--color-background`, `--color-foreground`
  - `--color-muted`, `--color-accent`, `--color-card`
  - `--color-border`, `--color-input`, `--color-ring`
- ✅ Dark mode implementado con clase `.dark`
- ✅ Border radius tokens: `--radius-sm/md/lg/xl`

**Componentes UI Existentes** (`src/shared/components/ui/`):
```
src/shared/components/ui/
├── Button.tsx              ✅ Compatible shadcn (usa Radix Slot + cva)
├── Card.tsx                ✅ Compatible shadcn
├── SkipToMainContent.tsx   ✅ Custom (mantener)
├── backgrounds/
│   └── GradientMesh.tsx    ✅ Custom (mantener)
├── calendar/
│   └── sideCalendar/       ⚠️  Custom calendar (evaluar)
├── checkbox/
│   └── Checkbox.tsx        ⚠️  Migrar a shadcn checkbox
├── loaders/
│   └── BaseLoader.tsx      ✅ Custom (mantener)
├── main/
│   └── Main.tsx            ✅ Layout (mantener)
└── sidebar/                ✅ Custom navigation (mantener)
```

**Utilidades**:
- ✅ `src/shared/utils/cn.ts` ya existe (clsx + tailwind-merge)
- ✅ Arquitectura limpia con separación features/shared

#### Dependencias Radix UI Actuales
```json
"@radix-ui/react-checkbox": "^1.3.3",
"@radix-ui/react-slot": "^1.2.3"
```

### 📊 Evaluación de Compatibilidad

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Tailwind CSS 4 | ✅ Instalado | Ya usando nueva sintaxis `@theme` |
| CSS Variables | ✅ Listo | Nomenclatura compatible con shadcn |
| Dark Mode | ✅ Funcional | Implementación clase-based compatible |
| Componentes base | ⚠️ Parcial | Button y Card ya compatibles |
| Path aliases | ✅ Configurados | `@/*`, `@/lib/*`, `@/shared/*` |
| Testing setup | ✅ Completo | Vitest + RTL listo para componentes |

**Conclusión**: El proyecto está en excelente posición para adoptar shadcn/ui. La base de Tailwind 4 y la estructura de tokens ya está alineada. La migración será mayormente incremental.

---

## 2. Visión y Objetivos

### 🎯 Objetivos Principales

1. **Estandarización**: Adoptar shadcn/ui como sistema de diseño base
2. **Iteración rápida**: Habilitar tweakcn para experimentos visuales sin código
3. **Mantener arquitectura limpia**: Componentes shadcn en `src/components/ui/` (convención shadcn)
4. **Backward compatibility**: No romper features existentes durante migración
5. **Testing**: Mantener cobertura de tests durante todo el proceso

### 🎨 Filosofía de Diseño

- **No destruir**: Mantener componentes custom cuando aportan valor único
- **Coexistencia**: shadcn components + custom components trabajando juntos
- **Flexibilidad**: tweakcn como herramienta de exploración, no dictador del diseño
- **Testabilidad**: Cada componente migrado debe tener tests

---

## 3. Plan de Migración Fase por Fase

### 📦 Fase 0: Pre-requisitos y Preparación

**Duración estimada**: 1 hora

#### Tareas:

1. **Instalar shadcn/ui CLI**
   ```bash
   npm install -D shadcn@latest
   ```

2. **Inicializar shadcn/ui**
   ```bash
   npx shadcn@latest init
   ```

   **Configuración recomendada**:
   ```
   ✔ Preflight and base styles? (recommended) … yes
   ✔ Where is your global CSS file? › src/app/globals.css
   ✔ Would you like to use CSS variables for theming? › yes
   ✔ Where is your tailwind.config located? › postcss.config.mjs
   ✔ Configure the import alias for components? › @/components
   ✔ Configure the import alias for utils? › @/lib/utils
   ✔ Write configuration to components.json? › yes
   ```

3. **Crear `components.json`**

   El CLI lo creará automáticamente. Contenido esperado:
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "new-york",
     "rsc": true,
     "tsx": true,
     "tailwind": {
       "config": "postcss.config.mjs",
       "css": "src/app/globals.css",
       "baseColor": "slate",
       "cssVariables": true
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     }
   }
   ```

4. **Crear `src/lib/utils.ts`** (shadcn convention)
   ```typescript
   import { clsx, type ClassValue } from "clsx";
   import { twMerge } from "tailwind-merge";

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs));
   }
   ```

   **Nota**: Ya existe en `src/shared/utils/cn.ts`. Podemos:
   - Opción A: Duplicar en `src/lib/utils.ts` (seguir convención shadcn)
   - Opción B: Re-exportar desde shared

   **Recomendación**: Opción A (evitar confusión con imports)

5. **Backup de componentes actuales**
   ```bash
   mkdir -p src/shared/components/ui-legacy
   cp -r src/shared/components/ui/* src/shared/components/ui-legacy/
   ```

#### ✅ Criterios de Éxito:
- [ ] `shadcn` CLI instalado
- [ ] `components.json` creado y configurado
- [ ] `src/lib/utils.ts` existe
- [ ] Backup de componentes creado
- [ ] No hay errores de build

---

### 📦 Fase 1: Instalación de Componentes Base

**Duración estimada**: 2 horas

#### 1.1 Instalar Componentes Fundamentales

**Componentes a instalar primero** (en orden de dependencia):

```bash
# Primitivos base
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add checkbox
npx shadcn@latest add separator

# Feedback y estados
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add skeleton

# Navegación y overlays
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add popover
npx shadcn@latest add tooltip
```

#### 1.2 Verificar Instalación

**Estructura esperada**:
```
src/components/ui/
├── button.tsx
├── card.tsx
├── input.tsx
├── label.tsx
├── checkbox.tsx
├── separator.tsx
├── badge.tsx
├── alert.tsx
├── skeleton.tsx
├── dropdown-menu.tsx
├── dialog.tsx
├── popover.tsx
└── tooltip.tsx
```

#### 1.3 Ajustar Imports en `globals.css`

**Verificar que `globals.css` mantenga**:
```css
@import "tailwindcss";

@theme {
  /* Tus tokens actuales - NO BORRAR */
  --color-primary: hsl(239, 85%, 67%);
  /* ... resto de tokens ... */
}
```

**⚠️ Advertencia**: shadcn puede intentar sobrescribir tokens. Revisar diff cuidadosamente.

#### ✅ Criterios de Éxito:
- [ ] Componentes shadcn instalados en `src/components/ui/`
- [ ] Build exitoso sin errores TypeScript
- [ ] Tokens CSS custom preservados
- [ ] Dark mode sigue funcionando
- [ ] Tests pasan sin cambios

---

### 📦 Fase 2: Migración de Componentes Existentes

**Duración estimada**: 4-6 horas

#### 2.1 Estrategia de Migración

**Enfoque incremental**: No tocar nada hasta que se valide cada componente.

#### 2.2 Componente por Componente

##### **Button** ✅ (Ya compatible, solo mover)

**Estado actual**: `src/shared/components/ui/Button.tsx`
**Acción**: Comparar con shadcn version, adoptar mejoras

```typescript
// ANTES (actual)
import { cn } from "@/shared/utils/cn";

// DESPUÉS (shadcn convention)
import { cn } from "@/lib/utils";
```

**Tests**: Verificar que todos los tests de Button pasen:
```bash
npm run test -- Button
```

##### **Card** ✅ (Ya compatible, solo mover)

**Estado actual**: `src/shared/components/ui/Card.tsx`
**Acción**: Tu Card actual es casi idéntico a shadcn. Comparar y adoptar versión shadcn si es mejor.

**Tests**:
```bash
npm run test -- Card
```

##### **Checkbox** ⚠️ (Migrar a shadcn)

**Estado actual**: `src/shared/components/ui/checkbox/Checkbox.tsx`
**Acción**: Reemplazar con `npx shadcn@latest add checkbox`

**Proceso**:
1. Identificar todos los usos de Checkbox actual
   ```bash
   grep -r "from.*checkbox.*Checkbox" src/
   ```
2. Instalar shadcn checkbox (si no está)
3. Actualizar imports uno por uno
4. Verificar funcionalidad en cada feature
5. Ejecutar tests:
   ```bash
   npm run test -- Checkbox
   ```

##### **Componentes Custom** ✅ (Mantener)

**NO migrar** (son únicos de tu app):
- `SkipToMainContent.tsx` → Accesibilidad custom
- `GradientMesh.tsx` → Background custom
- `BaseLoader.tsx` → Loader custom
- `Sidebar/*` → Navegación custom (muy específica)
- `SideCalendar/*` → Calendar custom

**Acción**: Mantener en `src/shared/components/ui/` o mover a `src/shared/components/custom/`

#### 2.3 Actualizar Index Exports

**Crear `src/components/ui/index.ts`**:
```typescript
// shadcn components
export * from "./button";
export * from "./card";
export * from "./input";
export * from "./label";
export * from "./checkbox";
export * from "./separator";
export * from "./badge";
export * from "./alert";
export * from "./skeleton";
export * from "./dropdown-menu";
export * from "./dialog";
export * from "./popover";
export * from "./tooltip";
```

**Mantener `src/shared/components/ui/index.ts`** para customs:
```typescript
// Custom components (no shadcn)
export * from "./SkipToMainContent";
export * from "./backgrounds/GradientMesh";
export * from "./loaders/BaseLoader";
export * from "./main/Main";
// ... sidebar, calendar, etc.
```

#### ✅ Criterios de Éxito:
- [ ] Todos los componentes migrados funcionan
- [ ] Todos los tests pasan
- [ ] No hay import errors
- [ ] UI se ve igual (o mejor)
- [ ] Dark mode funciona
- [ ] Accesibilidad mantenida

---

### 📦 Fase 3: Integración con tweakcn

**Duración estimada**: 1-2 horas

#### 3.1 Preparar Proyecto para tweakcn

**tweakcn funciona directamente con shadcn/ui components**. No requiere instalación, es una herramienta web.

#### 3.2 Exportar Tema Actual

1. **Visitar** [tweakcn.com](https://tweakcn.com)
2. **Configurar tema base** con tus colores actuales:
   - Primary: `hsl(239, 85%, 67%)`
   - Background: `hsl(0, 0%, 100%)`
   - Destructive: `hsl(0, 78%, 63%)`
   - ... etc.
3. **Generar CSS** con tweakcn
4. **Copiar variables** generadas a `globals.css`

#### 3.3 Workflow de Iteración

**Proceso recomendado**:
```
1. Experimentar en tweakcn (visual, sin código)
2. Cuando estés conforme, copiar CSS variables
3. Pegar en globals.css
4. Verificar en localhost
5. Commit si apruebas el cambio
```

#### 3.4 Crear Script de Sync (Opcional)

**`scripts/sync-theme.sh`**:
```bash
#!/bin/bash
# Script para aplicar tema de tweakcn

echo "📋 Copiando theme desde clipboard..."
pbpaste > src/app/globals-temp.css

echo "✅ Revisa src/app/globals-temp.css"
echo "Si todo está bien, reemplaza manualmente en globals.css"
```

#### ✅ Criterios de Éxito:
- [ ] Puedes editar tema en tweakcn
- [ ] Puedes exportar CSS desde tweakcn
- [ ] CSS se aplica correctamente en tu app
- [ ] Dark mode se mantiene funcional
- [ ] Workflow de iteración es fluido

---

### 📦 Fase 4: Optimización y Refactorización

**Duración estimada**: 2-4 horas

#### 4.1 Consolidar Estructura de Carpetas

**Estructura final recomendada**:
```
src/
├── components/                    # shadcn/ui components
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (todos los shadcn)
│
├── shared/
│   ├── components/
│   │   ├── custom/               # Componentes únicos de la app
│   │   │   ├── GradientMesh.tsx
│   │   │   ├── BaseLoader.tsx
│   │   │   ├── SkipToMainContent.tsx
│   │   │   └── Sidebar/
│   │   └── layouts/              # Layouts (Main, etc.)
│   │       └── Main.tsx
│   └── utils/
│       └── cn.ts                 # Mantener por backward compat
│
├── lib/
│   ├── utils.ts                  # shadcn convention
│   ├── validations/
│   └── types/
│
└── features/
    ├── projects/
    │   ├── components/           # Feature-specific components
    │   │   ├── ProjectHeader.tsx
    │   │   └── tasks/
    │   ├── actions.ts
    │   └── hooks.ts
    └── ...
```

#### 4.2 Actualizar Path Aliases

**`tsconfig.json`** (añadir si falta):
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/features/*": ["./src/features/*"]
    }
  }
}
```

#### 4.3 Refactor de Imports

**Buscar y reemplazar** (cuidado, hazlo feature por feature):
```typescript
// ANTES
import { Button } from "@/shared/components/ui/Button";

// DESPUÉS
import { Button } from "@/components/ui/button";
```

**Script de ayuda**:
```bash
# Encontrar todos los imports a actualizar
grep -r "from.*@/shared/components/ui" src/features/
```

#### 4.4 Crear Componente Wrapper (Opcional)

**Para componentes que quieras customizar globalmente**:

**Ejemplo** (`src/shared/components/custom/CustomButton.tsx`):
```typescript
import { Button as ShadcnButton, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CustomButton({ className, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={cn("my-custom-styles", className)}
      {...props}
    />
  );
}
```

#### 4.5 Documentar Convenciones

**Crear `docs/COMPONENTS.md`**:
```markdown
# Convenciones de Componentes

## Cuándo usar qué

### `src/components/ui/` (shadcn)
- Componentes de shadcn/ui
- NO modificar directamente (se pueden regenerar)
- Si necesitas customizar, crear wrapper

### `src/shared/components/custom/`
- Componentes únicos de la aplicación
- GradientMesh, Sidebar, etc.
- Mantener con tests

### `src/features/*/components/`
- Componentes específicos de feature
- Pueden usar tanto shadcn como custom
```

#### ✅ Criterios de Éxito:
- [ ] Estructura de carpetas clara y documentada
- [ ] Imports actualizados consistentemente
- [ ] No hay imports rotos
- [ ] Tests pasan al 100%
- [ ] Build sin warnings
- [ ] Documentación creada

---

## 4. Mapeo de Componentes

### 📋 Componentes Actuales → shadcn/ui

| Componente Actual | Ubicación Actual | Acción | shadcn Equivalente | Notas |
|-------------------|------------------|--------|-------------------|-------|
| `Button.tsx` | `src/shared/components/ui/` | ✅ Reemplazar | `button` | Ya compatible, adoptar versión shadcn |
| `Card.tsx` | `src/shared/components/ui/` | ✅ Reemplazar | `card` | Ya compatible, casi idéntico |
| `Checkbox.tsx` | `src/shared/components/ui/checkbox/` | ⚠️ Migrar | `checkbox` | Reemplazar con shadcn |
| `SkipToMainContent.tsx` | `src/shared/components/ui/` | 🔒 Mantener | N/A | Componente de accesibilidad custom |
| `GradientMesh.tsx` | `src/shared/components/ui/backgrounds/` | 🔒 Mantener | N/A | Background custom único |
| `BaseLoader.tsx` | `src/shared/components/ui/loaders/` | 🔒 Mantener | `skeleton` (opcional) | Loader custom, podría complementarse con skeleton |
| `Main.tsx` | `src/shared/components/ui/main/` | 🔒 Mantener | N/A | Layout component |
| `Sidebar/*` | `src/shared/components/ui/sidebar/` | 🔒 Mantener | N/A | Navegación compleja y específica |
| `SideCalendar/*` | `src/shared/components/ui/calendar/` | 🤔 Evaluar | `calendar` | Comparar con shadcn calendar |

### 📦 Nuevos Componentes shadcn a Agregar

**Componentes que no tienes pero podrías necesitar**:

| Componente | Cuándo Usarlo | Prioridad |
|------------|---------------|-----------|
| `input` | Forms (crear tareas, proyectos) | 🔥 Alta |
| `label` | Accesibilidad en forms | 🔥 Alta |
| `dialog` | Modales (confirmar eliminación, etc.) | 🔥 Alta |
| `dropdown-menu` | Menús contextuales | 🔥 Alta |
| `toast` | Notificaciones (éxito, error) | 🔥 Alta |
| `select` | Dropdowns de selección | 🟡 Media |
| `popover` | Info adicional, tooltips | 🟡 Media |
| `tabs` | Organizar contenido | 🟡 Media |
| `accordion` | FAQs, listas colapsables | 🟢 Baja |
| `avatar` | Perfil de usuario | 🟢 Baja |
| `progress` | Barra de progreso de tareas | 🟢 Baja |

**Comando rápido para instalar prioritarios**:
```bash
npx shadcn@latest add input label dialog dropdown-menu toast
```

---

## 5. Reorganización de Estructura

### 📂 Estructura Actual vs Propuesta

#### ANTES (Actual)
```
src/
├── shared/
│   ├── components/
│   │   └── ui/                    # Todo mezclado aquí
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── backgrounds/
│   │       ├── sidebar/
│   │       └── calendar/
│   └── utils/
│       └── cn.ts
│
├── features/
│   └── projects/
│       └── components/
│           └── ProjectHeader.tsx
│
└── app/
    └── globals.css
```

#### DESPUÉS (Propuesta)
```
src/
├── components/                     # 🆕 shadcn/ui exclusivo
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (todos shadcn)
│
├── shared/
│   ├── components/
│   │   ├── custom/                # 🆕 Componentes únicos app
│   │   │   ├── GradientMesh.tsx
│   │   │   ├── BaseLoader.tsx
│   │   │   ├── SkipToMainContent.tsx
│   │   │   ├── Sidebar/
│   │   │   └── Calendar/
│   │   └── layouts/               # 🆕 Layouts
│   │       └── Main.tsx
│   └── utils/
│       └── cn.ts                  # Mantener (backward compat)
│
├── lib/
│   ├── utils.ts                   # 🆕 shadcn convention
│   ├── validations/
│   └── types/
│
├── features/
│   └── projects/
│       ├── components/            # Componentes de feature
│       │   ├── ProjectHeader.tsx
│       │   └── tasks/
│       ├── actions.ts
│       └── hooks.ts
│
└── app/
    └── globals.css
```

### 🎯 Principios de Organización

1. **`src/components/ui/`** → Solo shadcn, no tocar manualmente
2. **`src/shared/components/custom/`** → Componentes reutilizables propios
3. **`src/features/*/components/`** → Componentes específicos de dominio
4. **`src/lib/utils.ts`** → Utilidades shadcn convention
5. **`src/shared/utils/`** → Utilidades propias del proyecto

### 🔄 Script de Migración de Estructura

**`scripts/migrate-structure.sh`**:
```bash
#!/bin/bash

echo "🚀 Migrando estructura de componentes..."

# Crear nuevas carpetas
mkdir -p src/components/ui
mkdir -p src/shared/components/custom
mkdir -p src/shared/components/layouts

# Mover componentes custom
mv src/shared/components/ui/backgrounds src/shared/components/custom/
mv src/shared/components/ui/loaders src/shared/components/custom/
mv src/shared/components/ui/sidebar src/shared/components/custom/
mv src/shared/components/ui/calendar src/shared/components/custom/
mv src/shared/components/ui/SkipToMainContent.tsx src/shared/components/custom/
mv src/shared/components/ui/main/Main.tsx src/shared/components/layouts/

# Crear utils shadcn
cp src/shared/utils/cn.ts src/lib/utils.ts

echo "✅ Estructura migrada. Revisar y actualizar imports manualmente."
```

**⚠️ IMPORTANTE**: Este script es un punto de partida. Debes:
1. Ejecutarlo en una rama separada
2. Revisar cada cambio
3. Actualizar imports manualmente feature por feature
4. Validar tests después de cada feature migrada

---

## 6. Decisiones Técnicas Clave

### 🎨 Theming y Design Tokens

#### Decisión 1: CSS Variables vs Tailwind Config

**✅ Recomendación**: CSS Variables (ya lo tienes)

**Pros**:
- Runtime theming (cambiar tema sin rebuild)
- Compatible con tweakcn
- Mejor para dark mode
- Más flexible

**Contras**:
- Ligeramente menos performante (negligible)

**Implementación actual** (mantener):
```css
@theme {
  --color-primary: hsl(239, 85%, 67%);
  --color-background: hsl(0, 0%, 100%);
  /* ... */
}
```

#### Decisión 2: Dark Mode Strategy

**✅ Recomendación**: Class-based (ya implementado)

**Configuración actual** (mantener):
```css
.dark {
  --color-background: hsl(235, 16%, 15%);
  --color-foreground: hsl(0, 0%, 100%);
  /* ... */
}
```

**Con next-themes** (ya instalado en `package.json`):
```typescript
// app/providers.tsx
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

#### Decisión 3: Border Radius Strategy

**✅ Recomendación**: Tokens CSS (ya los tienes)

**Actual** (mantener y usar):
```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 1rem;      /* 16px */
```

**Uso en componentes**:
```typescript
className="rounded-[var(--radius-lg)]"
```

#### Decisión 4: Typography System

**🤔 Evaluar**: Crear escala tipográfica

**Opción A**: Usar valores Tailwind default
```typescript
<h1 className="text-4xl font-bold">
```

**Opción B**: Crear tokens custom
```css
@theme {
  --font-size-h1: 2.5rem;
  --font-size-h2: 2rem;
  --font-size-h3: 1.5rem;
  /* ... */
}
```

**⚠️ Recomendación**: Empezar con Opción A (default Tailwind), migrar a B solo si necesitas branding específico.

---

### 🔌 Configuración de shadcn/ui

#### Decisión 5: Style Preset

**Opciones**:
- `default` → Esquinas más redondeadas, sombras suaves
- `new-york` → Esquinas menos redondeadas, más plano

**🎯 Recomendación**: `new-york`

**Razón**: Tu `--radius-lg: 0.5rem` (8px) se alinea mejor con new-york. Default usa radios más grandes.

**Configuración** (`components.json`):
```json
{
  "style": "new-york",
  "tailwind": {
    "baseColor": "slate"
  }
}
```

#### Decisión 6: Base Color

**Tu paleta actual**: Blues/purples (`hsl(239, 85%, 67%)`)

**Opciones shadcn**:
- `slate` → Neutros fríos (grisáceos)
- `gray` → Neutros puros
- `zinc` → Neutros cálidos

**🎯 Recomendación**: `slate`

**Razón**: Tus colores dark (`hsl(236, 11%, 27%)`) tienen tinte azulado, slate combina mejor.

---

### 🧪 Testing Strategy

#### Decisión 7: Testing de Componentes shadcn

**✅ Recomendación**: Test solo tu uso, no shadcn

**Enfoque**:
```typescript
// ❌ NO testear shadcn internals
test("button renders correctly", () => {
  render(<Button>Click me</Button>);
  // Testing shadcn implementation
});

// ✅ SÍ testear tu lógica de negocio
test("create project button disables while loading", () => {
  render(<CreateProjectForm />);
  // Testing YOUR component behavior
});
```

**Razón**: shadcn components ya están testeados. Testea la integración en tus features, no los primitivos.

#### Decisión 8: Visual Regression Testing

**🤔 Evaluar**: Agregar Storybook + Chromatic

**Pros**:
- Detecta cambios visuales automáticamente
- Útil con tweakcn (ver impacto de cambios de tema)
- Documentación visual de componentes

**Contras**:
- Setup adicional
- Costo (Chromatic es de pago para privados)

**⚠️ Recomendación**: Fase 2 (después de migración base)

---

### 🎭 Compatibilidad Radix UI

#### Decisión 9: Actualizar Radix Primitives

**Estado actual**:
```json
"@radix-ui/react-checkbox": "^1.3.3",
"@radix-ui/react-slot": "^1.2.3"
```

**shadcn instalará más** (automáticamente):
```json
"@radix-ui/react-dialog": "...",
"@radix-ui/react-dropdown-menu": "...",
"@radix-ui/react-popover": "...",
// ... etc
```

**✅ Recomendación**: Dejar que shadcn CLI maneje versiones

**Razón**: shadcn usa versiones específicas testeadas. No actualices manualmente sin verificar compatibilidad.

---

## 7. Riesgos y Mitigación

### ⚠️ Riesgos Identificados

#### Riesgo 1: Breaking Changes en Features Existentes

**Probabilidad**: Media
**Impacto**: Alto

**Escenario**: Actualizar imports rompe componentes en producción

**Mitigación**:
1. ✅ **Migrar feature por feature** (no todo de golpe)
2. ✅ **Tests automáticos** antes de cada merge
3. ✅ **Branch separada** para toda la migración
4. ✅ **Rollback plan**: Mantener backup de `ui-legacy/`

**Checklist**:
```bash
# Antes de mergear cada feature
npm run test           # Tests unitarios
npm run test:e2e       # Tests E2E críticos
npm run build          # Build exitoso
npm run typecheck      # Sin errores TS
```

---

#### Riesgo 2: Pérdida de Estilos Personalizados

**Probabilidad**: Media
**Impacto**: Medio

**Escenario**: shadcn sobrescribe tokens CSS en `globals.css`

**Mitigación**:
1. ✅ **Backup de `globals.css`** antes de `shadcn init`
2. ✅ **Revisar diff** cuidadosamente después de cada `npx shadcn add`
3. ✅ **Commit separado** para cada componente agregado
4. ✅ **Git blame** para rastrear cambios

**Workflow**:
```bash
# Antes de agregar componente
cp src/app/globals.css src/app/globals.backup.css

# Agregar componente
npx shadcn@latest add dialog

# Revisar cambios
git diff src/app/globals.css

# Si sobrescribió algo, restaurar
# ... merge manual ...
```

---

#### Riesgo 3: Incompatibilidad tweakcn con Customizaciones

**Probabilidad**: Baja
**Impacto**: Bajo

**Escenario**: tweakcn genera CSS que no funciona con tu setup

**Mitigación**:
1. ✅ **Testear en localhost primero** antes de commitear
2. ✅ **Usar tweakcn como herramienta de exploración**, no source of truth
3. ✅ **Validar dark mode** después de cada cambio de tema
4. ✅ **Documentar tokens custom** que no deben cambiar

**Tokens críticos a proteger**:
```css
/* NO cambiar estos sin validar features */
--color-primary: ...        /* Usado en brand, CTA */
--color-background: ...     /* Layout base */
--color-danger: ...         /* Delete actions, alerts */
```

---

#### Riesgo 4: Conflictos de Dependencias Radix

**Probabilidad**: Baja
**Impacto**: Alto

**Escenario**: Versiones de Radix incompatibles entre custom y shadcn

**Mitigación**:
1. ✅ **Usar mismas versiones** que shadcn instala
2. ✅ **No instalar Radix manualmente** (dejar a shadcn)
3. ✅ **Revisar `package.json`** después de cada add
4. ✅ **Lock file committed** (npm/pnpm)

**Verificación**:
```bash
# Ver qué versiones usa shadcn
npm list @radix-ui/react-dialog

# Si hay conflictos, usar la de shadcn
npm install @radix-ui/react-dialog@<version-shadcn>
```

---

#### Riesgo 5: Performance Degradation

**Probabilidad**: Muy Baja
**Impacto**: Medio

**Escenario**: shadcn components impactan performance

**Mitigación**:
1. ✅ **Lazy load** componentes pesados (Dialog, Calendar)
2. ✅ **Medir antes y después** con Lighthouse
3. ✅ **Tree-shaking** (Vite/Turbopack lo hace automáticamente)
4. ✅ **Code splitting** por feature

**Benchmark**:
```bash
# Antes de migración
npm run build
# Check build size

# Después de migración
npm run build
# Comparar bundle size
```

**Aceptable**: +10-15% bundle size (componentes más completos)
**Inaceptable**: +50% bundle size (algo está mal)

---

#### Riesgo 6: Pérdida de Accesibilidad

**Probabilidad**: Muy Baja
**Impacto**: Alto (crítico)

**Escenario**: Migración introduce problemas de a11y

**Mitigación**:
1. ✅ **shadcn usa Radix** (excelente a11y out-of-the-box)
2. ✅ **Mantener componentes a11y custom** (SkipToMainContent)
3. ✅ **Tests con axe-core** (opcional pero recomendado)
4. ✅ **Manual testing** con screen reader

**Validación**:
```bash
# Instalar axe para Cypress (opcional)
npm install -D @axe-core/cypress

# Test E2E con a11y checks
# cypress/e2e/accessibility.cy.ts
cy.injectAxe();
cy.checkA11y();
```

---

## 8. Checklist de Validación

### ✅ Fase 0: Preparación

- [ ] `shadcn` CLI instalado
- [ ] `components.json` creado
- [ ] `src/lib/utils.ts` existe con función `cn()`
- [ ] Backup de componentes actuales creado
- [ ] Branch de migración creada (`git checkout -b feat/shadcn-migration`)
- [ ] Build pasa sin errores

---

### ✅ Fase 1: Instalación Base

- [ ] Componentes base instalados (button, card, input, etc.)
- [ ] `src/components/ui/` existe con componentes shadcn
- [ ] `globals.css` preserva tokens custom
- [ ] Dark mode funciona con nuevos componentes
- [ ] Build exitoso
- [ ] Tests pasan (no deberían romperse aún)

---

### ✅ Fase 2: Migración de Componentes

#### Button
- [ ] Button de shadcn instalado
- [ ] Button actual comparado con shadcn
- [ ] Mejoras adoptadas (si aplica)
- [ ] Imports actualizados a `@/components/ui/button`
- [ ] Tests de Button pasan
- [ ] Features con Button verificadas

#### Card
- [ ] Card de shadcn instalado
- [ ] Card actual comparado con shadcn
- [ ] Imports actualizados
- [ ] Tests de Card pasan
- [ ] Features con Card verificadas

#### Checkbox
- [ ] Checkbox de shadcn instalado
- [ ] Usos de Checkbox identificados (`grep -r`)
- [ ] Imports actualizados uno por uno
- [ ] Tests de Checkbox pasan
- [ ] Funcionalidad verificada en todas las features

#### Componentes Custom
- [ ] Componentes custom identificados
- [ ] NO se intentó migrar (mantener)
- [ ] Movidos a `src/shared/components/custom/` (opcional)
- [ ] Imports actualizados si se movieron

#### Validación General
- [ ] Todos los tests pasan al 100%
- [ ] No hay imports rotos
- [ ] UI se ve igual (o mejor)
- [ ] Dark mode funciona en todo
- [ ] Build sin warnings TypeScript
- [ ] Build sin warnings ESLint

---

### ✅ Fase 3: tweakcn Integration

- [ ] tweakcn.com accedido y probado
- [ ] Tema actual configurado en tweakcn
- [ ] CSS exportado desde tweakcn y aplicado en localhost
- [ ] Cambios verificados visualmente
- [ ] Dark mode funciona después de cambios de tema
- [ ] Workflow de iteración documentado

---

### ✅ Fase 4: Optimización

#### Estructura de Carpetas
- [ ] `src/components/ui/` solo contiene shadcn
- [ ] `src/shared/components/custom/` contiene componentes custom
- [ ] `src/shared/components/layouts/` contiene layouts
- [ ] Estructura clara y lógica

#### Path Aliases
- [ ] `@/components/*` apunta a `src/components/`
- [ ] `@/lib/*` apunta a `src/lib/`
- [ ] Aliases actualizados en `tsconfig.json`

#### Imports
- [ ] Todos los imports de shadcn usan `@/components/ui/`
- [ ] Todos los imports de custom usan `@/shared/components/custom/`
- [ ] No hay imports con paths relativos innecesarios
- [ ] Script de búsqueda de imports antiguos ejecutado

#### Documentación
- [ ] `docs/COMPONENTS.md` creado con convenciones
- [ ] `SHADCN_MIGRATION_PLAN.md` completado y actualizado
- [ ] README actualizado con nuevas convenciones
- [ ] Comentarios en código actualizados si aplica

#### Testing
- [ ] Tests unitarios al 100%
- [ ] Tests E2E críticos pasan
- [ ] No hay tests flakey
- [ ] Coverage mantenido o mejorado

#### Build y Deploy
- [ ] Build de producción exitoso
- [ ] Bundle size aceptable (+15% máximo)
- [ ] No hay warnings en consola
- [ ] Lighthouse score mantenido o mejorado
- [ ] Deploy a staging exitoso
- [ ] QA manual en staging aprobado

---

### ✅ Post-Migración

- [ ] PR creado y revisado
- [ ] Tests en CI pasando
- [ ] Aprobación de equipo (si aplica)
- [ ] Merge a main
- [ ] Deploy a producción
- [ ] Monitoreo de errores (Sentry, LogRocket, etc.)
- [ ] Rollback plan listo (si algo falla)
- [ ] Backup de `ui-legacy/` puede ser eliminado (después de 1-2 semanas)

---

## 📚 Referencias y Recursos

### Documentación Oficial

- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/primitives)
- [tweakcn](https://tweakcn.com)

### Herramientas Útiles

- [shadcn/ui CLI](https://ui.shadcn.com/docs/cli)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) (VSCode)
- [Radix UI DevTools](https://www.radix-ui.com/primitives/docs/overview/introduction)

### Comunidad y Soporte

- [shadcn/ui Discord](https://discord.com/invite/shadcn)
- [GitHub Issues](https://github.com/shadcn-ui/ui/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/shadcn-ui)

---

## 🎯 Siguientes Pasos

### Inmediatos (Hoy)

1. ✅ **Revisar este plan** con el equipo (si aplica)
2. ✅ **Crear branch** `feat/shadcn-migration`
3. ✅ **Ejecutar Fase 0** (Setup)
4. ✅ **Validar que todo compila**

### Corto Plazo (Esta Semana)

1. ⏱️ **Ejecutar Fase 1** (Instalación)
2. ⏱️ **Ejecutar Fase 2** (Migración)
3. ⏱️ **Validar tests al 100%**

### Mediano Plazo (Próximas 2 Semanas)

1. 📅 **Ejecutar Fase 3** (tweakcn)
2. 📅 **Ejecutar Fase 4** (Optimización)
3. 📅 **Deploy a staging**
4. 📅 **QA completo**

### Largo Plazo (Después de Migración)

1. 🔮 **Evaluar componentes adicionales** (Toast, Select, etc.)
2. 🔮 **Iterar diseño** con tweakcn
3. 🔮 **Agregar Storybook** (opcional)
4. 🔮 **Visual regression testing** (opcional)

---

## 🚨 Red Flags (Cuándo Pausar)

**Detener migración y revisar si**:

- ❌ Tests caen por debajo de 80% coverage
- ❌ Build incrementa +50% en tamaño
- ❌ Aparecen errores TypeScript sin solución obvia
- ❌ Dark mode deja de funcionar
- ❌ Componentes custom dejan de funcionar
- ❌ Features en producción se rompen
- ❌ Performance baja significativamente (>20% slower)

**Acción**: Rollback a commit anterior estable, revisar, y reintentar con enfoque más incremental.

---

## 📞 Contacto y Soporte

**Para dudas durante la migración**:

1. Revisar este documento primero
2. Consultar [shadcn/ui docs](https://ui.shadcn.com/docs)
3. Buscar en [GitHub Issues](https://github.com/shadcn-ui/ui/issues)
4. Preguntar en Discord de shadcn

**Mantener registro de problemas encontrados** para futuras referencias.

---

## ✨ Conclusión

Este plan de migración está diseñado para ser **incremental, seguro y reversible**. No hay prisa: mejor migrar lentamente y bien que rápido y romper cosas.

**Filosofía clave**:
- 🧪 **Testea constantemente**
- 📸 **Commitea frecuentemente**
- 🔄 **Valida después de cada paso**
- 🚫 **No tengas miedo de hacer rollback**

**Tu proyecto ya tiene una base sólida** (Tailwind 4, arquitectura limpia, tests). Esta migración solo lo hará más fuerte, mantenible y fácil de iterar.

**¡Éxito con la migración!** 🚀
