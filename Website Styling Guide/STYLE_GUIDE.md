# Website Styling Guide

## Brand Principles
- Tone: confident, clear, and professional with a modern, tech-forward voice.
- Visual feel: sharp, high-contrast, premium; emphasizes clarity, precision, and momentum.
- Seriousness: enterprise-grade with a polished, credible presentation.
- AI/tech positioning: innovation-focused, infrastructure-minded, and outcomes-oriented.

## Approved Libraries and Tools
- Next.js + React + TypeScript
- Tailwind CSS
- shadcn/ui for UI primitives
- Animate UI for standard animations
- Framer Motion for complex/scroll animations
- react-three-fiber for canvas/3D when needed

## Consistency Note
Every new section should align with the brand principles above and reuse the same libraries and patterns already present in the project.

## Typography Standard
- English default text must use `font-brand`.
- English major headings and display titles must use `font-brand-display`.
- `font-brand` and `font-brand-display` both use:
  - `'Google Sans Flex', var(--font-jakarta), system-ui, -apple-system, sans-serif`
- `font-brand-display` adds display variation settings:
  - `'wght' 500, 'wdth' 100, 'opsz' 48`

### Arabic Rule
- Arabic must remain Cairo-based.
- Use `font-cairo` for Arabic page/container defaults.
- Use `arabic-text` for Arabic section and inline text where language is `ar`.

### Do
- Apply `font-brand` at English/LTR root containers.
- Apply `font-brand-display` to key headings (`h1`, `h2`, `h3`) and prominent metrics.
- Keep language conditionals for Arabic typography intact.

### Do Not
- Do not use `font-inter` for new English typography.
- Do not use `font-[var(--font-jakarta)]` directly in class names.
- Do not apply English display variation settings to Arabic text.

## Button Standard
- Primary button uses a stronger mint liquid-glass treatment.
- Secondary button uses a softer neutral liquid-glass treatment.
- Canonical primary traits:
  - richer mint tint
  - stronger blur
  - glass highlight + elevated shadow
- Canonical secondary traits:
  - translucent neutral surface
  - softer shadow
  - mint-accent hover border

### Implementation Rule
- Use `variant="brand"` for primary CTAs.
- Use `variant="secondary"` (and secondary outline-style variants) for secondary CTAs.
- Keep utility controls (theme/language style toggles) as low-emphasis variants like `ghost`.
- Keep destructive actions separate and not liquid-glass primary.
- Use shared liquid-glass tokens from `src/components/ui/button.tsx` as the source of truth.

### Do Not
- Do not use legacy solid gradient primary buttons.
- Do not give secondary CTAs the same visual weight as primary.
- Do not create ad-hoc per-section primary button styling when shared variants cover the need.
