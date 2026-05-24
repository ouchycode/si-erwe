---
name: design-system-sekretariat-rw-12-pegangsaan-dua-kelapa-gading
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Sekretariat RW 12 Pegangsaan Dua, Kelapa Gading

## Mission

Deliver implementation-ready design-system guidance for Sekretariat RW 12 Pegangsaan Dua, Kelapa Gading that can be applied consistently across dashboard web app interfaces.

## Brand

- Product/brand: Sekretariat RW 12 Pegangsaan Dua, Kelapa Gading
- URL: https://rw-12.id/
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations

- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Figtree Variable`, `font.family.stack=Figtree Variable, Helvetica, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=27.2px`
- Typography scale: `font.size.xs=10px`, `font.size.sm=12px`, `font.size.md=14.4px`, `font.size.lg=16px`, `font.size.xl=20px`, `font.size.2xl=21.3px`, `font.size.3xl=28.4px`, `font.size.4xl=37.9px`
- Color palette: `color.text.primary=#404040`, `color.surface.base=#000000`, `color.text.tertiary=#ffffff`, `color.surface.muted=#f5f5f5`, `color.surface.raised=#fafafa`, `color.surface.strong=#0a0a0a`, `color.border.default=#dddedf`, `color.border.strong=#808080`
- Spacing scale: `space.1=5px`, `space.2=5.76px`, `space.3=8px`, `space.4=10px`, `space.5=10.1px`, `space.6=13.5px`, `space.7=14.4px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=4px` | `motion.duration.instant=100ms`, `motion.duration.fast=200ms`, `motion.duration.normal=400ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

concise, confident, implementation-focused

## Rules: Do

- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure

- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
