# Plan App - Todo List

## 🚀 Active Sprint: Mobile Drag & Drop

**Goal:** Implement directional drag detection to schedule tasks from mobile by dragging right to open calendar drawer and drop.

**Scope MVP:**

- Detect drag direction (horizontal vs vertical)
- Threshold: `deltaX > 150px` = open calendar drawer
- Allow drop inside drawer to create event
- Distinguish: scroll (vertical) vs kanban (<50px) vs calendar (>150px)
- Visual feedback during drag (arrow indicator, haptic feedback)

**Tech Stack:**

- @atlaskit/pragmatic-drag-and-drop
- react-big-calendar (inside drawer)
- Custom gesture detection logic
- Tailwind for visual feedback

---

### 📋 Phase 1: Gesture Detection Infrastructure

**Est: 1-2h** | **Test Coverage: Optional (gesture logic complex to unit test)**

#### Drag Direction Detector

- [ ] Create `useDragDirection` hook
- [ ] Track drag start position (touchstart/mousedown)
- [ ] Calculate delta: `deltaX`, `deltaY` on move
- [ ] Determine direction: `Math.abs(deltaX) > Math.abs(deltaY)` = horizontal
- [ ] Thresholds:
  - `deltaY > 50px && deltaX < 50px` = scroll (cancel drag)
  - `deltaX > 50px && deltaX < 150px` = kanban drag
  - `deltaX > 150px` = calendar trigger
- [ ] Return: `{ direction: 'vertical' | 'horizontal', distance: number, shouldOpenCalendar: boolean }`

**Output:** Hook that detects drag direction and thresholds

---

### 📋 Phase 2: Calendar Drawer Integration

**Est: 2-3h** | **Test Coverage: Skipped (UI integration)**

#### Mobile Calendar Drawer Updates

- [ ] Update `MobileCalendarDrawer.tsx`:
  - [ ] Add `isOpen` state controlled by parent
  - [ ] Add `onOpen` prop (called when drag > 150px)
  - [ ] Add `onTaskDrop` prop (receives taskId + time)
  - [ ] Auto-open when drag threshold reached
  - [ ] Close when task dropped or canceled

#### TaskCard Mobile Drag

- [ ] Update `TaskCard.tsx` (mobile only):
  - [ ] Use `useDragDirection` hook
  - [ ] On `deltaX > 150px`:
    - [ ] Trigger calendar drawer open
    - [ ] Show visual indicator (→ arrow, "Release to schedule")
    - [ ] Optional: haptic feedback (if available)
  - [ ] On drop inside calendar:
    - [ ] Get `taskId` from drag data
    - [ ] Calculate `startTime` from drop position
    - [ ] Create calendar event
    - [ ] Close drawer
  - [ ] On cancel (drag back or escape):
    - [ ] Reset state
    - [ ] Close drawer

**Output:** Mobile drag opens calendar, allows drop, creates event

---

### 📋 Phase 3: Visual Feedback & Polish

**Est: 1-2h** | **Test Coverage: Skipped (visual/UX)**

#### Drag Indicators

- [ ] Create drag overlay component:
  - [ ] Show arrow (→) when `deltaX > 100px`
  - [ ] Change to ✓ when over calendar drop zone
  - [ ] Fade out on drop/cancel
- [ ] Add CSS transitions for smooth drawer open
- [ ] Add haptic feedback (iOS/Android) if supported
- [ ] Color coding:
  - [ ] Primary color when dragging right
  - [ ] Success color when over drop zone
  - [ ] Muted when canceled

#### Edge Cases

- [ ] Handle scroll vs drag conflict
- [ ] Prevent accidental triggers during normal scrolling
- [ ] Handle rapid swipes (velocity detection)
- [ ] Test with different screen sizes (small phones)
- [ ] Ensure accessible alternative (schedule button exists)

**Output:** Polished UX with clear visual feedback

---

### 🎯 Definition of Done

- [ ] Drag task right > 150px opens calendar drawer
- [ ] Visual feedback (arrow indicator) during drag
- [ ] Drop task in calendar creates 30min event
- [ ] Distinguishes scroll (vertical) vs drag (horizontal)
- [ ] Doesn't interfere with kanban drag (<50px)
- [ ] Works on iOS Safari + Android Chrome
- [ ] Accessible fallback (schedule button) available
- [ ] No regressions on desktop/tablet drag & drop

---

### 📊 Progress Tracking

- **Estimated Total:** 4-7 hours
- **Complexity:** High (gesture detection, mobile-specific)
- **Testing:** Manual testing on real devices required
- **Dependencies:** Desktop/tablet drag & drop already working

---

## ✅ Completed Sprints

<details>
<summary><strong>Sprint 2: Calendar Events - Backend & Drag-Drop (2 weeks) - COMPLETED ✅</strong></summary>

### 📋 EPIC: Schedule Tasks via Calendar Drag & Drop

**Goal:** Users can drag tasks into calendar to create 30min events

**Scope MVP:**

- ✅ Display today's events in calendar
- ✅ Drag task → calendar → create event (30min default)
- ✅ Highlight current project events visually
- ✅ Backend: Create + List (edit/delete post-MVP)

**Tech Stack:**

- Domain: date-fns for date manipulation
- Data: Prisma with CalendarEvent model
- DnD: @atlaskit/pragmatic-drag-and-drop
- Calendar: react-big-calendar

---

### ✅ Phase 1: Backend Foundation (TDD) - COMPLETED

**Test Coverage: Required**

#### Domain Layer

- [x] Factory: `buildCreateCalendarEventData()` ✅
- [x] Validation: `validateCalendarEventDateRange()` ✅
- [x] Test: Factory calculates endTime (+30min)
- [x] Test: Validation rejects endTime < startTime

#### Data Layer - Repository

- [x] Interface: Add `getByUserAndDate(userId: string, date: Date)`
- [x] Real repo: Implement with Prisma
- [x] Fake repo: Implement in-memory filter
- [x] Tests: Returns events, filters by date, sorts by startTime

---

### ✅ Phase 2: Use Cases (TDD) - COMPLETED

- [x] Use Case: `getEventsForDay(userId, date, repo)`
- [x] Use Case: `createCalendarEvent` with factory
- [x] Tests: Repo calls, error handling, validation

---

### ✅ Phase 3: Application Layer - COMPLETED

- [x] Create `calendar-events.queries.ts` with caching
- [x] Create `calendar-events.actions.ts` with revalidation
- [x] Schema validation for inputs

---

### ✅ Phase 4: Presentation Base - COMPLETED

- [x] `CalendarEventsProvider` with `useOptimistic`
- [x] `useCalendarEvents()` hook
- [x] Layout integration with server data
- [x] Calendar display with event highlighting

---

### ✅ Phase 5: Drag & Drop Desktop/Tablet - COMPLETED

- [x] TaskCard as drag source
- [x] DayCalendar as drop target
- [x] Drop position → time calculation
- [x] Optimistic updates + server action
- [x] Error handling with rollback

---

**Notes:**

- Date field in schema used for fast indexing
- Non-transactional for MVP (create task + event separately)
- Highlight logic: primary/muted colors (project colors post-MVP)
- TDD for domain/data/use cases, no tests for UI layers

</details>

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

---

### ✅ Fase 1: Sidebar Drawer (1d) - COMPLETED

- [x] Create `MobileSidebarDrawer` component
- [x] Add hamburger button (☰) in mobile header
- [x] Hide Sidebar on < 1280px, show drawer
- [x] Drawer from left, 80% width max 280px

**Behavior:** Desktop visible | Tablet/Mobile drawer

---

### ✅ Fase 2: Calendar Visibility (1d) - COMPLETED

- [x] Create `MobileCalendarDrawer` component
- [x] Add calendar button (📅) in mobile header
- [x] Calendar visible on >= 768px
- [x] Drawer from right on mobile, 85% width

**Behavior:** Desktop/Tablet visible | Mobile drawer

---

### ✅ Fase 3: Drag & Drop Desktop/Tablet (2d) - COMPLETED

- See Sprint 2: Calendar Events above

</details>

---

## 📊 Backlog (Later)

### Features

- Onboarding tutorial (first-time user hints)
- Schedule button fallback for mobile (alternative to drag)
- Edit calendar events (drag to move time)
- Delete calendar events
- Create task + event simultaneously
- Event validation (overlaps, business hours)
- Handle day change at midnight
- Real project colors in calendar (vs primary/muted)

### Technical

- Middleware rules pattern (Chain of Responsibility)
- Language switcher UI component
- Analytics setup
- Performance optimization
- Error tracking & boundary
- Test coverage analysis

---

## 📝 Notes & Decisions

### Mobile Drag & Drop Sprint

- **Gesture detection:** Custom hook vs library (TBD during implementation)
- **Haptic feedback:** Progressive enhancement (if device supports)
- **Scroll conflict:** Vertical drag > 50px cancels horizontal drag
- **Accessibility:** Schedule button remains as fallback
- **Testing:** Requires manual testing on real iOS/Android devices

### General

- **TDD Philosophy:** Required for domain/data/use cases, optional for UI
- **Architecture:** Clean Architecture with functional approach (no classes)
- **Testing Stack:** Jest (unit) + RTL (integration) + Cypress (E2E)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
