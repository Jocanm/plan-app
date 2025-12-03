# 🔍 Code Review: Calendar Events Creation Flow

**Fecha:** 2025-01-03
**Reviewer:** Claude (Tech Lead)
**Scope:** Flujo completo de creación de calendar events vía drag & drop

---

## ✅ Fortalezas del código

1. **Arquitectura sólida:** Respeta Clean Architecture (domain → data → app → presentation)
2. **Result pattern:** Uso consistente en la mayoría de casos
3. **Optimistic updates:** Implementado correctamente con rollback
4. **Cache invalidation:** Usa `updateTag` para Next.js cache
5. **Type safety:** Buenos tipos con TypeScript
6. **Testing:** Tests actualizados para nuevas features (factories.test.ts)
7. **Separation of concerns:** Hooks personalizados bien estructurados

---

## 🚨 PROBLEMAS CRÍTICOS (deben arreglarse)

### 1. **Race condition en `useDroppableCalendarSlot`** ⚠️ CRÍTICO

**Archivo:** `src/features/calendar/app/hooks/useDroppableCalendarSlot.ts:44`

**Problema:**
```tsx
useEffect(() => {
  if (ref.current) {
    const isTimeGutter = ref.current.closest(".rbc-time-gutter") !== null;
    if (isTimeGutter) return;
    return setDropTarget(ref.current);
  }
}, []); // ← Array vacío = solo corre una vez
```

Si el componente se monta antes que el DOM esté listo, `closest()` puede fallar o el drop target no se configura.

**Solución:**
```tsx
useEffect(() => {
  if (!ref.current) return;

  const isTimeGutter = ref.current.closest(".rbc-time-gutter") !== null;
  if (isTimeGutter) return;

  return setDropTarget(ref.current);
}, [setDropTarget]); // ← Agregar dependencia
```

**Impacto:** 🔴 Alto - Drop puede no funcionar en algunos casos
**Esfuerzo:** 🟢 Bajo (1 línea)

---

### 2. **Null check insuficiente en `SideCalendarTimeSlotWrapper`** 🐛 BUG

**Archivo:** `src/features/calendar/components/sideCalendar/slots/SideCalendarTimeSlotWrapper.tsx:20-30`

**Problema:**
```tsx
const currentUser = useCurrentUser(); // ← Puede ser null

mutation.mutate({
  userId: currentUser!.id, // ← ❌ Non-null assertion peligrosa
  date: toCalendarDateISO(props.value!), // ← ❌ value puede ser undefined
  startTime: props.value!.toISOString(),
});
```

**Problemas múltiples:**
1. `currentUser` puede ser `null` si el session no está cargado
2. `props.value` puede ser `undefined` (el tipo lo permite)
3. Non-null assertions (`!`) ocultan bugs en runtime

**Solución:**
```tsx
const { ref, isDraggedOver } = useDroppableCalendarSlot({
  onDrop: async ({ source: { data } }) => {
    // ✅ Early return si faltan datos críticos
    if (!currentUser || !props.value) {
      console.error("Missing user or slot value");
      return;
    }

    const taskId = data.taskId as string;
    const taskTitle = data.title as string;

    // ✅ Validación de datos del drag
    if (!taskId || !taskTitle) {
      console.error("Invalid drag data");
      return;
    }

    mutation.mutate({
      id: crypto.randomUUID(),
      userId: currentUser.id, // ✅ Safe
      date: toCalendarDateISO(props.value), // ✅ Safe
      startTime: props.value.toISOString(), // ✅ Safe
      taskId,
      taskTitle,
    });
  },
});
```

**Impacto:** 🔴 Crítico - Puede causar crash en producción
**Esfuerzo:** 🟢 Bajo (agregar validaciones)

---

### 3. **`crypto.randomUUID()` no funciona en todos los browsers** ⚠️ COMPATIBILIDAD

**Archivo:** `src/features/calendar/components/sideCalendar/slots/SideCalendarTimeSlotWrapper.tsx:23`

**Problema:**
```tsx
const eventId = crypto.randomUUID(); // ← Puede fallar en Safari < 15.4, Edge < 92
```

`crypto.randomUUID()` no está disponible en navegadores antiguos (Safari < 15.4, Edge < 92, Firefox < 95).

**Solución 1 - Usar nanoid:**
```bash
npm install nanoid
```

```tsx
import { nanoid } from 'nanoid';

const eventId = nanoid();
```

**Solución 2 - Crear util con fallback:**
```tsx
// src/lib/utils/id.ts
export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback para browsers antiguos
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
```

```tsx
// En SideCalendarTimeSlotWrapper
import { generateId } from '@/lib/utils/id';

const eventId = generateId();
```

**Impacto:** 🔴 Alto - Funcionalidad rota en browsers no soportados
**Esfuerzo:** 🟢 Bajo (crear util o instalar nanoid)

---

### 4. **Missing error handling en mutation** 🐛 UX

**Archivo:** `src/features/calendar/components/sideCalendar/slots/SideCalendarTimeSlotWrapper.tsx:20`

**Problema:**
```tsx
mutation.mutate({...}); // ← No hay feedback de errores al usuario
```

Si la mutación falla, el usuario no ve ningún mensaje de error.

**Solución 1 - Error callback inline:**
```tsx
import { toast } from 'sonner';

mutation.mutate(payload, {
  onError: (error) => {
    toast.error('Failed to create event');
    console.error('Calendar event creation failed:', error);
  }
});
```

**Solución 2 - Effect en el componente:**
```tsx
const mutation = useCreateCalendarEvent();

useEffect(() => {
  if (mutation.error) {
    toast.error('Failed to create event');
  }
}, [mutation.error]);
```

**Impacto:** 🔴 Alto - Mala UX, usuario no sabe que falló
**Esfuerzo:** 🟢 Bajo (agregar toast)

---

## ⚠️ PROBLEMAS IMPORTANTES (deberían arreglarse)

### 5. **Tipo incorrecto en `onSettled`** 🐛 TYPE BUG

**Archivo:** `src/features/calendar/app/hooks/actions/useCreateCalendarEvent.ts:66-73`

**Problema:**
```tsx
onSettled: async data => {
  if (data) {
    await queryClient.invalidateQueries({
      queryKey: clientCalendarEventsTags.byUserAndDate(
        data.userId,
        data.date.toISOString() // ← BUG: si hay error, data es undefined
      ),
    });
  }
},
```

`onSettled` recibe `(data, error, variables, context)`. Si hay error, `data` es `undefined` y NO invalida el cache.

**Solución:**
```tsx
onSettled: async (data, error, variables) => {
  // ✅ Invalidar siempre, independiente de éxito o error
  await queryClient.invalidateQueries({
    queryKey: clientCalendarEventsTags.byUserAndDate(
      variables.userId,
      variables.date // ← Usar variables, no data
    ),
  });
},
```

**Impacto:** 🟠 Medio - Cache no se invalida si hay error
**Esfuerzo:** 🟢 Bajo (cambiar a usar variables)

---

### 6. **Inconsistencia en el formato de `date`** 🔧 TECH DEBT

**Archivos múltiples:**
- `CreateCalendarEventInput.date`: `Date | string`
- `CreateCalendarEventData.date`: `Date | string`
- Payload action: `date: string` (toCalendarDateISO)
- Invalidation: `data.date.toISOString()`

**Problema:** Confusión constante entre `Date` objects y strings ISO. Propenso a bugs de tipo.

**Solución recomendada - Separación clara:**
```tsx
// Domain types - SIEMPRE Date
export interface CreateCalendarEventInput {
  date: Date;        // ← Solo Date
  startTime: Date;
  endTime?: Date;
}

export interface CreateCalendarEventData {
  date: Date;
  startTime: Date;
  endTime: Date;
}

// Actions/API - SIEMPRE string ISO
export type CreateCalendarEventActionPayload = {
  date: string;      // ← Solo string ISO
  startTime: string;
  endTime?: string;
};

// Conversión explícita en boundaries
const payload: CreateCalendarEventActionPayload = {
  date: input.date.toISOString(),
  startTime: input.startTime.toISOString(),
  // ...
};
```

**Impacto:** 🟠 Medio - Confusión y posibles bugs de tipo
**Esfuerzo:** 🟡 Medio (refactor de múltiples archivos)

---

### 7. **Optimistic update incompleto** 🎨 UX

**Archivo:** `src/features/calendar/app/hooks/actions/useCreateCalendarEvent.ts:44-46`

**Problema:**
```tsx
task: {
  id: payload.taskId,
  title: payload.taskTitle,
  // ❌ Faltan: projectId, color, description, status, etc.
}
```

Si el calendario necesita mostrar el color del proyecto o cualquier otra info del task, no está disponible en el optimistic update.

**Solución 1 - Pasar más datos en el drag:**
```tsx
// useDraggableTask.tsx
getInitialData: () => ({
  taskId: id,
  title,
  color,
  projectId, // ← Agregar
})

// SideCalendarTimeSlotWrapper.tsx
mutation.mutate({
  taskId: data.taskId,
  taskTitle: data.title,
  taskColor: data.color,      // ← Nuevo
  taskProjectId: data.projectId, // ← Nuevo
});
```

**Solución 2 - Fetch task completa:**
```tsx
onMutate: async (payload) => {
  const task = queryClient.getQueryData(['tasks', payload.taskId]);
  const optimisticEvent = {
    ...payload,
    task, // ← Task completa desde cache
  };
  // ...
}
```

**Impacto:** 🟠 Medio - Optimistic update puede no mostrar toda la info
**Esfuerzo:** 🟡 Medio (depende de la solución)

---

## 🟡 MEJORAS MENORES (nice to have)

### 8. **Naming inconsistente en tags**

**Archivo:** `src/features/calendar/app/cache/tags.ts`

**Problema:**
```tsx
export const calendarEventsTags = {...}      // ← Server tags
export const clientCalendarEventsTags = {...} // ← Client tags (React Query)
```

No es claro qué tags son para qué sin leer el código.

**Solución 1 - Naming explícito:**
```tsx
export const serverCalendarEventsTags = {...}
export const clientCalendarEventsTags = {...}
```

**Solución 2 - Namespace único:**
```tsx
export const calendarEventsCacheKeys = {
  server: {
    byUserAndDate: (userId, date) =>
      `calendar-events-user-${userId}-date-${date}`,
  },
  client: {
    byUserAndDate: (userId, date) =>
      ["calendar-events", userId, date] as const,
  },
};
```

**Impacto:** 🟢 Bajo - Claridad de código
**Esfuerzo:** 🟢 Bajo

---

### 9. **Hardcoded strings en drag data (Magic strings)** 🔧 MAINTAINABILITY

**Archivos:**
- `src/features/tasks/app/hooks/useDraggableTask.tsx:32`
- `src/features/calendar/components/sideCalendar/slots/SideCalendarTimeSlotWrapper.tsx:21-22`

**Problema:**
```tsx
// useDraggableTask
getInitialData: () => ({ taskId: id, title, color })

// SideCalendarTimeSlotWrapper
const taskId = data.taskId as string;
const taskTitle = data.title as string;
```

Magic strings, fácil equivocarse con los nombres de las keys.

**Solución - Tipos compartidos:**
```tsx
// src/features/tasks/domain/types/drag.ts (nuevo)
export interface TaskDragData {
  taskId: string;
  title: string;
  color: string;
}

// useDraggableTask
import { TaskDragData } from '../../domain/types/drag';

getInitialData: (): TaskDragData => ({
  taskId: id,
  title,
  color
})

// SideCalendarTimeSlotWrapper
import { TaskDragData } from '@/features/tasks/domain/types/drag';

const dragData = data as TaskDragData;
mutation.mutate({
  taskId: dragData.taskId,
  taskTitle: dragData.title,
});
```

**Impacto:** 🟢 Bajo - Mejor type safety
**Esfuerzo:** 🟢 Bajo

---

### 10. **Test incompleto** 🧪 TESTING

**Archivo:** `src/features/calendar/domain/factories.test.ts:58-83`

**Problema:**
El nuevo test "Should include id when provided" está bien, pero **falta test para cuando `id` NO se provee.**

**Decisión pendiente:** ¿El `id` es required o optional en Prisma?

**Si es opcional:**
```tsx
it("Should handle missing id (database generates)", () => {
  const input = {
    taskId: "task-123",
    userId: "user-456",
    // id: undefined ← Sin id
    date: new Date(),
    startTime: new Date(),
  };

  const result = buildCreateCalendarEventData(input);

  expect(result.id).toBeUndefined();
});
```

**Si debe generarse en cliente:**
```tsx
it("Should generate id when not provided", () => {
  const input = {
    taskId: "task-123",
    userId: "user-456",
    // No id provisto
    date: new Date(),
    startTime: new Date(),
  };

  const result = buildCreateCalendarEventData(input);

  expect(result.id).toBeDefined();
  expect(typeof result.id).toBe('string');
});
```

**Impacto:** 🟢 Bajo - Cobertura de tests
**Esfuerzo:** 🟢 Bajo

---

### 11. **Comentado eslint-disable demasiado amplio** 🔧 LINTING

**Archivo:** `src/features/calendar/components/sideCalendar/SideCalendar.tsx:1`

**Problema:**
```tsx
/* eslint-disable react-hooks/error-boundaries */
```

Desactiva la regla para TODO el archivo. Mejor inline donde se necesita.

**Solución:**
```tsx
// Quitar línea 1

try {
  // ...
  // eslint-disable-next-line react-hooks/error-boundaries
  return (
    <div className="bg-card shrink-0 py-5 h-full">
      <Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SideCalendarClient userId={user.id} />
        </HydrationBoundary>
      </Suspense>
    </div>
  );
} catch {
  return <SideCalendarRequestError date={today} userId={user.id} />;
}
```

**Impacto:** 🟢 Bajo - Code quality
**Esfuerzo:** 🟢 Bajo

---

## 📊 RESUMEN DE PRIORIDADES

### 🔴 CRÍTICO (arreglar antes de producción):
1. **#2** - Null checks en `SideCalendarTimeSlotWrapper`
2. **#3** - Browser compat de `crypto.randomUUID()`
3. **#4** - Error handling en mutation

### 🟠 IMPORTANTE (arreglar pronto):
4. **#5** - Tipo en `onSettled` (usar variables)
5. **#6** - Inconsistencia Date vs string
6. **#1** - Race condition en `useDroppableCalendarSlot`

### 🟡 MEJORAR (cuando haya tiempo):
7. **#7** - Optimistic update incompleto
8. **#8, #9** - Naming y types compartidos
9. **#10, #11** - Tests y eslint

---

## ✅ DECISIONES ARQUITECTÓNICAS PENDIENTES

### 1. **¿El `id` del evento se genera en cliente o servidor?**

**Opción A - Cliente (actual):**
```tsx
const eventId = crypto.randomUUID();
```
- ✅ Mejor para optimistic updates (ID consistente)
- ✅ No necesita round-trip
- ❌ Posible colisión (muy improbable con UUID)

**Opción B - Servidor:**
```tsx
// Prisma genera el ID
id: cuid() // o @default(uuid())
```
- ✅ Más seguro (no colisiones)
- ❌ Optimistic update necesita ID temporal
- ❌ Reemplazo de ID temporal → ID real es complejo

**Recomendación:** Cliente (actual) es válido, solo arreglar browser compat (#3).

---

### 2. **¿Qué datos del Task necesita el calendario para rendering?**

**Actual:** Solo `title`

**Posibles necesidades futuras:**
- `color` del proyecto (para el event)
- `projectId` (para filtros)
- `description` (para tooltip)
- `status` (para estilos)

**Recomendación:** Definir ahora qué se necesita para evitar refactor después (#7).

---

### 3. **¿Cómo manejar errores de creación?**

**Opciones:**
- **A)** Toast global (simple)
- **B)** Inline error en el calendar slot (mejor UX, más complejo)
- **C)** Ambos

**Recomendación:** Empezar con A (toast), considerar B después.

---

## 📝 CHECKLIST DE IMPLEMENTACIÓN

### Sprint actual (críticos):
- [ ] #2 - Agregar null checks en `SideCalendarTimeSlotWrapper`
- [ ] #3 - Crear `lib/utils/id.ts` con `generateId()` + fallback
- [ ] #4 - Agregar error toast en mutation
- [ ] #5 - Fix `onSettled` para usar `variables` en vez de `data`

### Sprint siguiente (importantes):
- [ ] #1 - Fix dependencies del useEffect en `useDroppableCalendarSlot`
- [ ] #6 - Decidir estrategia Date vs string y refactorizar
- [ ] #7 - Decidir qué datos del Task se necesitan y actualizar drag data

### Backlog (mejoras):
- [ ] #8 - Renombrar tags para claridad
- [ ] #9 - Crear tipos compartidos para drag data
- [ ] #10 - Completar tests de factories
- [ ] #11 - Mover eslint-disable a inline

---

## 🎯 ESTIMACIÓN DE ESFUERZO

| Prioridad | Items | Esfuerzo Total |
|-----------|-------|----------------|
| 🔴 Crítico | 4 items | ~2 horas |
| 🟠 Importante | 3 items | ~4 horas |
| 🟡 Mejoras | 4 items | ~2 horas |
| **TOTAL** | **11 items** | **~8 horas** |

---

## 📚 REFERENCIAS

- [React Query Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [crypto.randomUUID() browser support](https://caniuse.com/mdn-api_crypto_randomuuid)
- [pragmatic-drag-and-drop docs](https://atlassian.design/components/pragmatic-drag-and-drop)
- [Next.js cache revalidation](https://nextjs.org/docs/app/building-your-application/caching)

---

**Notas finales:**
- El código tiene buena base arquitectónica
- Los problemas críticos son relativamente fáciles de arreglar
- Mayoría son edge cases y mejoras de robustez
- No hay "code smells" graves ni anti-patterns mayores

**Siguiente paso sugerido:** Implementar los 4 ítems críticos antes de mergear a main.
