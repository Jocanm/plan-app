# Clean Architecture for Next.js and TDD - Planning App

## 1. The Philosophy
Based on battle-tested principles from large-scale React applications, our architecture will be governed by a golden rule:
**Our business logic must not know that Next.js, React, or Prisma exist.**

This means that the core of our application will be pure TypeScript code, without framework dependencies.

### Lessons from 2M+ LOC Banking App
- When business logic lives inside React components, testing becomes painful
- Developers skip tests when they require rendering components, mocking hooks, or updating snapshots
- **Solution**: Abstract ALL business logic into regular functions with zero React awareness

### What Gets Abstracted (IOSP - Integration Operation Segregation Principle)
- **IF conditions** → pure functions
- **API requests or SDK usage** → abstracted behind interfaces
- **Data extraction/transformation** → pure functions  
- **Cookie, localStorage manipulation** → abstracted services
- **Any external dependency** → inverted and abstracted

## 2. Fundamental Principles

### **Separation of Concerns (SoC)**
We will isolate business logic in its own layer, separated from the UI (React/Next.js), from the database (Prisma), and from any external service. ALL business logic will be regular TypeScript functions with zero framework awareness.

### **Dependency Inversion (D)**
Internal layers (our business logic) will not depend on external layers (the database). Instead, external layers will depend on "contracts" (interfaces) defined by internal layers.

### **Integration Operation Segregation Principle (IOSP)**
We segregate operations into two types:
- **Pure Operations**: Business logic, transformations, validations (easy to test)
- **Integration Operations**: I/O, external calls, side effects (abstracted behind interfaces)

This makes testing trivial - we cover ALL business logic with fast unit tests on pure functions.

## 3. Folder Structure (The Practical Implementation)

This is how we will organize our code in the `src/` directory:

```
src/
├── app/
│   # UI and Framework layer. Here live pages, layouts, Server Actions
│   # and connection to the outside world.
│
├── components/
│   # "Dumb" and reusable UI components.
│
├── core/
│   # THE ISOLATED HEART OF THE APPLICATION!
│   ├── domain/
│   │   ├── entities/       # Business entities (data structures)
│   │   └── repositories/   # Repository interfaces/contracts
│   │
│   ├── use-cases/
│   │   # Pure business logic use cases
│   │   # Depends on `domain`, but not on `infrastructure`.
│   │
│   └── infrastructure/
│       # Concrete implementation of contracts.
│       ├── data/           # Database repository implementations
│       └── services/       # External service implementations
│
└── lib/
    # Support code and configuration (clients, utils, etc.)
```

## 4. Generic Action Flow Pattern

1. **UI** (`app/`): A user interacts with the interface (form, button, etc.). This triggers a **Server Action**.

2. **Server Action** (`app/`): Its only responsibility is to:
   - a. Validate user input
   - b. Call the corresponding use case from `core/use-cases/`

3. **Use Case** (`core/use-cases/`): Contains pure business logic:
   - a. Receives necessary parameters
   - b. Performs business validations and rules
   - c. Calls the appropriate **contracts** from `domain/repositories/`
   - **It doesn't know about frameworks or external services.**

4. **Repository** (`core/infrastructure/`): Concrete implementations that fulfill the contracts and interact with external systems (database, APIs, etc.)

## 5. How This Helps Us with TDD (The Key to Everything)

This allows us to write tests that validate **behavior**, not implementation, following lessons from large-scale React applications.

### The Problem with Component-Heavy Testing
- Testing components requires rendering (slow and brittle)
- Snapshot tests break on every JSX change
- Mocking React hooks and internals is painful
- Developers skip tests when they're hard to write

### Our Solution: Test Pure Business Logic
To test any use case, we will:

1. **Write the test FIRST.**
2. Test **pure functions** directly (no component rendering needed)
3. Create **fake implementations (mocks)** of repository interfaces for external dependencies
4. Execute the pure business logic and **assert** the expected outcomes

The result is a test that:
- Is **extremely fast** (no DOM rendering, no external systems)
- Validates pure business logic in isolation
- **Won't break** when UI changes or external implementations change
- Is **easy to write** - just call functions and check return values
- Encourages developers to actually write tests

## Review Criteria for Claude Code

### ✅ ACCEPT when:
- Tests describe user/business behavior, not implementation details
- Business logic is extracted into **pure functions** (zero React/framework awareness)
- Tests are **unit tests on functions**, not component tests
- Dependencies point inward (toward domain)
- ALL external operations (API, DB, cookies, localStorage) are abstracted
- Use cases are pure TypeScript functions
- Repositories are abstractions (interfaces)
- Server Actions only orchestrate, don't contain business logic

### ❌ REJECT when:
- Tests require component rendering (use RTL only for UI behavior, not business logic)
- Tests use snapshots for business logic validation
- Business logic is mixed with React components
- Direct dependencies to external services (DB, APIs) in use cases
- Use cases import from React, Next.js, or Prisma
- Complex logic inside Server Actions or UI components
- Repository implementations leak into use cases
- ANY business logic has React/framework awareness
- IF conditions, data transformations, or validations are embedded in components

## TDD Workflow Validation

### Before Implementation:
1. Use case test exists and is RED
2. Test describes business behavior in plain English
3. Test calls **pure functions directly** (no component rendering)
4. Test uses mock repositories, not real external systems
5. Test assertions focus on business outcomes

### After Implementation:
1. Test is GREEN without changing the test
2. Use case is a **pure function** with no framework imports
3. Repository contract is satisfied by infrastructure layer
4. UI layer only orchestrates, doesn't contain business logic
5. ALL business logic can be tested without React

## Architecture Validation Checklist

- [ ] Can I test business logic without starting Next.js?
- [ ] Can I test business logic without connecting to database?
- [ ] Can I test business logic by calling pure functions directly?
- [ ] Would changing from Prisma to MongoDB break only infrastructure layer?
- [ ] Would changing from Next.js to Express break only app layer?
- [ ] Are my use cases pure functions that could run in Node.js CLI?
- [ ] Is ALL business logic extracted from React components?
- [ ] Are IF conditions, data transformations abstracted into functions?
- [ ] Can I cover 100% business logic with fast unit tests?

**Remember: If you can't easily answer "YES" to all these questions, the architecture needs adjustment.**

## Integration Operation Segregation Principle (IOSP) Examples

### ❌ DON'T (Mixed in Component):
```tsx
function ProjectForm() {
  const [projects, setProjects] = useState([]);
  
  const handleSubmit = async (data) => {
    // Business logic mixed with UI!
    if (data.name.length < 3) return; // Validation logic
    const userId = localStorage.getItem('userId'); // Integration
    await prisma.project.create({...}); // Integration  
  };
}
```

### ✅ DO (Segregated):
```tsx
// Pure business logic (easily testable)
function validateProjectName(name: string): boolean {
  return name.length >= 3;
}

// Use case (pure function)
function createProject(data: ProjectData, deps: Dependencies): Result {
  if (!validateProjectName(data.name)) {
    return { success: false, error: 'Name too short' };
  }
  // Use abstracted dependencies...
}

// Component (only UI orchestration)
function ProjectForm() {
  const handleSubmit = (data) => {
    const result = createProject(data, dependencies);
    // Handle result...
  };
}
```