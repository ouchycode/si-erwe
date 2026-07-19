# Sekretariat RW 04 Pabuaran, Kota Tangerang

## Mission

Create implementation-ready, token-driven UI guidance for Sekretariat RW 04 Pabuaran, Kota Tangerang that is optimized for consistency, accessibility, and fast delivery across dashboard web app.

## Brand

- Product/brand: Sekretariat RW 04 Pabuaran, Kota Tangerang
- URL: https://rw-04.id/
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations

- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Figtree Variable`, `font.family.stack=Figtree Variable, Helvetica, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=27.2px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=12px`, `font.size.md=14.4px`, `font.size.lg=16px`, `font.size.xl=20px`, `font.size.2xl=21.3px`, `font.size.3xl=28.4px`, `font.size.4xl=37.9px`
- Color palette: `color.text.primary=#bfbfbf`, `color.text.secondary=#ffffff`, `color.text.tertiary=#0a0a0a`, `color.surface.base=#000000`, `color.surface.muted=#171717`, `color.surface.raised=#141414`, `color.border.default=#dddedf`
- Spacing scale: `space.1=5px`, `space.2=5.76px`, `space.3=8px`, `space.4=10px`, `space.5=10.1px`, `space.6=13.5px`, `space.7=14.4px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=4px` | `motion.duration.instant=100ms`, `motion.duration.fast=200ms`, `motion.duration.normal=400ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

Concise, confident, implementation-focused.

## Rules: Do

- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure

- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (54), buttons (18), lists (16), cards (3), navigation (3).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
