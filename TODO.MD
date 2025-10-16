## Pending tasks

### Detect initial language based on Accept-Language header

- [x] Take header from next middleware
- [x] Parse the header to get preferred languages (array)
- [x] Match preferred languages against supported languages
- [ ] Set initial language in cookie inside middleware, if not already set
- [ ] Read cookie from request.ts file, i18n config
- [ ] Read cookie from layout.tsx to set html lang attribute