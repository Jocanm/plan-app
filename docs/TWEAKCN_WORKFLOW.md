# tweakcn Workflow

## Overview

[tweakcn.com](https://tweakcn.com) is a visual theme editor for shadcn/ui that lets you experiment with colors and design tokens without writing code.

## How It Works

1. **Visit tweakcn.com** - Open the tool in your browser
2. **Configure your base theme** - Input your current CSS variables
3. **Visual experimentation** - Use sliders and color pickers to adjust tokens
4. **Export CSS** - Copy the generated CSS variables
5. **Apply to project** - Paste into `src/app/globals.css`

## Current Theme Configuration

### Light Mode

```css
--color-primary: hsl(239, 85%, 67%);
--color-background: hsl(0, 0%, 100%);
--color-foreground: hsl(237, 100%, 4%);
--color-muted: hsl(221, 69%, 94%);
--color-muted-foreground: hsl(216, 19%, 33%);
```

### Dark Mode

```css
--color-background: hsl(235, 16%, 15%);
--color-foreground: hsl(0, 0%, 100%);
--color-muted: hsl(236, 11%, 27%);
--color-muted-foreground: hsl(216, 19%, 72%);
```

## Workflow Steps

### 1. Setup Current Theme in tweakcn

- Go to tweakcn.com
- Input your current color values (see above)
- Verify that preview matches your app

### 2. Experiment with Changes

- Adjust primary color for brand changes
- Modify background/foreground for contrast
- Fine-tune muted colors for subtle UI elements
- Test dark mode variants

### 3. Export and Apply

```bash
# 1. Copy generated CSS from tweakcn
# 2. Open globals.css
open src/app/globals.css

# 3. Replace @theme block with new values
# 4. Save and check in browser
```

### 4. Validate Changes

- Check light mode: looks correct?
- Check dark mode: sufficient contrast?
- Test all components: Button, Card, Input, etc.
- Verify accessibility: contrast ratios meet WCAG AA

## Protected Tokens

**⚠️ Do NOT change these without careful consideration:**

```css
--color-primary        /* Brand identity */
--color-destructive    /* Delete/warning actions */
--color-success        /* Confirmation actions */
--radius-*             /* Border radius system */
```

## Tips

- **Start small**: Change one token at a time
- **Test thoroughly**: Check both light and dark modes
- **Keep backups**: `globals.css.backup` exists for rollback
- **Document changes**: Note why you changed specific tokens
- **Accessibility first**: Use contrast checkers

## Troubleshooting

### Theme doesn't apply

- Clear browser cache (Cmd+Shift+R)
- Check for CSS syntax errors
- Verify HSL values are correct format

### Dark mode broken

- Ensure `.dark` selector overrides are present
- Check that all color tokens have dark variants
- Test `next-themes` provider is working

### Components look wrong

- Compare with backup: `git diff src/app/globals.css`
- Verify all shadcn components use semantic tokens
- Check custom components aren't using hardcoded colors

## Resources

- [tweakcn.com](https://tweakcn.com) - Visual theme editor
- [shadcn/ui theming docs](https://ui.shadcn.com/docs/theming)
- [HSL color picker](https://hslpicker.com)
- [Contrast checker](https://webaim.org/resources/contrastchecker/)
