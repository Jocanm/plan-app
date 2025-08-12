# Clean Architecture for Next.js and TDD - Planning App

## 1. The Philosophy
Based on your principles, our architecture will be governed by a golden rule:
**Our business logic must not know that Next.js, React, or Prisma exist.**

This means that the core of our application (the "use cases" like "create a project" or "complete a task") will be pure TypeScript code, without framework dependencies.

## 2. Fundamental Principles

### **Separation of Concerns (SoC)**
We will isolate business logic in its own layer, separated from the UI (React/Next.js), from the database (Prisma), and from any external service.

### **Dependency Inversion (D)**
Internal layers (our business logic) will not depend on external layers (the database). Instead, external layers will depend on "contracts" (interfaces) defined by internal layers.

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

This allows us to write tests that validate **behavior**, not implementation.

To test any use case, we will:

1. **Write the test FIRST.**
2. In the test, create **fake implementations (mocks)** of the required repository interfaces that simulate the external dependencies in memory.
3. Pass these mocks to the use case.
4. Execute the use case and **assert** the expected business outcomes.

The result is a test that:
- Is **extremely fast** (doesn't touch external systems)
- Validates pure business logic
- **Won't break** when we change external implementations (database, APIs, etc.)
- Focuses on business behavior, not technical details

## Review Criteria for Claude Code

### ✅ ACCEPT when:
- Tests describe user/business behavior, not implementation details
- Dependencies point inward (toward domain)
- Business logic is framework-free
- Use cases are pure TypeScript functions
- Repositories are abstractions (interfaces)
- Server Actions only orchestrate, don't contain business logic

### ❌ REJECT when:
- Tests are coupled to implementation (mocking React components, Prisma queries)
- Business logic is mixed with UI components
- Direct dependencies to external services (DB, APIs) in use cases
- Use cases import from React, Next.js, or Prisma
- Complex logic inside Server Actions or UI components
- Repository implementations leak into use cases

## TDD Workflow Validation

### Before Implementation:
1. Use case test exists and is RED
2. Test describes business behavior in plain English
3. Test uses mock repositories, not real database
4. Test assertions focus on business outcomes

### After Implementation:
1. Test is GREEN without changing the test
2. Use case has no framework imports
3. Repository contract is satisfied by infrastructure layer
4. UI layer only orchestrates, doesn't contain business logic

## Architecture Validation Checklist

- [ ] Can I test business logic without starting Next.js?
- [ ] Can I test business logic without connecting to database?
- [ ] Would changing from Prisma to MongoDB break only infrastructure layer?
- [ ] Would changing from Next.js to Express break only app layer?
- [ ] Are my use cases pure functions that could run in Node.js CLI?

**Remember: If you can't easily answer "YES" to all these questions, the architecture needs adjustment.**