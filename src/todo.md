# Plan App - Todo List

## 🚀 Active Sprint: Calendar Events - Backend & Drag-Drop (2 weeks)

### 📋 EPIC: Schedule Tasks via Calendar Drag & Drop

**Goal:** Users can drag tasks into calendar to create 30min events

**Scope MVP:**

- ✅ Display today's events in calendar
- ✅ Drag task → calendar → create event (30min default)
- ✅ Highlight current project events visually
- ⏳ Backend: Create + List only (edit/delete post-MVP)

**Tech Stack:**

- Domain: date-fns for date manipulation
- Data: Prisma with CalendarEvent model
- DnD: @atlaskit/pragmatic-drag-and-drop
- Calendar: react-big-calendar

---

### ✅ Phase 1: Backend Foundation (TDD) - IN PROGRESS

**Est: 2-3h** | **Test Coverage: Required**

#### Domain Layer

- [x] Factory: `buildCreateCalendarEventData()` ✅
- [x] Validation: `validateCalendarEventDateRange()` ✅
- [x] Test: Factory calculates endTime (+30min)
- [x] Test: Validation rejects endTime < startTime
- [ ] Test: Validation rejects duration > 8h (optional)

#### Data Layer - Repository

- [x] Interface: Add `getByUserAndDate(userId: string, date: Date)`
- [x] Real repo: Implement with Prisma
  - [x] Query: `where: { userId, date }`
  - [x] Include: `{ task: true }` (for title, projectId)
  - [x] Order by: `startTime ASC`
- [x] Fake repo: Implement in-memory filter
- [x] Test: Returns events for user + date
- [x] Test: Returns empty array if no events
- [x] Test: Filters by date correctly
- [x] Test: Does not return other users' events
- [ ] Test: Includes task data populated
- [x] Test: Sorts by startTime

**Output:** Repository has `create()` + `getByUserAndDate()` methods

---

### 📋 Phase 2: Use Cases (TDD)

**Est: 1-2h** | **Test Coverage: Required**

#### getEventsForDay

- [x] Use Case: `getEventsForDay(userId, date, repo)`
- [x] Test: Calls repo.getByUserAndDate correctly
- [x] Test: Returns events with result pattern
- [x] Test: Handles empty results
- [x] Test: Handles repo errors

#### createCalendarEvent (update existing)

- [x] Update to use factory for endTime/date calculation
- [x] Test: Creates with calculated endTime
- [x] Test: Extracts date correctly
- [x] Test: Calls validation before repo

**Output:** Both use cases tested and working

---

### 📋 Phase 3: Application Layer (No Tests)

**Est: 1h** | **Test Coverage: Skipped per decision**

#### Server Query

- [x] Create `calendar-events.queries.ts`
- [x] Function: `getEventsForDayQuery(date: Date)`
- [x] Wrap with `unstable_cache`
- [x] Tag format: `calendar-events-YYYY-MM-DD`
- [x] Return CalendarEvent[] with tasks

#### Schema

- [ ] Create `calendar-event.schema.ts`
- [ ] Fields: `taskId` (uuid), `startTime` (datetime)
- [ ] Export CreateCalendarEventSchema type

#### Server Action

- [x] Create `calendar-events.actions.ts`
- [x] Action: `createCalendarEventAction(data)`
- [ ] Validate with schema
- [x] Get userId from session
- [x] Call use case with real repo
- [x] On success: `revalidateTag(calendar-events-${date})`
- [x] Return result pattern

**Output:** Query + Action ready for UI consumption

---

### 📋 Phase 4: Presentation Base (No Tests)

**Est: 2-3h** | **Test Coverage: Components not tested**

#### Context Provider

- [ ] Create `CalendarEventsProvider.tsx`
- [ ] Props: `initialEvents`, `date`
- [ ] State: `useOptimistic` for events
- [ ] Methods: `addOptimisticEvent(event)`
- [ ] Hook: `useCalendarEvents()` with context

#### Layout Integration

- [ ] In dashboard layout (server):
  - [ ] Fetch: `getEventsForDayQuery(new Date())`
  - [ ] Wrap children with provider
  - [ ] Pass initialEvents + date

#### Calendar Display

- [ ] Update `DayCalendar.tsx`:
  - [ ] Use `useCalendarEvents()` hook
  - [ ] Map events to big-calendar format
  - [ ] Implement `eventStyleGetter`:
    - [ ] Detect current projectId from URL
    - [ ] Highlight if `event.task.projectId === projectId`
    - [ ] Colors: primary (highlight) / muted (normal)
  - [ ] Event title: `event.task.title`

**Output:** Calendar shows today's events with highlighting

---

### 📋 Phase 5: Drag & Drop ⚠️ (No Tests)

**Est: 3-4h** | **Most Complex** | **Drop calculation TBD**

#### Setup

- [ ] Install: `@atlaskit/pragmatic-drag-and-drop`
- [ ] Install: `@atlaskit/pragmatic-drag-and-drop-react-drop-indicator`

#### TaskCard - Drag Source

- [ ] Import `draggable` from pragmatic-dnd
- [ ] Add ref to article element
- [ ] Setup: `draggable({ element, getInitialData })`
- [ ] Data: `{ taskId: task.id }`
- [ ] Visual feedback: cursor, opacity on drag

#### DayCalendar - Drop Target

- [ ] Import `dropTargetForElements`
- [ ] Add ref to calendar container
- [ ] Setup: `dropTargetForElements({ element, onDrop })`
- [ ] **TBD**: Calculate startTime from drop position
  - Options to explore during implementation:
    - A) Mouse Y coords → time calculation
    - B) Activate selection mode + use `onSelectSlot`
    - C) Hybrid approach
- [ ] On drop:
  - [ ] Get taskId from `source.data`
  - [ ] Calculate startTime (30min slot)
  - [ ] Create optimistic event with factory
  - [ ] Call `addOptimisticEvent()`
  - [ ] Trigger `createCalendarEventAction()`
  - [ ] On error: Toast + manual rollback

**Note:** Drop position → time calculation to be solved during implementation

**Output:** Fully functional drag & drop creating events

---

### 🎯 Definition of Done

- [ ] All Phase 1-2 TDD tests passing (domain, data, use cases)
- [ ] Calendar displays today's events on load
- [ ] Events include task.title and task.projectId
- [ ] Project events highlighted when on project page
- [ ] Drag task from list → drop on calendar → event created
- [ ] Optimistic update shows event immediately
- [ ] Server action persists to database
- [ ] Error handling with rollback works
- [ ] Tag revalidation updates UI correctly

---

### 📊 Progress Tracking

- **TDD Coverage:** Phase 1-2 (~30% of sprint)
- **No Tests:** Phase 3-5 (~70% of sprint)
- **Estimated Total:** 9-13 hours
- **Most Uncertain:** Phase 5 drop calculation (may take longer)

---

## ✅ Completed Sprints

<details>
<summary><strong>Sprint 1: Responsive Design (2 weeks) - COMPLETED ✅</strong></summary>

### 🎨 EPIC: Dashboard Responsive Layout

**Goal:** Adapt 3-column layout (Sidebar | Main | Calendar) for mobile/tablet/desktop

**Breakpoints:** Mobile < 768px | Tablet 768-1280px | Desktop > 1280px

**Stack:** shadcn Sheet, Tailwind breakpoints

---

### ✅ Fase 0: Foundation (1d) - COMPLETED

- [x] Create breakpoints config
- [x] Refactor layout with responsive classes
- [x] Install shadcn Sheet component
- [x] Verify no visual regressions

---

### ✅ Fase 1: Sidebar Drawer (1d) - COMPLETED

- [x] Create `MobileSidebarDrawer` component
- [x] Add hamburger button (☰) in mobile header
- [x] Hide Sidebar on < 1280px, show drawer
- [x] Drawer from left, 80% width max 280px
- [x] Click outside / Escape closes

**Behavior:** Desktop visible | Tablet/Mobile drawer

---

### ✅ Fase 2: Calendar Visibility (1d) - COMPLETED

- [x] Create `MobileCalendarDrawer` component
- [x] Add calendar button (📅) in mobile header
- [x] Calendar visible on >= 768px
- [x] Drawer from right on mobile, 85% width
- [x] Leave space for cancel zone

**Behavior:** Desktop/Tablet visible | Mobile drawer

---

### 📋 Fase 3: Drag & Drop Desktop/Tablet (2d) - MOVED TO CURRENT SPRINT

- See "Active Sprint: Calendar Events" above

---

### 📋 Fase 4: Drag Direccional Mobile (3d) - BACKLOG

- Implement drag direction detection
- Thresholds: `deltaX > 150px` = open calendar
- Allow drop inside drawer
- Distinguish: scroll (vertical) vs kanban (<50px) vs calendar (>150px)

**Note:** Post-MVP - Complex, needs more planning

---

### 📋 Fase 5: Tutorial/Onboarding (1d) - BACKLOG

- Create `OnboardingTutorial` component
- Detect first visit (localStorage)
- Show "Drag → to schedule" hint

**Note:** Post-MVP

---

### 📋 Fase 6: Schedule Button Fallback (1d) - BACKLOG

- Add "📅 Schedule" button in TaskCard
- Only visible on mobile (< 768px)
- Opens calendar drawer with task pre-selected

**Why:** Fallback for users who don't discover drag

</details>

---

## 🚧 Pending Architecture Improvements

### 1. **Middleware Rules Pattern** (Optional - Future)

- [ ] Implement Chain of Responsibility pattern for middleware redirects
- [ ] Create `lib/middleware/rules/` structure
- [ ] Add `authErrorRedirect` rule for login error handling

---

## 📊 Backlog (Later)

### Features

- Mobile drag direction detection (Responsive Sprint - Fase 4)
- Onboarding tutorial (Responsive Sprint - Fase 5)
- Schedule button fallback mobile (Responsive Sprint - Fase 6)
- Edit calendar events (drag to move)
- Delete calendar events
- Create task + event simultaneously
- Event validation (overlaps, business hours)
- Handle day change at midnight

### Technical

- Language switcher UI component
- Analytics setup
- Performance optimization
- Error tracking
- Error boundary
- Test coverage analysis (Copilot agent)

---

## 📝 Notes & Decisions

### Calendar Events Sprint

- **Date field in schema:** Used for fast indexing (`WHERE userId AND date`), must match startTime date
- **Transaction handling:** Non-transactional for MVP (create task + event separately, orphan task OK if event fails)
- **Drop calculation:** TBD during Phase 5 implementation, multiple approaches to explore
- **Highlight logic:** Simple for MVP (primary/muted colors), real project colors post-MVP
- **No tests for:** Server actions, hooks, components (per project philosophy)
- **TDD required for:** Domain, data layer, use cases
