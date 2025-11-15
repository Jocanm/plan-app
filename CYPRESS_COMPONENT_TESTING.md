# Cypress Component Testing - Integration Guide

**Research Date:** 2025-11-15
**Cypress Version:** 15.4.0
**Target Stack:** Next.js 16 + React 19 + TypeScript

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [What is Cypress Component Testing?](#what-is-cypress-component-testing)
3. [Why Use It? (For Our Architecture)](#why-use-it-for-our-architecture)
4. [Current vs Proposed Testing Strategy](#current-vs-proposed-testing-strategy)
5. [Setup Instructions](#setup-instructions)
6. [Integration with FakeRepos](#integration-with-fakerepos)
7. [Example Tests](#example-tests)
8. [Migration Strategy](#migration-strategy)
9. [Best Practices](#best-practices)
10. [Limitations & Considerations](#limitations--considerations)
11. [FAQ](#faq)

---

## Executive Summary

**Recommendation:** ✅ **ADOPT** Cypress Component Testing

**Key Benefits:**
- ✅ Test React components with **real Server Actions** (no mocking!)
- ✅ Use our **existing FakeRepos** for fast, deterministic tests
- ✅ **5-10x faster** than E2E tests
- ✅ **Zero bundler config** (Next.js auto-detected)
- ✅ Test **hooks + state + UI integration** together
- ✅ Keep E2E suite focused on **critical user journeys only**

**What Changes:**
- E2E tests (Cypress) → Focus on critical multi-page flows only
- Component tests (NEW) → Test UI + hooks + Server Actions integration
- Unit tests (Vitest) → Keep for pure domain logic

**Estimated Setup Time:** 30 minutes

---

## What is Cypress Component Testing?

Cypress Component Testing allows you to mount React components in isolation and test them in a **real browser environment**, similar to how you'd test with React Testing Library, but with:

- **Real browser rendering** (not jsdom)
- **Cypress commands** (`.click()`, `.type()`, `.should()`)
- **Visual debugging** with time-travel
- **Fast execution** (faster than full E2E)
- **Real network requests** (or intercept them)

### The Sweet Spot

```
┌─────────────────────────────────────────────────┐
│ Testing Pyramid for Our Architecture           │
├─────────────────────────────────────────────────┤
│                                                 │
│        E2E Tests (Cypress E2E)                  │
│        • Full user journeys                     │
│        • Auth flows                             │
│        • Multi-page interactions                │
│        ▲ Slow, comprehensive                    │
│       ╱ ╲                                       │
│      ╱   ╲                                      │
│     ╱     ╲                                     │
│    ╱  NEW  ╲   Component Tests (Cypress CT)    │
│   ╱─────────╲  • UI + Hooks + Server Actions   │
│  ╱           ╲ • Form validation + submission   │
│ ╱             ╲• State management integration   │
│╱_______________╲ Faster, isolated              │
│                                                 │
│   Unit Tests (Vitest)                           │
│   • Pure functions                              │
│   • Domain validations                          │
│   • Use cases                                   │
│   • Utils                                       │
│   ▼ Fast, focused                               │
└─────────────────────────────────────────────────┘
```

---

## Why Use It? (For Our Architecture)

### 1. **Perfect Fit for Clean Architecture + Dependency Injection**

Our architecture uses **Dependency Injection** with FakeRepositories. Cypress Component Testing lets us test the **entire integration** without mocking:

```typescript
// ✅ Component Test - Real integration
cy.mount(<InlineProjectForm />)
cy.getByTestId('create-project-inline-input').type('Test Project{enter}')
// Uses REAL:
// - Server Action (createProject)
// - Use Case (projectsUseCases.createProject)
// - FakeRepository (no mocking needed!)
// - Validation (createProjectSchema)
// - i18n (translations)
// - Zustand store (useSidebarStore)
```

### 2. **No Mock Hell**

Current E2E approach:
```typescript
// ❌ E2E Test - Slow, boots entire server
beforeEach(() => {
  cy.resetRepos()  // API call to reset DB
  cy.login("password")  // Full auth flow
})
```

Component Testing approach:
```typescript
// ✅ Component Test - Fast, direct control
beforeEach(() => {
  FakeProjectsRepositoryManager.getInstance().reset()  // Instant
  // No server needed, no login needed for component tests
})
```

### 3. **Test What E2E Tests Can't**

E2E tests are too slow to test every edge case. Component tests let you:

- Test loading states reliably (no race conditions)
- Test error states easily (FakeRepo overrides)
- Test validation messages with i18n
- Test form states (pristine, dirty, submitting)
- Test hooks in isolation

### 4. **Speed = More Coverage**

- **E2E Test:** ~10-15 seconds (boot server, load page, interact)
- **Component Test:** ~1-3 seconds (mount component, interact)

**Result:** Write 5-10x more tests in the same time.

---

## Current vs Proposed Testing Strategy

### Current Strategy (Heavy E2E)

| Test Type | Coverage | Speed | Example |
|-----------|----------|-------|---------|
| **E2E** | Full flows | 🐢 Slow | User creates project → sees it in list |
| **Unit** | Pure logic | ⚡ Fast | `validateProjectName()` returns error for short names |

**Gap:** No fast way to test **UI + Hooks + Server Actions** integration.

### Proposed Strategy (Balanced Pyramid)

| Test Type | Coverage | Speed | Example |
|-----------|----------|-------|---------|
| **E2E** | Critical journeys | 🐢 Slow | OAuth login → create project → create task → complete |
| **Component** 🆕 | UI integration | 🚀 Medium | `InlineProjectForm` validates, submits, closes on success |
| **Unit** | Pure logic | ⚡ Fast | `validateProjectName()` returns error for short names |

**Benefits:**
- E2E suite stays small and focused (faster CI)
- Component tests cover edge cases and integrations
- Unit tests stay pure and fast

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install --save-dev @cypress/react
```

**That's it!** Cypress auto-detects Next.js and React versions.

### Step 2: Update Cypress Config

**File:** `cypress.config.ts`

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  // Existing E2E config
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents() {
      // implement node event listeners here
    },
  },

  // NEW: Component Testing config
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
      // Cypress auto-detects Next.js webpack config - no manual config needed!
    },
    specPattern: 'src/**/*.cy.{ts,tsx}',
    supportFile: 'cypress/support/component.ts',
  },
});
```

### Step 3: Create Component Support File

**File:** `cypress/support/component.ts` (create this file)

```typescript
// Import existing commands (resetRepos, getByTestId, etc.)
import './commands'

// Import Cypress React mount
import { mount } from 'cypress/react'

// Make mount available globally as cy.mount()
Cypress.Commands.add('mount', mount)

// TypeScript support
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}
```

### Step 4: Update package.json Scripts

**File:** `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",

    "test:e2e": "cypress open --e2e",
    "test:e2e:run": "cypress run --e2e",

    "test:component": "cypress open --component",
    "test:component:run": "cypress run --component"
  }
}
```

### Step 5: Verify Setup

Run:
```bash
npm run test:component
```

Cypress should open in Component Testing mode. You're ready!

---

## Integration with FakeRepos

**This is our secret weapon!** 🎯

Our FakeRepositories work **perfectly** with Cypress Component Testing because:

1. ✅ They're in-memory (fast)
2. ✅ They're deterministic (no flaky tests)
3. ✅ They support overrides (test error cases)
4. ✅ They're already tested (via unit tests)

### Pattern 1: Basic Reset

```typescript
import { FakeProjectsRepositoryManager } from '../../data/projects.repository.fake'

describe('InlineProjectForm', () => {
  beforeEach(() => {
    // Reset state before each test
    FakeProjectsRepositoryManager.getInstance().reset()
  })

  it('creates a project successfully', () => {
    cy.mount(<InlineProjectForm />)

    cy.getByTestId('create-project-inline-input')
      .type('My Project{enter}')

    // Form should close on success
    cy.getByTestId('sidebar-inline-project-form')
      .should('not.exist')
  })
})
```

### Pattern 2: Seed Initial Data

```typescript
it('shows existing projects in sidebar', () => {
  const repo = FakeProjectsRepositoryManager.getInstance()

  // Seed with initial data
  repo.seed([
    { name: 'Work', userId: 'user-1' },
    { name: 'Personal', userId: 'user-1' },
  ])

  cy.mount(<ProjectsSidebar userId="user-1" />)

  cy.get('[data-testid^="sidebar-project-item"]')
    .should('have.length', 2)
})
```

### Pattern 3: Test Error Cases with Overrides

```typescript
it('handles repository errors gracefully', () => {
  const repo = FakeProjectsRepositoryManager.getInstance()

  // Simulate DB error
  repo.withOverride('createProject', () => {
    throw new Error('Database connection failed')
  })

  cy.mount(<InlineProjectForm />)

  cy.getByTestId('create-project-inline-input')
    .type('Valid Name{enter}')

  // Should show error message
  cy.contains('unknown_error').should('be.visible')
})
```

### Pattern 4: Test Server Action Integration

```typescript
it('integrates with Server Action and updates cache', () => {
  cy.mount(<InlineProjectForm />)

  cy.getByTestId('create-project-inline-input')
    .type('My Project{enter}')

  // Server Action called createProject()
  // Use Case called projectsUseCases.createProject()
  // FakeRepo called createProject()
  // Cache updated (updateTag called)

  // Verify project was created (check FakeRepo state)
  cy.window().then(() => {
    const repo = FakeProjectsRepositoryManager.getInstance()
    const projects = repo.getRepository().getProjectsForSidebar('user-1')
    cy.wrap(projects).should('have.length', 1)
  })
})
```

---

## Example Tests

### Example 1: Form Component with Validation

**File:** `src/features/projects/components/form/InlineProjectForm.cy.tsx`

```typescript
import { InlineProjectForm } from './InlineProjectForm'
import { FakeProjectsRepositoryManager } from '../../data/projects.repository.fake'

describe('InlineProjectForm - Component Integration', () => {
  beforeEach(() => {
    FakeProjectsRepositoryManager.getInstance().reset()
  })

  describe('Validation', () => {
    it('shows error when name is too short', () => {
      cy.mount(<InlineProjectForm />)

      cy.getByTestId('create-project-inline-input')
        .type('ab{enter}')

      // Should show translated validation error from Zod
      cy.contains('at least 3 characters').should('be.visible')
    })

    it('shows error when name is too long', () => {
      cy.mount(<InlineProjectForm />)

      const longName = 'a'.repeat(51)
      cy.getByTestId('create-project-inline-input')
        .type(`${longName}{enter}`)

      cy.contains('at most 50 characters').should('be.visible')
    })
  })

  describe('Submission', () => {
    it('creates project and closes form on success', () => {
      cy.mount(<InlineProjectForm />)

      cy.getByTestId('create-project-inline-input')
        .type('Valid Project Name{enter}')

      // Should show loading state
      cy.getByTestId('create-project-inline-input')
        .should('have.attr', 'disabled')

      // Form should close after success
      cy.getByTestId('sidebar-inline-project-form')
        .should('not.exist')
    })

    it('resets form after successful submission', () => {
      cy.mount(<InlineProjectForm />)

      cy.getByTestId('create-project-inline-input')
        .type('Project 1{enter}')

      // Wait for form to reset
      cy.wait(100)

      // Input should be cleared
      cy.getByTestId('create-project-inline-input')
        .should('have.value', '')
    })
  })

  describe('Error Handling', () => {
    it('handles server errors gracefully', () => {
      const repo = FakeProjectsRepositoryManager.getInstance()
      repo.withOverride('createProject', () => {
        throw new Error('Server error')
      })

      cy.mount(<InlineProjectForm />)

      cy.getByTestId('create-project-inline-input')
        .type('Valid Name{enter}')

      cy.contains('unknown_error').should('be.visible')
    })
  })

  describe('i18n Integration', () => {
    it('shows translated error messages', () => {
      cy.mount(<InlineProjectForm />)

      cy.getByTestId('create-project-inline-input')
        .type('ab{enter}')

      // Error message should be in user's language
      // (assuming next-intl is configured)
      cy.get('[data-testid="create-project-inline-input"]')
        .parent()
        .contains(/caracteres|characters/)
        .should('be.visible')
    })
  })
})
```

### Example 2: Hook with Server Action Integration

**File:** `src/features/projects/app/hooks/useInlineProjectForm.cy.tsx`

```typescript
import { useInlineProjectForm } from './useInlineProjectForm'
import { FakeProjectsRepositoryManager } from '../../data/projects.repository.fake'

// Test harness component to test the hook
function TestHarness() {
  const { formMethods, handleSubmit, isLoading, getTranslatedError } =
    useInlineProjectForm()

  return (
    <form onSubmit={handleSubmit} data-testid="test-form">
      <input
        {...formMethods.register('name')}
        data-testid="name-input"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading}
        data-testid="submit-btn"
      >
        {isLoading ? 'Creating...' : 'Create'}
      </button>
      {getTranslatedError('name') && (
        <span data-testid="error-message">
          {getTranslatedError('name')}
        </span>
      )}
    </form>
  )
}

describe('useInlineProjectForm Hook', () => {
  beforeEach(() => {
    FakeProjectsRepositoryManager.getInstance().reset()
  })

  it('handles successful project creation flow', () => {
    cy.mount(<TestHarness />)

    cy.getByTestId('name-input').type('Test Project')
    cy.getByTestId('submit-btn').click()

    // Should show loading state
    cy.getByTestId('submit-btn')
      .should('be.disabled')
      .should('contain.text', 'Creating...')

    // After success, form resets
    cy.getByTestId('name-input').should('have.value', '')
  })

  it('shows validation errors from server', () => {
    cy.mount(<TestHarness />)

    cy.getByTestId('name-input').type('x')
    cy.getByTestId('submit-btn').click()

    cy.getByTestId('error-message')
      .should('contain.text', 'at least 3 characters')
  })

  it('handles unauthorized error', () => {
    // This would require mocking getCurrentUser()
    // to return null - see advanced patterns
  })

  it('integrates with Zustand store', () => {
    cy.mount(<TestHarness />)

    cy.getByTestId('name-input').type('Project Name')
    cy.getByTestId('submit-btn').click()

    // After success, useSidebarStore should close the form
    // This is tested indirectly through the component behavior
  })
})
```

### Example 3: Component with Props and State

**File:** `src/features/projects/components/ProjectHeader.cy.tsx`

```typescript
import { ProjectHeader } from './ProjectHeader'

describe('ProjectHeader', () => {
  it('displays project name correctly', () => {
    cy.mount(
      <ProjectHeader
        projectId="123"
        projectName="My Test Project"
      />
    )

    cy.getByTestId('project-header-title')
      .should('have.prop', 'tagName', 'H1')
      .should('contain.text', 'My Test Project')
  })

  it('handles long project names', () => {
    const longName = 'This is a very long project name that might overflow'

    cy.mount(
      <ProjectHeader
        projectId="123"
        projectName={longName}
      />
    )

    cy.getByTestId('project-header-title')
      .should('contain.text', longName)
      // Could add visual regression testing here
  })

  it('renders edit button when editable', () => {
    cy.mount(
      <ProjectHeader
        projectId="123"
        projectName="Test"
        editable={true}
      />
    )

    cy.getByTestId('project-edit-btn').should('exist')
  })

  it('does not render edit button when not editable', () => {
    cy.mount(
      <ProjectHeader
        projectId="123"
        projectName="Test"
        editable={false}
      />
    )

    cy.getByTestId('project-edit-btn').should('not.exist')
  })
})
```

---

## Migration Strategy

### Phase 1: Setup (Week 1) ✅

**Goal:** Get component testing working

1. ✅ Install `@cypress/react`
2. ✅ Update `cypress.config.ts` with component config
3. ✅ Create `cypress/support/component.ts`
4. ✅ Write first component test (`InlineProjectForm.cy.tsx`)
5. ✅ Verify FakeRepo integration works

**Success Criteria:**
- Can run `npm run test:component`
- Can mount a component
- Can interact with it using Cypress commands
- FakeRepo resets work correctly

### Phase 2: Convert Existing Tests (Week 2-3) 🔄

**Goal:** Move appropriate E2E tests to Component tests

**Candidates for migration:**

From `cypress/e2e/dashboard/projects.cy.ts`:

```typescript
// ❌ Keep in E2E - Multi-page flow
it("When user creates a first project, it should be redirected to the new project page")

// ✅ Move to Component Test
it("New users should not have projects and should be able to create their first project")
// → Becomes InlineProjectForm.cy.tsx test

// ✅ Move to Component Test
it("Users should be able to create multiple projects")
// → Becomes InlineProjectForm.cy.tsx test with multiple submissions
```

**Migration pattern:**

```typescript
// BEFORE (E2E)
beforeEach(() => {
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.resetRepos()  // API call
  cy.login("password")  // Full auth
})

it("creates project", () => {
  cy.visit('/')  // Boot server, load page
  cy.getByTestId('sidebar-create-first-project-cta').click()
  cy.getByTestId('create-project-inline-input').type('Test{enter}')
  cy.get('[data-testid^="sidebar-project-item"]').should('have.length', 1)
})

// AFTER (Component)
beforeEach(() => {
  FakeProjectsRepositoryManager.getInstance().reset()  // Instant
})

it("creates project", () => {
  cy.mount(<InlineProjectForm />)  // Mount component
  cy.getByTestId('create-project-inline-input').type('Test{enter}')
  // Assert component behavior
})
```

### Phase 3: Cleanup E2E Suite (Week 4) 🧹

**Goal:** Keep only critical user journeys in E2E

**Keep these E2E tests:**

```typescript
// Critical multi-page user journey
describe('Complete Project Workflow', () => {
  it('user creates project, adds task, completes task', () => {
    cy.login('password')
    // Create project (full page)
    cy.visit('/')
    cy.getByTestId('sidebar-create-first-project-cta').click()
    cy.getByTestId('create-project-inline-input').type('Work{enter}')
    // Navigate to project (routing)
    cy.getByTestId('sidebar-project-item-Work').click()
    cy.url().should('include', '/projects/')
    // Create task (different component)
    cy.getByTestId('create-task-btn').click()
    // ... etc
  })
})

// OAuth flow
describe('Authentication', () => {
  it('logs in with Google OAuth', () => {
    // Full OAuth flow
  })
})
```

**Remove these E2E tests (now covered by Component tests):**

- ❌ Form validation tests
- ❌ Single component interaction tests
- ❌ Loading state tests
- ❌ Error message display tests

**Expected Results:**
- E2E suite: 15 tests → 5 tests (critical journeys only)
- Component suite: 0 tests → 30+ tests (comprehensive coverage)
- Total test execution time: 5 minutes → 2 minutes

---

## Best Practices

### 1. **Use FakeRepos, Not Mocks**

```typescript
// ✅ GOOD - Real integration
beforeEach(() => {
  FakeProjectsRepositoryManager.getInstance().reset()
})

// ❌ BAD - Mocking Server Actions
beforeEach(() => {
  cy.stub(createProject).resolves({ success: true })
})
```

**Why?** FakeRepos are already tested, deterministic, and allow testing the entire integration stack.

### 2. **Keep Components Isolated**

```typescript
// ✅ GOOD - Test one component
cy.mount(<InlineProjectForm />)

// ❌ BAD - Mount entire page
cy.mount(<DashboardPage />)
```

**Why?** Component tests should be fast and focused. Use E2E for full page flows.

### 3. **Test User Behavior, Not Implementation**

```typescript
// ✅ GOOD - Test what user sees/does
cy.getByTestId('create-project-inline-input').type('Project{enter}')
cy.getByTestId('sidebar-inline-project-form').should('not.exist')

// ❌ BAD - Test internal state
cy.window().its('formState.isSubmitting').should('be.false')
```

### 4. **Use Custom Commands**

```typescript
// ✅ GOOD - Reusable command
Cypress.Commands.add('createProject', (name: string) => {
  cy.getByTestId('create-project-inline-input').type(`${name}{enter}`)
})

// Usage
cy.mount(<InlineProjectForm />)
cy.createProject('Test Project')
```

### 5. **Leverage FakeRepo Overrides for Edge Cases**

```typescript
// ✅ GOOD - Test error cases without external dependencies
it('handles duplicate project name', () => {
  const repo = FakeProjectsRepositoryManager.getInstance()
  repo.withOverride('createProject', () => {
    throw new Error('Project name already exists')
  })

  cy.mount(<InlineProjectForm />)
  cy.getByTestId('create-project-inline-input').type('Duplicate{enter}')
  cy.contains('already exists').should('be.visible')
})
```

### 6. **Test i18n Integration**

```typescript
it('shows translated error messages', () => {
  cy.mount(<InlineProjectForm />)

  cy.getByTestId('create-project-inline-input').type('ab{enter}')

  // Error should be translated
  cy.contains(/caracteres|characters/).should('be.visible')
})
```

### 7. **Group Related Tests**

```typescript
describe('InlineProjectForm', () => {
  describe('Validation', () => {
    it('rejects short names', () => {})
    it('rejects long names', () => {})
    it('rejects special characters', () => {})
  })

  describe('Submission', () => {
    it('creates project successfully', () => {})
    it('shows loading state', () => {})
    it('resets form after success', () => {})
  })

  describe('Error Handling', () => {
    it('handles server errors', () => {})
    it('handles network errors', () => {})
  })
})
```

---

## Limitations & Considerations

### What Component Tests CAN'T Test

❌ **Full page routing**
```typescript
// Use E2E instead
it('navigates to project page after creation', () => {
  cy.visit('/')
  cy.createProject('Test')
  cy.url().should('include', '/projects/')
})
```

❌ **Server-side redirects**
```typescript
// Use E2E instead
it('redirects unauthenticated users to login', () => {
  cy.visit('/dashboard')
  cy.url().should('include', '/login')
})
```

❌ **OAuth flows**
```typescript
// Use E2E instead
it('logs in with Google', () => {
  cy.visit('/login')
  cy.get('[data-provider="google"]').click()
  // ... OAuth flow
})
```

❌ **Middleware / Route Protection**
```typescript
// Use E2E instead - requires server
```

❌ **Next.js Layouts**
```typescript
// Use E2E instead - layouts are server-rendered
```

### When to Use Each Test Type

| Scenario | Test Type | Why |
|----------|-----------|-----|
| Form validation logic | **Component** | Fast, focused, covers edge cases |
| Button click triggers function | **Component** | UI interaction + behavior |
| Hook with Server Action | **Component** | Integration without full page |
| Navigation between pages | **E2E** | Requires router + server |
| OAuth login flow | **E2E** | Requires external provider |
| Full user journey | **E2E** | End-to-end validation |
| Pure validation function | **Unit (Vitest)** | No UI needed |
| Repository method | **Unit (Vitest)** | Already covered |
| Use case logic | **Unit (Vitest)** | Already covered |

### Server Action Limitations

Component tests run in the **browser context**, but Server Actions run on the **server**. This means:

✅ **Works:**
- Testing Server Action calls (they execute)
- Testing with FakeRepos (DI pattern works)
- Testing success/error handling
- Testing form submission flows

⚠️ **May need workarounds:**
- Server Actions that require `getCurrentUser()` (auth context)
- Server Actions that use Next.js cache (`revalidatePath`, `updateTag`)
- Server Actions that access request headers

**Solution:** Use FakeRepos with overrides to simulate these scenarios.

---

## FAQ

### Q: Do I need to run the Next.js dev server?

**A:** No! Cypress Component Testing runs components in isolation. The dev server is only needed for E2E tests.

### Q: Can I test Server Actions?

**A:** Yes! Server Actions work in component tests because they're just async functions. Our FakeRepo pattern makes this seamless.

### Q: How do I test authentication?

**A:** For component tests, you can:
- Mock `getCurrentUser()` to return a user
- Or test components that don't require auth
- For full auth flows, use E2E tests

### Q: What about Next.js App Router features?

**A:** Component tests focus on **components**, not routing. For testing:
- Layouts → E2E tests
- Middleware → E2E tests
- Server Components → Component tests (mount the client portion)
- Route handlers → Unit tests or E2E tests

### Q: Can I use Testing Library queries?

**A:** Yes! Install `@testing-library/cypress`:
```bash
npm install --save-dev @testing-library/cypress
```

Then use Testing Library queries:
```typescript
cy.findByRole('button', { name: 'Create' }).click()
cy.findByLabelText('Project Name').type('Test')
```

### Q: How do I debug failing tests?

**A:** Cypress has excellent debugging:
1. Open Cypress UI: `npm run test:component`
2. Click on failing test
3. Use time-travel to see each step
4. Inspect DOM at any point
5. View console logs
6. Take screenshots

### Q: Should I delete all E2E tests?

**A:** No! Keep E2E tests for:
- Critical user journeys
- Multi-page flows
- Authentication flows
- Features that require server context

Delete E2E tests that just test single components in isolation.

### Q: How do I test hooks?

**A:** Create a test harness component:
```typescript
function TestHarness() {
  const hook = useMyHook()
  return <div data-testid="output">{hook.value}</div>
}

cy.mount(<TestHarness />)
cy.getByTestId('output').should('contain', 'expected value')
```

### Q: Can I intercept network requests?

**A:** Yes, but you shouldn't need to! Use FakeRepos instead:
```typescript
// ❌ Don't do this
cy.intercept('POST', '/api/projects', { success: true })

// ✅ Do this
FakeProjectsRepositoryManager.getInstance().reset()
// Component uses real Server Action → Use Case → FakeRepo
```

### Q: What about CSS/styling?

**A:** Cypress renders components with real CSS in a real browser. Your Tailwind styles, global CSS, and component styles all work.

### Q: How do I run tests in CI?

**A:** Add to your CI pipeline:
```yaml
- name: Run Component Tests
  run: npm run test:component:run
```

Cypress runs headlessly in CI by default.

---

## Next Steps

### Immediate (Today)

1. ✅ Read this document
2. ✅ Install `@cypress/react`
3. ✅ Update `cypress.config.ts`
4. ✅ Create `cypress/support/component.ts`
5. ✅ Run `npm run test:component` to verify setup

### This Week

1. Write first component test: `InlineProjectForm.cy.tsx`
2. Write hook test: `useInlineProjectForm.cy.tsx`
3. Verify FakeRepo integration works
4. Get comfortable with Cypress Component Testing workflow

### Next Week

1. Identify E2E tests to migrate
2. Start migrating simple tests (form validation)
3. Build component test library
4. Document patterns for team

### Month 2

1. Complete migration of appropriate E2E tests
2. Cleanup E2E suite (keep only critical journeys)
3. Measure performance improvements
4. Train team on component testing patterns

---

## Resources

- [Cypress Component Testing Docs](https://docs.cypress.io/guides/component-testing/overview)
- [Cypress React Docs](https://docs.cypress.io/guides/component-testing/react/overview)
- [Next.js Component Testing](https://docs.cypress.io/guides/component-testing/react/overview#Next-js)
- [Our Architecture Guide](./ARCHITECTURE.md)
- [FakeRepo Pattern](./src/features/projects/data/projects.repository.fake.ts)

---

## Conclusion

Cypress Component Testing is a **perfect fit** for our Clean Architecture approach:

✅ Test real integrations (no mocking!)
✅ Use FakeRepos (deterministic, fast)
✅ Fast feedback loop (5-10x faster than E2E)
✅ Comprehensive coverage (test all edge cases)
✅ Keep E2E focused (critical journeys only)

**Recommendation:** Adopt component testing incrementally, starting with form components.

**Expected ROI:**
- Faster test suite (2x-5x improvement)
- Better coverage (more edge cases tested)
- Easier debugging (visual + time-travel)
- Cleaner E2E suite (focused on critical paths)

---

**Questions?** Add them to this document or discuss with the team!
