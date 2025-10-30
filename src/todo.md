# Plan App - Todo List

## 🎯 Recent Achievements

### 🚧 Pending Architecture Improvements

#### 1. **Middleware Rules Pattern** (Optional - Future)
- [ ] Implement Chain of Responsibility pattern for middleware redirects
- [ ] Create `lib/middleware/rules/` structure
- [ ] Add `authErrorRedirect` rule for login error handling
- [ ] Enable adding redirect rules without touching core middleware

#### 2. **Repository Testing** (Optional - If complexity grows)
- [ ] Add tests for `createProjectsRepository` factory
- [ ] Add tests for fake repositories (if they grow in complexity)

---

## 🔥 i18n URL-Based Routing - Final Tasks

### 🚧 Pending

#### 1. **Middleware: OAuth Error Redirects**
- [ ] Modify `src/proxy.ts` to intercept `/api/auth/signin?error=...`
- [ ] Redirect OAuth errors to `/{locale}/auth/error?error=...`
- [ ] Extract locale from Referer header or URL
- [ ] Test: OAuth error should redirect with correct locale

---

## 🎯 Current Focus: Core Features (After i18n)

### Task Management (PRIORITY)

- [ ] Task creation form with validation (TDD)
- [ ] Task list view
- [ ] Task edit functionality
- [ ] Task deletion
- [ ] Task type handling (one_time/recurrent)

### Project Management

- [ ] Project creation
- [ ] Project list
- [ ] Link Tasks to Projects
- [ ] Project color picker

### Calendar Events

- [ ] Create Calendar event from Task
- [ ] Display scheduled tasks
- [ ] Mark events as completed

### Tags

- [ ] Tag creation
- [ ] Assign tags to tasks
- [ ] Filter by tags

---

## 📊 Backlog (Later)

- Language switcher UI component
- Analytics setup
- Performance optimization
- Error tracking
- Language switcher component
- Error boundary
- Create copilot agents to analyze test coverage and suggest improvements for the test suite.
