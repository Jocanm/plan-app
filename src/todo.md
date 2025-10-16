# Todo List - Plan App

## 🌍 i18n Implementation (Time-boxed: 2-3 hours MAX)

> **⚠️ Tech Lead Note**: This is being done early against recommendation. Focus on minimal viable implementation.

### Setup & Configuration
- [x] Research and choose i18n library (next-intl) ✅
- [x] Install dependencies ✅
- [x] Create folder structure for translations (`/messages`) ✅
- [x] Configure next-intl plugin in next.config.ts ✅
- [x] Create global.ts type declarations ✅
- [ ] Configure i18n middleware (IN PROGRESS)

### Translation Files
- [x] Create `en.json` base translation file ✅
- [ ] Create `es.json` translation file (PENDING)
- [x] Define initial keys for login page ✅

### Pure Functions Layer (lib/)
- [x] Create `lib/constants/locale.ts` ✅
- [x] Create `lib/utils/headers.ts` with `parseHeadersList()` ✅
- [x] Create `lib/utils/i18n.ts` with `normalizeLocale()` and `getPrimaryLanguage()` ✅
- [x] Create `lib/validations/i18n.ts` with `isLocaleValid()` ✅
- [x] Write comprehensive unit tests for all pure functions ✅

### Implementation
- [x] Add NextIntlClientProvider to app layout ✅
- [x] Configure `src/i18n/request.ts` for cookie-based locale detection ✅
- [x] Replace hardcoded strings in `/auth/login` page ✅
- [x] Add metadata generation with translations ✅
- [ ] Integrate i18n logic into middleware (NEXT)
- [ ] Fix `<html lang>` attribute to be dynamic (NEXT)
- [ ] Test Accept-Language header detection (NEXT)
- [ ] Implement language switcher component (LATER - optional)

### Testing
- [x] Unit tests for `isLocaleValid()` ✅
- [x] Unit tests for `parseHeadersList()` ✅
- [x] Unit tests for `normalizeLocale()` ✅
- [x] Unit tests for `getPrimaryLanguage()` ✅
- [ ] Integration test: middleware sets cookie correctly
- [ ] Integration test: translations render in both languages
- [ ] Manual test: verify browser language detection

### Constraints
- **ONLY** EN/ES for now
- **ONLY** static UI strings (no dynamic content yet)
- **STOP** if stuck > 30 minutes on any issue
- **SKIP** advanced features (pluralization, formatting, etc.)

---

## 🎯 Core Features (TO DO AFTER i18n)

### Task Management
- [ ] Implement Task creation form with validation
- [ ] Implement Task list view
- [ ] Implement Task edit functionality
- [ ] Implement Task deletion
- [ ] Add Task type handling (one_time/recurrent)

### Project Management
- [ ] Implement Project creation
- [ ] Implement Project list
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

## 📊 Advanced Features (MUCH LATER)

- [ ] Analytics setup
- [ ] Performance optimization
- [ ] Advanced i18n (pluralization, ICU syntax, etc.)
- [ ] Error tracking
