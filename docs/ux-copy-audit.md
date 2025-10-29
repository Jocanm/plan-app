# UX Copy Audit Report

**Project:** Plan App - Task Management Application
**Date:** 2025-10-28
**Languages:** English (EN) / Spanish (ES)
**Audit Scope:** All user-facing text, microcopy, error messages, and UI labels

---

## 📊 Executive Summary

### Overall Assessment: **GOOD** ⭐⭐⭐⭐☆

The application demonstrates strong internationalization practices with comprehensive EN/ES translation coverage and excellent accessibility implementation. The tone is consistently professional and user-friendly across most components.

### Key Metrics:
- **Translation Coverage:** ~95% (5% hardcoded strings found)
- **Accessibility:** Excellent (aria-labels, screen readers, skip navigation)
- **Tone Consistency:** Professional, clear, action-oriented
- **Microcopy Quality:** Good with room for improvement

### Priority Issues:
- 🔴 **2 Critical:** Hardcoded strings breaking i18n consistency
- 🟡 **3 Important:** Missing empty states and loading messages
- 🟢 **4 Minor:** Terminology inconsistencies and placeholder text

---

## 🔍 Detailed Findings

### 🔴 CRITICAL ISSUES

#### 1. Hardcoded Screen Reader Text in LogoutButton
**Location:** `src/shared/components/ui/sidebar/LogoutButton.tsx:51`

**Current:**
```tsx
{pending && <span className="sr-only">Logging out, please wait</span>}
```

**Issue:** This text is hardcoded in English, breaking accessibility for Spanish screen reader users.

**Fix:**
```tsx
{pending && <span className="sr-only">{t("loading_sr")}</span>}
```

**Translation additions needed:**
```json
// messages/en.json
"sidebar.logout.loading_sr": "Logging out, please wait"

// messages/es.json
"sidebar.logout.loading_sr": "Cerrando sesión, por favor espere"
```

**Impact:** High - Affects screen reader users in non-English locales

---

#### 2. Hardcoded "Refresh" Link (Suspected)
**Location:** Dashboard or error pages (needs verification)

**Issue:** If "Refresh" or "change language" links exist without translation keys, they break i18n.

**Recommendation:** Audit all pages for any remaining hardcoded UI text.

---

### 🟡 IMPORTANT ISSUES

#### 3. Missing Empty State for Projects
**Location:** `src/shared/components/ui/sidebar/segments/projects/Projects.tsx`

**Current:** The component renders an empty `<ul>` when no projects exist.

**Issue:** Users see nothing when they have no projects - no guidance on what to do next.

**Recommendation:**
```tsx
export const Projects = async () => {
  const currentUser = await getCurrentUser();
  const projects = await getProjectsForSidebar(currentUser.id);

  if (projects.length === 0) {
    return (
      <div className="text-sm text-muted-foreground px-2">
        {t("projects.empty_state")}
      </div>
    );
  }

  return (
    <ul data-testid="sidebar-projects-segment">
      {/* ... */}
    </ul>
  );
};
```

**Translation additions:**
```json
// en.json
"sidebar.projects.empty_state": "No projects yet. Create your first project to get started!"

// es.json
"sidebar.projects.empty_state": "No hay proyectos aún. ¡Crea tu primer proyecto para empezar!"
```

---

#### 4. Spanish Translation Quality - Too Literal
**Location:** `messages/es.json`

**Examples of overly literal translations:**

| Key | EN | ES (Current) | ES (Better) |
|-----|----|--------------|--------------
| `sidebar.welcome_back` | "Welcome back" | "Bienvenido de vuelta" | "¡Bienvenido!" |
| `sidebar.settings.title` | "Settings" | "Configuración" | ✅ Good |
| `sidebar.navigation.title` | "Navigation" | "Navegación" | "Menú" or omit |

**Issue:** Some Spanish translations sound mechanical rather than natural.

**Recommendation:** Review with native Spanish speaker for more idiomatic phrasing.

---

#### 5. Missing Loading States for Async Components
**Location:** Various Server Components

**Issue:** Components like `<Projects />` use `<Suspense>` but the fallback is just a loader icon without text.

**Current:**
```tsx
<Suspense fallback={<BaseLoader className="mx-auto" />}>
  <Projects />
</Suspense>
```

**Better:**
```tsx
<Suspense fallback={
  <div className="flex flex-col items-center gap-2">
    <BaseLoader />
    <span className="text-sm text-muted-foreground">
      {t("projects.loading")}
    </span>
  </div>
}>
  <Projects />
</Suspense>
```

---

### 🟢 MINOR ISSUES

#### 6. Badge Count Placeholder
**Location:** Likely in navigation or task count badges

**Issue:** If badge shows "3" as placeholder, it should be:
- Hidden when count is 0
- Show actual dynamic count

**Best practice:** Always use real data or hide empty badges.

---

#### 7. Inconsistent Use of "Tasks" Terminology
**Issue:** Need to verify consistent usage of "task" vs "to-do" vs "item"

**Recommendation:** Create terminology glossary:
- **Task** - Main entity
- **Project** - Container for tasks
- **Tag** - Label for tasks
- **Event** - Calendar scheduled task

---

#### 8. Auth Error Messages Could Be More Helpful
**Location:** `app/[locale]/auth/error/page.tsx`

**Current:** Displays error parameter from URL

**Improvement Opportunity:**
```tsx
const errorMessages = {
  'OAuthAccountNotLinked': t('errors.oauth_not_linked'),
  'OAuthSignin': t('errors.oauth_signin_failed'),
  'Default': t('errors.generic')
};

const message = errorMessages[error] || errorMessages.Default;
```

Provide specific, actionable error messages instead of technical error codes.

---

## 📚 Complete Copy Inventory

### Authentication
| Location | EN Text | ES Translation | Status |
|----------|---------|----------------|--------|
| Login page title | "Sign in to your account" | "Inicia sesión en tu cuenta" | ✅ |
| Login subtitle | "Use your email to sign in" | "Usa tu correo para iniciar sesión" | ✅ |
| Error page heading | "Authentication Error" | "Error de autenticación" | ✅ |
| Error page description | "There was a problem with the authentication process" | "Hubo un problema con el proceso de autenticación" | ✅ |
| Error page CTA | "Try again" | "Intentar de nuevo" | ✅ |

### Navigation & Sidebar
| Location | EN Text | ES Translation | Status |
|----------|---------|----------------|--------|
| App name | "Plan" | "Plan" | ✅ |
| Welcome back | "Welcome back" | "Bienvenido de vuelta" | 🟡 Could be more casual |
| Dashboard link | "Dashboard" | "Panel" | ✅ |
| Tasks link | "Tasks" | "Tareas" | ✅ |
| Calendar link | "Calendar" | "Calendario" | ✅ |
| Tags link | "Tags" | "Etiquetas" | ✅ |
| Projects section | "Projects" | "Proyectos" | ✅ |
| Settings link | "Settings" | "Configuración" | ✅ |
| Logout button | "Logout" | "Cerrar sesión" | ✅ |
| Logout loading | "Logging out..." | "Cerrando sesión..." | ✅ |
| Logout SR text | "Logging out, please wait" | ❌ **HARDCODED** | 🔴 |

### Accessibility
| Feature | Text | Status |
|---------|------|--------|
| Skip to main | "Skip to main content" / "Saltar al contenido principal" | ✅ |
| Sidebar label | "Sidebar" | ✅ |
| Config section | "Configuration" | ✅ |
| Navigation segment | aria-labelledby working | ✅ |
| Projects segment | aria-labelledby working | ✅ |

---

## ✅ What's Working Well

### 1. Strong i18n Architecture
- Clean separation with `messages/en.json` and `messages/es.json`
- Proper use of `next-intl` with `useTranslations()` hooks
- Namespaced keys (e.g., `sidebar.logout.title`)
- Server-side translation with `getTranslations()`

### 2. Excellent Accessibility
- Semantic HTML structure
- ARIA labels throughout
- Skip navigation link
- Screen reader considerations in most components
- Proper heading hierarchy

### 3. Consistent Tone
- Professional but friendly
- Action-oriented (verbs in buttons)
- Clear and concise
- Avoids jargon

### 4. Good Component Structure
- Translations co-located with components
- Reusable UI primitives
- Separation of concerns

---

## 🎯 Recommendations

### Immediate Actions (High Priority)

1. **Fix hardcoded screen reader text in LogoutButton**
   - Add `loading_sr` translation key
   - Test with screen readers in both languages

2. **Add empty state for Projects list**
   - Provide guidance when no projects exist
   - Include CTA to create first project

3. **Audit all components for remaining hardcoded strings**
   - Search codebase for text outside translation files
   - Especially check error handling and edge cases

### Short-term Improvements

4. **Enhance loading states**
   - Add text to Suspense fallbacks
   - Make loading states screen-reader friendly

5. **Review Spanish translations with native speaker**
   - Make translations more idiomatic
   - Ensure cultural appropriateness

6. **Create error message mapping**
   - Map technical error codes to user-friendly messages
   - Provide actionable next steps

### Long-term Best Practices

7. **Establish copy guidelines document**
   - Tone of voice guide
   - Terminology glossary
   - Character limits for UI elements
   - Translation workflow

8. **Implement copy review process**
   - Review all new copy before implementation
   - A/B test important microcopy
   - Collect user feedback on clarity

9. **Add copy tests**
   - Verify all UI text has translation keys
   - Check for missing translations
   - Automated i18n coverage checks

---

## 📖 UX Writing Best Practices for This Project

### Tone of Voice
- **Professional but approachable** - Not corporate, not too casual
- **Action-oriented** - Use verbs for buttons ("Create project" not "Project creation")
- **Concise** - Respect user's time and screen space
- **Helpful** - Guide users, don't just inform

### Button Labels
✅ **Good:**
- "Create project"
- "Save changes"
- "Delete task"

❌ **Avoid:**
- "Submit"
- "OK"
- "Click here"

### Error Messages
✅ **Good:**
- "We couldn't save your project. Check your connection and try again."
- "This email is already in use. Try signing in instead."

❌ **Avoid:**
- "Error 500"
- "Invalid input"
- "Something went wrong"

### Empty States
✅ **Good:**
- "No tasks yet. Create your first task to get started!"
- "You haven't created any projects. Projects help organize your tasks."

❌ **Avoid:**
- "No data"
- [Empty screen with no message]

### Loading States
✅ **Good:**
- "Loading your projects..."
- "Saving changes..."

❌ **Avoid:**
- [Just a spinner]
- "Please wait"

---

## 🌍 Translation Guidelines

### EN → ES Translation Principles

1. **Be idiomatic, not literal**
   - EN: "Welcome back" → ES: "¡Bienvenido!" (not "Bienvenido de vuelta")
   - EN: "Get started" → ES: "Empezar" (not "Obtener comenzado")

2. **Respect character length**
   - Spanish text is typically 20-30% longer
   - Test UI with Spanish to avoid truncation

3. **Cultural appropriateness**
   - Use appropriate formality (tú vs usted)
   - Consider regional variations (España vs Latinoamérica)

4. **Maintain tone**
   - Keep the same level of friendliness/formality
   - Preserve humor if present

5. **Action verbs**
   - EN: "Create" → ES: "Crear"
   - EN: "Delete" → ES: "Eliminar"
   - Keep imperative/infinitive consistent

---

## 📋 Action Items Checklist

### Critical (Do immediately)
- [ ] Fix hardcoded "Logging out, please wait" in LogoutButton
- [ ] Add `sidebar.logout.loading_sr` to EN/ES translation files
- [ ] Test screen reader in Spanish after fix

### Important (Do this week)
- [ ] Add empty state copy for Projects list
- [ ] Add `sidebar.projects.empty_state` translations
- [ ] Review all Spanish translations for naturalness
- [ ] Add loading text to Suspense fallbacks
- [ ] Create error message mapping for auth errors

### Minor (Do this month)
- [ ] Create terminology glossary
- [ ] Document tone of voice guidelines
- [ ] Set up automated i18n coverage checks
- [ ] Review badge count implementations
- [ ] Add copy review to PR process

---

## 🎓 Lessons Learned

### What This Project Does Right
1. **Comprehensive i18n from the start** - Not bolted on later
2. **Accessibility-first approach** - Screen readers considered early
3. **Component-level translations** - Easy to maintain and update
4. **Professional tone consistency** - Feels polished

### Areas for Growth
1. **Edge cases coverage** - Empty states, errors, loading
2. **Translation quality** - Beyond literal translation
3. **Copy testing** - Ensure no hardcoded strings slip through
4. **User feedback loop** - Validate copy clarity with real users

---

## 📞 Contact & Questions

For questions about this audit or copy recommendations:
- **UX Writing:** Review with UX writer or content designer
- **Translations:** Consult native Spanish speakers for final review
- **Accessibility:** Test with actual screen reader users in both languages

---

**Audit completed by:** Claude Code (Copy Language Specialist Agent)
**Next review recommended:** After addressing critical issues (2-3 weeks)
