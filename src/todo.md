# Plan App - Todo List

## 🚀 Active Sprint: Responsive Design (2 weeks)

### 🎨 EPIC: Dashboard Responsive Layout
**Goal:** Adapt 3-column layout (Sidebar | Main | Calendar) for mobile/tablet/desktop

**Breakpoints:** Mobile < 768px | Tablet 768-1280px | Desktop > 1280px

**Stack:** dnd-kit (pending install), shadcn Sheet, Tailwind breakpoints

---

### ✅ Fase 0: Foundation (1d) - IN PROGRESS
- [x] Create breakpoints config
- [x] Refactor layout with responsive classes
- [x] Install shadcn Sheet component
- [x] Verify no visual regressions

---

### 📋 Fase 1: Sidebar Drawer (1d)
- [x] Create `MobileSidebarDrawer` component
- [x] Add hamburger button (☰) in mobile header
- [x] Hide Sidebar on < 1280px, show drawer
- [x] Drawer from left, 80% width max 280px
- [x] Click outside / Escape closes

**Behavior:** Desktop visible | Tablet/Mobile drawer

---

### 📋 Fase 2: Calendar Visibility (1d)
- [x] Create `MobileCalendarDrawer` component
- [x] Add calendar button (📅) in mobile header
- [x] Calendar visible on >= 768px
- [x] Drawer from right on mobile, 85% width
- [x] Leave space for cancel zone

**Behavior:** Desktop/Tablet visible | Mobile drawer

---

### 📋 Fase 3: Drag & Drop Desktop/Tablet (2d)
- [ ] **Install & configure pragmatic-drag-and-drop** ← Reviewing options
- [ ] Make TaskCard draggable (dnd-kit)
- [ ] Create drop zones in Calendar slots
- [ ] Implement `scheduleTaskAction` Server Action
- [ ] Add visual feedback (shadow, highlight)
- [ ] Optimistic updates + rollback on error
- [ ] Only active on >= 768px

**Flow:** Drag task → Drop on slot → Create CalendarEvent

---

### 📋 Fase 4: Drag Direccional Mobile (3d) - COMPLEX
- [ ] Implement drag direction detection
- [ ] Thresholds: `deltaX > 150px` = open calendar
- [ ] Calendar drawer opens on right drag
- [ ] Allow drop inside drawer
- [ ] Add cancel zone (left space or X button)
- [ ] Distinguish: scroll (vertical) vs kanban (<50px) vs calendar (>150px)

**Note:** Can move to post-MVP if needed

---

### 📋 Fase 5: Tutorial/Onboarding (1d) - OPTIONAL
- [ ] Create `OnboardingTutorial` component
- [ ] Detect first visit (localStorage)
- [ ] Show "Drag → to schedule" hint
- [ ] Skip button
- [ ] Don't show again after complete

**Note:** Post-MVP candidate

---

### 📋 Fase 6: Schedule Button Fallback (1d) - MVP
- [ ] Add "📅 Schedule" button in TaskCard
- [ ] Only visible on mobile (< 768px)
- [ ] Opens calendar drawer with task pre-selected
- [ ] Click slot → Create event
- [ ] Optimistic update

**Why:** Fallback for users who don't discover drag

---

### 🎯 MVP Scope (10d)
✅ Phases 0-3 + Phase 6
- Desktop/Tablet: Full drag & drop
- Mobile: Schedule button (no drag yet)

### 🚀 Post-MVP (+3d)
- Phase 4: Mobile drag
- Phase 5: Tutorial

---

## 🚧 Pending Architecture Improvements

### 1. **Middleware Rules Pattern** (Optional - Future)
- [ ] Implement Chain of Responsibility pattern for middleware redirects
- [ ] Create `lib/middleware/rules/` structure
- [ ] Add `authErrorRedirect` rule for login error handling

---

## 📊 Backlog (Later)
- Language switcher UI component
- Analytics setup
- Performance optimization
- Error tracking
- Error boundary
- Test coverage analysis (Copilot agent)
