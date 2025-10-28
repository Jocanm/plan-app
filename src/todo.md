# Plan App - Todo List

## 🔥 URGENT: i18n URL-Based Routing - Final Tasks

### ✅ Completed (Session Today)
- ✅ Migrated from cookie-based to URL-based routing with `[locale]` folder
- ✅ Created root and locale-specific not-found pages
- ✅ Fixed dashboard translations (removed redundant `setRequestLocale`)
- ✅ Fixed auth error page (added Suspense boundary)
- ✅ Implemented locale injection in Server Actions (`signIn`, `signOut`)
- ✅ Created `buildLocalizedRoute()` helper in Domain Layer
- ✅ Updated `OauthForm` and `LogoutButton` to pass locale with `useLocale()`

### 🚧 Pending (Continue Tomorrow)

#### 2. **Middleware: OAuth Error Redirects**
- [ ] Modify `src/proxy.ts` to intercept `/api/auth/signin?error=...`
- [ ] Redirect OAuth errors to `/{locale}/auth/error?error=...`
- [ ] Extract locale from Referer header or URL
- [ ] Test: OAuth error should redirect with correct locale

#### 3. **Middleware: Login Page Error Redirects**
- [ ] Intercept `/[locale]/auth/login?error=...` in middleware
- [ ] Redirect to `/[locale]/auth/error?error=...` to keep login page static
- [ ] Test: Login errors should redirect without flashing login page
- [ ] Verify: Login page remains 100% static (check build output)

#### 4. **Not-found Routing Verification**
- [ ] Test: `/en/random` shows custom 404 in English
- [ ] Test: `/es/nonexistent` shows custom 404 in Spanish
- [ ] Test: `/random` (no locale) redirects then shows 404

#### 5. **NextAuth Config Cleanup**
- [ ] Remove hardcoded `pages` config in `src/lib/auth.ts` (lines 57-60)
- [ ] Let middleware handle all auth redirects
- [ ] Verify: OAuth and login errors still redirect correctly

#### 6. **Final Verification**
- [ ] Run `npm run build` and check all routes are static
- [ ] Test full auth flows:
  - Login from `/en/auth/login` → `/en/dashboard`
  - Login from `/es/auth/login` → `/es/dashboard`
  - Logout from `/es/dashboard` → `/es/auth/login`
  - OAuth error → `/[locale]/auth/error?error=...`
  - Login error → `/[locale]/auth/error?error=...`
- [ ] Update use case tests if needed (should already pass)

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

## ✅ Completed

### i18n (Internationalization) - URL-Based Routing
- ✅ Migrated to URL-based locale routing (`/[locale]/`)
- ✅ `localePrefix: "always"` configuration
- ✅ Disabled cookies (`localeCookie: false`)
- ✅ Server Actions with locale injection (DI pattern)
- ✅ Domain helper: `buildLocalizedRoute(route, locale)`
- ✅ Client components use `useLocale()` hook
- ✅ Root and locale-specific not-found pages
- ✅ All layouts and pages migrated to `[locale]` structure
- ✅ Middleware integration for locale detection
- ✅ Translation files for EN/ES

### Authentication
- ✅ NextAuth.js setup (Google + GitHub OAuth)
- ✅ Login page with UI (translated)
- ✅ Error page for auth errors (translated)
- ✅ Protected routes middleware
- ✅ Database integration (Prisma + PostgreSQL)
- ✅ Logout functionality

---

## 📊 Backlog (Later)

- Language switcher UI component
- Analytics setup
- Performance optimization
- Error tracking
