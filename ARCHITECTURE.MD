# Clean Architecture Funcional para Next.js

Guía completa para aplicar Clean Architecture en Next.js usando **funciones** en lugar de clases.

---

## 📁 Estructura de Carpetas

```
src/
├── lib/                           # ⚡ Domain (lógica pura)
│   ├── validations/
│   │   ├── project.ts
│   │   ├── task.ts
│   │   └── __tests__/
│   ├── utils/
│   │   ├── date.ts
│   │   ├── format.ts
│   │   └── __tests__/
│   └── types/
│       └── index.ts
│
├── data/                          # 🗄️ Data access
│   ├── projects.ts
│   ├── tasks.ts
│   ├── calendar.ts
│   └── __tests__/
│
├── features/                      # 🎯 Features
│   ├── projects/
│   │   ├── actions.ts            # Server Actions
│   │   ├── hooks.ts              # Client hooks
│   │   ├── components/
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   └── ProjectCard.tsx
│   │   └── __tests__/
│   │
│   ├── tasks/
│   │   ├── actions.ts
│   │   ├── hooks.ts
│   │   ├── components/
│   │   └── __tests__/
│   │
│   └── calendar/
│       ├── actions.ts
│       ├── hooks.ts
│       ├── components/
│       └── __tests__/
│
├── components/                    # 🎨 Shared UI
│   └── ui/                       # shadcn/ui
│
└── app/                          # 📄 Next.js routes
    ├── (auth)/
    └── (dashboard)/
```

---

## 🎯 Principios Clave

1. **Separation of Concerns** → Carpetas separadas por responsabilidad
2. **Dependency Inversion** → Funciones reciben dependencias como parámetros
3. **Single Responsibility** → Una función hace una cosa
4. **Testeable** → Fácil de testear en aislamiento

---

## 📝 Ejemplo Completo: Feature "Crear Proyecto"

### 1️⃣ Domain Layer - Validaciones Puras

```typescript
// src/lib/validations/project.ts

export type ValidationResult =
  | { success: true; data: string }
  | { success: false; error: string };

export function validateProjectName(name: string): ValidationResult {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { success: false, error: "El nombre es requerido" };
  }

  if (trimmed.length < 3) {
    return { success: false, error: "Mínimo 3 caracteres" };
  }

  if (trimmed.length > 50) {
    return { success: false, error: "Máximo 50 caracteres" };
  }

  return { success: true, data: trimmed };
}
```

**Test:**

```typescript
// src/lib/validations/__tests__/project.test.ts
import { validateProjectName } from "../project";

test("rechaza nombres cortos", () => {
  const result = validateProjectName("ab");
  expect(result.success).toBe(false);
  expect(result.error).toBe("Mínimo 3 caracteres");
});

test("acepta nombres válidos", () => {
  const result = validateProjectName("Mi Proyecto");
  expect(result.success).toBe(true);
  expect(result.data).toBe("Mi Proyecto");
});
```

---

### 2️⃣ Domain Layer - Utilidades

```typescript
// src/lib/utils/project.ts

export function calculateProjectStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, percentage };
}
```

**Test:**

```typescript
test("calcula estadísticas correctamente", () => {
  const tasks = [
    { id: "1", completed: true },
    { id: "2", completed: false },
    { id: "3", completed: true },
  ];

  expect(calculateProjectStats(tasks)).toEqual({
    total: 3,
    completed: 2,
    percentage: 67,
  });
});
```

---

### 3️⃣ Data Layer - Repository Pattern (sin clases)

```typescript
// src/data/projects.ts

import { prisma } from "@/lib/prisma";
import type { Prisma, Project } from "@prisma/client";

// ✅ Tipo para el contrato (la "interfaz")
export type ProjectRepository = {
  create: (data: Prisma.ProjectCreateInput) => Promise<Project>;
  findByUserId: (userId: string) => Promise<Project[]>;
  findById: (id: string) => Promise<Project | null>;
  update: (id: string, data: Prisma.ProjectUpdateInput) => Promise<Project>;
  delete: (id: string) => Promise<void>;
};

// ✅ Implementación real (producción)
export const projectRepository: ProjectRepository = {
  async create(data) {
    return await prisma.project.create({ data });
  },

  async findByUserId(userId) {
    return await prisma.project.findMany({
      where: { userId },
      include: { tasks: true },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id) {
    return await prisma.project.findUnique({
      where: { id },
      include: { tasks: true },
    });
  },

  async update(id, data) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  },

  async delete(id) {
    await prisma.project.delete({ where: { id } });
  },
};

// ✅ Implementación fake (testing)
export function createFakeProjectRepository(): ProjectRepository {
  const projects: Project[] = [];

  return {
    async create(data) {
      const project = {
        id: crypto.randomUUID(),
        name: data.name as string,
        description: data.description as string | null,
        color: data.color as string | null,
        userId: data.userId as string,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Project;

      projects.push(project);
      return project;
    },

    async findByUserId(userId) {
      return projects.filter(p => p.userId === userId);
    },

    async findById(id) {
      return projects.find(p => p.id === id) ?? null;
    },

    async update(id, data) {
      const index = projects.findIndex(p => p.id === id);
      if (index === -1) throw new Error("Project not found");

      projects[index] = { ...projects[index], ...data, updatedAt: new Date() };
      return projects[index];
    },

    async delete(id) {
      const index = projects.findIndex(p => p.id === id);
      if (index !== -1) projects.splice(index, 1);
    },
  };
}
```

**Test:**

```typescript
import { createFakeProjectRepository } from "../projects";

test("crea y recupera proyecto", async () => {
  const repo = createFakeProjectRepository();

  const created = await repo.create({
    name: "Test Project",
    userId: "user-123",
  });

  expect(created.name).toBe("Test Project");

  const projects = await repo.findByUserId("user-123");
  expect(projects).toHaveLength(1);
  expect(projects[0].name).toBe("Test Project");
});
```

---

### 4️⃣ Application Layer - Server Actions

```typescript
// src/features/projects/actions.ts
"use server";

import { auth } from "@/lib/auth";
import { validateProjectName } from "@/lib/validations/project";
import { projectRepository } from "@/data/projects";
import { revalidatePath } from "next/cache";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ✅ Dependency Injection para testing
export async function createProject(
  name: string,
  repository = projectRepository
): Promise<ActionResult<Project>> {
  // 1. Autenticación
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "No autenticado" };
  }

  // 2. Validación (Domain)
  const validation = validateProjectName(name);
  if (!validation.success) {
    return validation;
  }

  // 3. Persistencia (Data)
  try {
    const project = await repository.create({
      name: validation.data,
      userId: session.user.id,
    });

    revalidatePath("/projects");

    return { success: true, data: project };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Error al crear proyecto" };
  }
}

export async function getProjects(
  repository = projectRepository
): Promise<ActionResult<Project[]>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "No autenticado" };
  }

  try {
    const projects = await repository.findByUserId(session.user.id);
    return { success: true, data: projects };
  } catch (error) {
    return { success: false, error: "Error al cargar proyectos" };
  }
}

export async function deleteProject(
  projectId: string,
  repository = projectRepository
): Promise<ActionResult<void>> {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "No autenticado" };
  }

  try {
    await repository.delete(projectId);
    revalidatePath("/projects");
    return { success: true, data: undefined };
  } catch (error) {
    return { success: false, error: "Error al eliminar proyecto" };
  }
}
```

**Test:**

```typescript
import { createProject } from "../actions";
import { createFakeProjectRepository } from "@/data/projects";

// Mock de auth
jest.mock("@/lib/auth", () => ({
  auth: jest.fn().mockResolvedValue({
    user: { id: "user-123" },
  }),
}));

test("crea proyecto con nombre válido", async () => {
  const fakeRepo = createFakeProjectRepository();

  const result = await createProject("Mi Proyecto", fakeRepo);

  expect(result.success).toBe(true);
  if (result.success) {
    expect(result.data.name).toBe("Mi Proyecto");
  }
});

test("rechaza nombre inválido", async () => {
  const fakeRepo = createFakeProjectRepository();

  const result = await createProject("ab", fakeRepo);

  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error).toBe("Mínimo 3 caracteres");
  }
});
```

---

### 5️⃣ Application Layer - Client Hooks

```typescript
// src/features/projects/hooks.ts
"use client";

import { useState, useTransition } from "react";
import { createProject, deleteProject } from "./actions";

export function useCreateProject() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const create = (name: string) => {
    setError(null);

    startTransition(async () => {
      const result = await createProject(name);

      if (!result.success) {
        setError(result.error);
      }
    });
  };

  return { create, isPending, error };
}

export function useDeleteProject() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const deleteProj = (projectId: string) => {
    setError(null);

    startTransition(async () => {
      const result = await deleteProject(projectId);

      if (!result.success) {
        setError(result.error);
      }
    });
  };

  return { deleteProject: deleteProj, isPending, error };
}
```

**Test:**

```typescript
import { renderHook, act } from "@testing-library/react";
import { useCreateProject } from "../hooks";

test("hook maneja estado de loading", async () => {
  const { result } = renderHook(() => useCreateProject());

  expect(result.current.isPending).toBe(false);

  act(() => {
    result.current.create("Test Project");
  });

  expect(result.current.isPending).toBe(true);
});
```

---

### 6️⃣ Presentation Layer - Components

```typescript
// src/features/projects/components/ProjectForm.tsx
'use client';

import { useState } from 'react';
import { useCreateProject } from '../hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ProjectForm() {
  const [name, setName] = useState('');
  const { create, isPending, error } = useCreateProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      create(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del proyecto"
          disabled={isPending}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending || name.length < 3}
      >
        {isPending ? 'Creando...' : 'Crear Proyecto'}
      </Button>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </form>
  );
}
```

**Test:**

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectForm } from '../ProjectForm';

test('deshabilita botón con nombre corto', () => {
  render(<ProjectForm />);

  const button = screen.getByRole('button', { name: /crear proyecto/i });
  expect(button).toBeDisabled();
});

test('habilita botón con nombre válido', async () => {
  render(<ProjectForm />);

  const input = screen.getByPlaceholderText('Nombre del proyecto');
  await userEvent.type(input, 'Mi Proyecto');

  const button = screen.getByRole('button', { name: /crear proyecto/i });
  expect(button).toBeEnabled();
});

test('muestra loading al enviar', async () => {
  render(<ProjectForm />);

  const input = screen.getByPlaceholderText('Nombre del proyecto');
  await userEvent.type(input, 'Mi Proyecto');

  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(screen.getByText('Creando...')).toBeInTheDocument();
});
```

---

## 🔄 Flujo de Datos

```
Usuario interactúa
    ↓
Component (ProjectForm.tsx)
    ↓
Hook (useCreateProject)
    ↓
Server Action (createProject)
    ↓
Validation (validateProjectName) ← Domain
    ↓
Repository (projectRepository) ← Data
    ↓
Prisma / Database
```

---

## ✅ Ventajas de este Approach

- **No necesitas clases** → Más natural en React/Next.js
- **Fácil de testear** → Funciones puras + dependency injection
- **Separation of Concerns** → Responsabilidades claras
- **Funciona con Next.js** → Server Actions + Client Components
- **Escalable** → Agregar features es sencillo
- **TypeScript friendly** → Tipos en lugar de interfaces OOP

---

## 📊 Estrategia de Testing

```
Domain (lib/)
  ├── 100+ unit tests
  └── Jest (super rápido)

Data (data/)
  ├── 20+ integration tests
  └── Jest con Fakes

Application (features/*/actions.ts)
  ├── 30+ tests con mocks
  └── Jest

Application (features/*/hooks.ts)
  ├── 20+ tests
  └── React Testing Library

Presentation (features/*/components/)
  ├── 40+ component tests
  └── React Testing Library

E2E (e2e/)
  ├── 5-10 critical flows
  └── Cypress/Playwright
```

---

## 🚀 Próximos Pasos

1. Implementar validaciones en `src/lib/validations/`
2. Crear repositories en `src/data/`
3. Desarrollar Server Actions por feature
4. Construir hooks reutilizables
5. Crear componentes de UI
6. Escribir tests para cada capa

---

## 📚 Recursos Adicionales

- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
