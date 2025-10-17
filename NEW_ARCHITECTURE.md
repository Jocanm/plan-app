# 🏗️ Nueva Arquitectura: Feature-Based + Clean Architecture

> **Estado:** 📋 Pendiente de implementar
>
> **Fecha:** 2025-10-17
>
> **Motivación:** Mejorar escalabilidad y organización sin romper Clean Architecture

---

## 🔴 Problema Actual

### Estructura actual (flat organization):

```
src/
├── lib/
│   ├── validations/
│   │   ├── auth.ts
│   │   ├── auth.test.ts
│   │   ├── i18n.ts
│   │   ├── i18n.test.ts
│   │   ├── [FUTURO: task.ts]
│   │   ├── [FUTURO: project.ts]
│   │   ├── [FUTURO: tag.ts]
│   │   └── [FUTURO: 20+ archivos más]
│   │
│   ├── utils/
│   │   ├── headers.ts
│   │   ├── headers.test.ts
│   │   ├── i18n.ts
│   │   ├── i18n.test.ts
│   │   ├── [FUTURO: 15+ archivos más]
│   │   └── utils.ts
│   │
│   ├── constants/
│   │   ├── locale.ts
│   │   ├── routes.ts
│   │   └── [FUTURO: 10+ archivos más]
│   │
│   └── types/
│       ├── auth.ts
│       └── [FUTURO: múltiples archivos]
│
├── features/
│   ├── auth/
│   │   ├── actions.ts
│   │   └── components/
│   │
│   └── [FUTURO: múltiples features]
│
└── data/
    └── [repositories]
```

### ❌ Problemas identificados:

1. **Carpetas planas con 20-30 archivos**
   - Difícil encontrar archivos relacionados
   - No hay cohesión visual
   - Difícil de navegar

2. **Baja cohesión**
   - Archivos de la misma feature están dispersos
   - `lib/validations/i18n.ts`, `lib/utils/i18n.ts`, `lib/constants/locale.ts` deberían estar juntos

3. **Alto acoplamiento implícito**
   - No es claro qué archivos están relacionados
   - Difícil saber qué se puede eliminar sin romper otras features

4. **Difícil de escalar**
   - Cada nueva feature = +5-10 archivos en carpetas flat
   - Con 10 features = 50-100 archivos dispersos

5. **Difícil de mantener**
   - "¿Dónde está la lógica de i18n?" → Buscar en 4 carpetas
   - "¿Puedo eliminar i18n?" → Revisar múltiples carpetas

6. **Onboarding complicado**
   - Nuevo developer no entiende qué archivos pertenecen a qué feature

---

## ✅ Solución: Feature-Based Architecture

### Estructura objetivo:

```
src/
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
│
├── features/                    # 🎯 Features (módulos funcionales)
│   │
│   ├── auth/
│   │   ├── domain/              # 🧠 Domain Layer (reglas de negocio)
│   │   │   ├── validations.ts
│   │   │   ├── validations.test.ts
│   │   │   ├── utils.ts
│   │   │   ├── utils.test.ts
│   │   │   └── types.ts
│   │   │
│   │   ├── app/                 # ⚡ Application Layer (orquestación)
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── useSignOut.ts
│   │   │   └── actions/
│   │   │       ├── signIn.ts
│   │   │       └── signOut.ts
│   │   │
│   │   ├── data/                # 💾 Data Layer (acceso a datos)
│   │   │   ├── repository.ts
│   │   │   └── repository.test.ts
│   │   │
│   │   └── components/          # 🎨 Presentation Layer (UI)
│   │       ├── LoginForm.tsx
│   │       └── OauthButton.tsx
│   │
│   ├── i18n/
│   │   ├── domain/
│   │   │   ├── validations.ts
│   │   │   ├── validations.test.ts
│   │   │   ├── utils.ts
│   │   │   ├── utils.test.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── app/
│   │   │   ├── hooks/
│   │   │   │   └── useLocale.ts
│   │   │   └── actions/
│   │   │       └── setLocale.ts
│   │   │
│   │   └── components/          # (Futuro)
│   │       └── LocaleSwitcher.tsx
│   │
│   └── tasks/                    # [PRÓXIMAMENTE - Ejemplo completo]
│       ├── domain/              # 🧠 Domain Layer
│       │   ├── validations.ts   # validateTask, validateTaskTitle
│       │   ├── validations.test.ts
│       │   ├── schemas.ts       # Zod schemas
│       │   ├── utils.ts         # calculateTaskStats
│       │   ├── utils.test.ts
│       │   └── types.ts         # Task, TaskInput, etc.
│       │
│       ├── app/                 # ⚡ Application Layer
│       │   ├── hooks/           # Client-side logic
│       │   │   ├── useCreateTask.ts
│       │   │   ├── useUpdateTask.ts
│       │   │   ├── useDeleteTask.ts
│       │   │   ├── useGetTasks.ts
│       │   │   └── useGetTask.ts
│       │   └── actions/         # Server Actions
│       │       ├── createTask.ts
│       │       ├── updateTask.ts
│       │       ├── deleteTask.ts
│       │       ├── getTasks.ts
│       │       └── getTask.ts
│       │
│       ├── data/                # 💾 Data Layer
│       │   ├── repository.ts    # taskRepository
│       │   └── repository.test.ts
│       │
│       └── components/          # 🎨 Presentation Layer
│           ├── TaskForm.tsx
│           ├── TaskList.tsx
│           ├── TaskCard.tsx
│           └── __tests__/
│               ├── TaskForm.test.tsx
│               └── TaskList.test.tsx
│
├── shared/                      # ♻️ Código compartido entre features
│   ├── ui/                      # shadcn/ui components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── hooks/                   # useDebounce, usePagination, etc.
│   │   ├── useDebounce.ts
│   │   └── usePagination.ts
│   ├── utils/                   # Utilities compartidas
│   │   ├── date.ts
│   │   └── string.ts
│   └── types/                   # Tipos compartidos
│       └── common.ts
│
├── lib/                         # 🧠 Infraestructura técnica global
│   ├── auth.ts                  # NextAuth config
│   ├── prisma.ts                # Prisma client
│   ├── env.ts                   # Environment variables (T3 Env)
│   └── config/                  # Configuración global
│       └── constants.ts
│
├── middleware.ts                # Middleware global
├── i18n/
│   └── request.ts               # next-intl config
│
└── types/                       # Type extensions globales
    └── next-auth.d.ts
```

---

## 🎯 Decisiones de Diseño

### 1. **`domain/` dentro de features, `lib/` para infraestructura**

```
features/tasks/domain/    ← Reglas de negocio de tasks
lib/                      ← Infraestructura técnica global
```

**Razón:**
- `domain/` = lógica de negocio específica de la feature
- `lib/` = herramientas técnicas compartidas (auth, prisma, env)
- Diferenciación semántica clara

### 2. **Carpeta `app/` para Application Layer**

```
features/tasks/app/
├── hooks/      ← Client-side orchestration
└── actions/    ← Server-side orchestration
```

**Razón:**
- Separa explícitamente la Application Layer
- Mantiene visibles las 4 capas de Clean Architecture
- Escalable: cada hook/action tiene su propio archivo

### 3. **Sin sufijos redundantes**

```
✅ features/tasks/domain/validations.ts
❌ features/tasks/domain/task.validations.ts
```

**Razón:**
- La carpeta ya da el contexto (tasks)
- Menos typing
- Más limpio

### 4. **Hooks y Actions separados por archivo**

```
app/hooks/
├── useCreateTask.ts
├── useUpdateTask.ts
└── useDeleteTask.ts

app/actions/
├── createTask.ts
├── updateTask.ts
└── deleteTask.ts
```

**Razón:**
- Alta cohesión (1 responsabilidad por archivo)
- Fácil de encontrar
- Escalable (50+ archivos sin problema)
- Preparado para crecimiento

### 5. **`index.ts` opcional**

Solo en el root del feature si aporta valor real:

```typescript
// features/tasks/index.ts (opcional)
export { createTask, deleteTask } from './app/actions'
export { useCreateTask } from './app/hooks'
export type { Task, TaskInput } from './domain/types'
```

**Razón:**
- Evita overhead innecesario
- Solo si mejora la API pública del feature

---

## ✅ Por qué MANTIENE Clean Architecture

### 1. **Las capas siguen existiendo**

#### Antes (flat):
```
lib/validations/task.ts    ← Domain
lib/utils/task.ts          ← Domain
data/tasks.ts              ← Data
features/tasks/actions.ts  ← Application
features/tasks/components/ ← Presentation
```

#### Después (feature-based):
```
features/tasks/
├── domain/           ← Domain (MISMA CAPA)
│   ├── validations.ts
│   └── utils.ts
├── data/            ← Data (MISMA CAPA)
│   └── repository.ts
├── app/             ← Application (MISMA CAPA)
│   ├── actions/
│   └── hooks/
└── components/      ← Presentation (MISMA CAPA)
```

**✅ Las capas NO cambian, solo se organizan por feature**

---

### 2. **El flujo de dependencias se mantiene**

```
components/TaskForm.tsx
    ↓ usa
app/hooks/useCreateTask.ts
    ↓ usa
app/actions/createTask.ts
    ↓ usa
domain/validations.ts
    ↓ usa
data/repository.ts
    ↓ usa
lib/prisma.ts
```

**✅ Unidireccional: Presentation → Application → Domain → Data**

---

### 3. **Domain sigue siendo puro**

```typescript
// features/tasks/domain/validations.ts
// ✅ PURO - No depende de Next.js, Prisma, React, etc.
export function validateTaskTitle(title: string): ValidationResult {
  if (title.trim().length === 0) {
    return { success: false, error: "Title required" }
  }
  return { success: true, data: title.trim() }
}
```

**✅ Sin cambios en la pureza de las funciones**

---

### 4. **Dependency Injection se mantiene**

```typescript
// features/tasks/app/actions/createTask.ts
"use server"

import { validateTaskTitle } from '../../domain/validations'
import { taskRepository } from '../../data/repository'

export async function createTask(
  data: TaskInput,
  repository = taskRepository  // ← DI para testing
): Promise<ActionResult<Task>> {
  // Validación (Domain)
  const validation = validateTaskTitle(data.title)
  if (!validation.success) return validation

  // Persistencia (Data)
  const task = await repository.create(data)

  return { success: true, data: task }
}
```

**✅ Testing con fakes sigue igual**

---

### 5. **Testing strategy se mantiene**

```typescript
// features/tasks/domain/validations.test.ts
// ✅ Unit test - 100% PURO
test("validates task title", () => {
  expect(validateTaskTitle("").success).toBe(false)
  expect(validateTaskTitle("Valid").success).toBe(true)
})

// features/tasks/data/repository.test.ts
// ✅ Integration test con Fake
test("creates task in repository", async () => {
  const repo = createFakeTaskRepository()
  const task = await repo.create({ title: "Test", userId: "1" })
  expect(task.title).toBe("Test")
})

// features/tasks/app/actions/__tests__/createTask.test.ts
// ✅ Integration test con DI
test("createTask validates and persists", async () => {
  const fakeRepo = createFakeTaskRepository()
  const result = await createTask({ title: "Test" }, fakeRepo)
  expect(result.success).toBe(true)
})
```

**✅ Misma estrategia: Unit → Integration → E2E**

---

## 🎯 Ventajas

### 1. **Alta cohesión**
```bash
# Todo lo relacionado con tasks está junto
features/tasks/
├── domain/validations.ts
├── domain/utils.ts
├── app/actions/createTask.ts
├── app/hooks/useCreateTask.ts
└── components/TaskForm.tsx

# vs buscar en 5 carpetas diferentes
```

### 2. **Bajo acoplamiento**
```bash
# Eliminar feature = eliminar carpeta
rm -rf features/tasks

# vs eliminar archivos dispersos (¿me olvidé algo?)
```

### 3. **Escalabilidad**
```bash
# 50+ hooks sin problema
features/tasks/app/hooks/
├── useCreateTask.ts
├── useUpdateTask.ts
├── useDeleteTask.ts
├── useGetTasks.ts
├── useGetTask.ts
├── useFilterTasks.ts
├── useSortTasks.ts
└── ...y 40+ más
```

### 4. **Onboarding rápido**
```bash
# Nuevo dev pregunta: "¿Dónde está la lógica de tasks?"
→ "features/tasks/"
   ✅ Todo está ahí

# vs
→ "lib/validations/task.ts, lib/utils/task.ts, data/tasks.ts..."
   ❌ Disperso
```

### 5. **Self-documenting**
```
features/tasks/
├── domain/     ← "Ah, reglas de negocio"
├── app/        ← "Ah, lógica de aplicación"
├── data/       ← "Ah, acceso a datos"
└── components/ ← "Ah, UI"
```

### 6. **Fácil de navegar**
```
"¿Dónde está el hook de crear task?"
→ features/tasks/app/hooks/useCreateTask.ts

"¿Dónde está la validación de task?"
→ features/tasks/domain/validations.ts
```

---

## 📋 Plan de Migración

### Fase 1: Crear estructura de carpetas

```bash
# i18n
mkdir -p features/i18n/domain
mkdir -p features/i18n/app/{hooks,actions}

# auth
mkdir -p features/auth/domain
mkdir -p features/auth/app/{hooks,actions}
mkdir -p features/auth/data

# shared
mkdir -p shared/{ui,hooks,utils,types}
```

### Fase 2: Mover archivos de i18n

| Origen | Destino |
|--------|---------|
| `lib/validations/i18n.ts` | `features/i18n/domain/validations.ts` |
| `lib/validations/i18n.test.ts` | `features/i18n/domain/validations.test.ts` |
| `lib/utils/i18n.ts` | `features/i18n/domain/utils.ts` |
| `lib/utils/i18n.test.ts` | `features/i18n/domain/utils.test.ts` |
| `lib/utils/headers.ts` | `features/i18n/domain/utils.ts` (merge) |
| `lib/utils/headers.test.ts` | `features/i18n/domain/utils.test.ts` (merge) |
| `lib/constants/locale.ts` | `features/i18n/domain/constants.ts` |

### Fase 3: Mover archivos de auth

| Origen | Destino |
|--------|---------|
| `lib/validations/auth.ts` | `features/auth/domain/validations.ts` |
| `lib/validations/auth.test.ts` | `features/auth/domain/validations.test.ts` |
| `lib/types/auth.ts` | `features/auth/domain/types.ts` |
| `features/auth/actions.ts` | Separar en `features/auth/app/actions/signIn.ts` + `signOut.ts` |

### Fase 4: Mover shared components

| Origen | Destino |
|--------|---------|
| `components/ui/*` | `shared/ui/*` |
| `lib/utils.ts` (shadcn cn) | `shared/utils/cn.ts` |

### Fase 5: Actualizar imports

**Archivos a actualizar:**
- `src/middleware.ts`
- `src/i18n/request.ts`
- `src/app/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/page.tsx`
- `src/app/auth/error/page.tsx`
- `src/app/auth/helpers/getLoginError.ts`
- `src/app/auth/login/components/LoginForm.tsx`
- `src/app/auth/login/components/oauth/OauthForm.tsx`
- `features/auth/app/actions/*`

**Ejemplo de cambios:**

```typescript
// ❌ Antes
import { isLocaleValid } from "@/lib/validations/i18n"
import { getPrimaryLanguage } from "@/lib/utils/i18n"
import { locales } from "@/lib/constants/locale"
import { getAuthRedirect } from "@/lib/validations/auth"
import { Button } from "@/components/ui/Button"

// ✅ Después
import { isLocaleValid } from "@/features/i18n/domain/validations"
import { getPrimaryLanguage } from "@/features/i18n/domain/utils"
import { locales } from "@/features/i18n/domain/constants"
import { getAuthRedirect } from "@/features/auth/domain/validations"
import { Button } from "@/shared/ui/Button"
```

### Fase 6: Limpiar carpetas vacías

```bash
# Solo si quedan vacías
rmdir lib/validations
rmdir lib/types
rmdir lib/constants
rmdir components
```

### Fase 7: Verificar

```bash
npm run typecheck  # ✅ Sin errores de TypeScript
npm run test       # ✅ Todos los tests pasan
npm run build      # ✅ Build exitoso
```

---

## 📊 Comparación: Antes vs Después

### Escenario: "Quiero ver toda la lógica de tasks"

#### Antes (flat):
```bash
# Buscar en 5 lugares diferentes
lib/validations/task.ts
lib/utils/task.ts
lib/types/task.ts
data/tasks.ts
features/tasks/actions.ts
features/tasks/components/
```

#### Después (feature-based):
```bash
# Un solo lugar
features/tasks/
├── domain/
├── app/
├── data/
└── components/
```

---

### Escenario: "Necesito eliminar la feature de tasks"

#### Antes (flat):
```bash
# Buscar y eliminar manualmente en múltiples carpetas
rm lib/validations/task.ts
rm lib/utils/task.ts
rm lib/types/task.ts
rm data/tasks.ts
rm -rf features/tasks
# ¿Me olvidé algo? 🤔
```

#### Después (feature-based):
```bash
# Un comando
rm -rf features/tasks
# Listo ✅
```

---

### Escenario: "Nuevo developer: ¿Cómo funciona auth?"

#### Antes (flat):
```
"Mira lib/validations/auth.ts para validaciones,
lib/types/auth.ts para tipos,
features/auth/actions.ts para las acciones,
features/auth/components para UI,
y lib/auth.ts para la config de NextAuth"
```

#### Después (feature-based):
```
"Todo está en features/auth/
└── domain/, app/, components/

Ah, y lib/auth.ts es la config de NextAuth (infraestructura compartida)"
```

---

## 🎯 Reglas de Oro

### ¿Qué va en `lib/` (root) vs `features/X/domain/`?

**`lib/` (infraestructura compartida):**
- ✅ NextAuth config (`lib/auth.ts`)
- ✅ Prisma client (`lib/prisma.ts`)
- ✅ Environment config (`lib/env.ts`)
- ✅ Configuración técnica global

**`shared/` (código de negocio compartido):**
- ✅ UI components compartidos (`shared/ui/`)
- ✅ Hooks compartidos (`shared/hooks/useDebounce.ts`)
- ✅ Utils compartidos (`shared/utils/date.ts`)
- ✅ Usado por 2+ features

**`features/X/domain/` (lógica de negocio específica):**
- ✅ Solo usado por esa feature
- ✅ Reglas de negocio del dominio
- ✅ Validaciones específicas

**Test:** "Si borro la feature, ¿algo más se rompe?"
- **No** → Va en `features/X/domain/`
- **Sí** → Va en `shared/` o `lib/`

---

## ⏱️ Tiempo Estimado

| Fase | Tiempo |
|------|--------|
| Crear estructura de carpetas | 3 min |
| Mover archivos de i18n | 5 min |
| Mover archivos de auth | 5 min |
| Mover shared components | 2 min |
| Actualizar imports | 15 min |
| Merge headers.ts en utils.ts | 5 min |
| Separar actions.ts | 5 min |
| Verificar tests | 5 min |
| Limpiar y commit | 5 min |

**Total:** ~45-50 minutos

---

## 🚀 Próximos Pasos

1. ✅ **Revisar y aprobar esta propuesta**
2. ⏸️ **Crear backup/commit** (antes de empezar)
3. ⏸️ **Ejecutar migración** (seguir plan paso a paso)
4. ⏸️ **Verificar que todo funciona** (tests, build, typecheck)
5. ⏸️ **Actualizar ARCHITECTURE.md** (reflejar nueva estructura)
6. ⏸️ **Commit cambios** con mensaje descriptivo
7. ⏸️ **Continuar con Tasks feature** (usando nueva estructura)

---

## 📚 Referencias

- **ARCHITECTURE.md** - Principios de Clean Architecture (se mantienen intactos)
- **Clean Architecture by Uncle Bob** - Layers y dependency flow
- **Feature-Sliced Design** - Inspiración para organización por features
- **Domain-Driven Design** - Concepto de "domain" como capa de negocio

---

## ✅ Checklist de Aprobación

Antes de ejecutar, verificar:

- [ ] ¿Entiendo el problema actual?
- [ ] ¿Entiendo la solución propuesta?
- [ ] ¿Estoy convencido de que mantiene Clean Architecture?
- [ ] ¿Entiendo las ventajas de escalabilidad?
- [ ] ¿Entiendo por qué `domain/` en features y `lib/` para infraestructura?
- [ ] ¿Entiendo por qué separar hooks y actions por archivo?
- [ ] ¿Tengo tiempo para hacerlo ahora (45-50 min)?
- [ ] ¿Tengo backup/commit antes de empezar?

**Si todas son ✅, proceder con la migración.**

---

## 💡 Ejemplo Completo: Feature Tasks

```
features/tasks/
├── domain/
│   ├── validations.ts
│   ├── validations.test.ts
│   ├── schemas.ts
│   ├── utils.ts
│   ├── utils.test.ts
│   └── types.ts
│
├── app/
│   ├── hooks/
│   │   ├── useCreateTask.ts
│   │   ├── useUpdateTask.ts
│   │   ├── useDeleteTask.ts
│   │   ├── useGetTasks.ts
│   │   └── useGetTask.ts
│   └── actions/
│       ├── createTask.ts
│       ├── updateTask.ts
│       ├── deleteTask.ts
│       ├── getTasks.ts
│       └── getTask.ts
│
├── data/
│   ├── repository.ts
│   └── repository.test.ts
│
└── components/
    ├── TaskForm.tsx
    ├── TaskList.tsx
    ├── TaskCard.tsx
    └── __tests__/
        ├── TaskForm.test.tsx
        └── TaskList.test.tsx
```

**✅ Listo para escalar a 100+ archivos sin perder claridad**
