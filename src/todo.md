# Todo List - Plan App

## 🌍 i18n Implementation (Time-boxed: 2-3 hours MAX)

> **⚠️ Tech Lead Note**: This is being done early against recommendation. Focus on minimal viable implementation.

### Setup & Configuration
- [ ] Research and choose i18n library (next-intl recommended)
- [ ] Install dependencies
- [ ] Configure i18n middleware/routing
- [ ] Create folder structure for translations (`/locales` or similar)

### Translation Files
- [ ] Create `en.json` base translation file
- [ ] Create `es.json` translation file
- [ ] Define initial keys for existing UI strings

### Implementation
- [ ] Implement language switcher component
- [ ] Add i18n provider to app layout
- [ ] Replace hardcoded strings in existing components (if any)
- [ ] Test language switching works

### Testing
- [ ] Test translation function with different locales
- [ ] Test language persistence (localStorage/cookies)
- [ ] Verify all translations render correctly

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
