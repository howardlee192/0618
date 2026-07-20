# Design System & Guidelines (0618 Project)

This document outlines the core design guidelines, typography, color palette, and interactive components for the `0618` frontend project. It serves as a reference for developers and AI agents to maintain a consistent aesthetic and user experience.

## 1. Core Aesthetic & Concept
The project adopts a **minimalist, highly interactive, and creative portfolio style**. It blends brutalist/monospace typographic elements with modern WebGL effects (fluid distortion, glassmorphism, 3D sliders). It emphasizes micro-interactions and smooth page transitions over complex layouts.

## 2. Color Palette
The color palette is extremely focused and high-contrast, leaning towards a warm, paper-like aesthetic with stark foreground elements.

- **Background (`bg-background`)**: `#F4F3ED` (Warm off-white/beige)
- **Foreground (`text-foreground`)**: `#0A0A0A` (Near black)
- **Gray Accent (`.gray-box`)**: 
  - Background: `#E0E0E0`
  - Text: `#888888`

## 3. Typography
The typography system uses a mix of modern geometric sans-serif, monospace, and a dedicated CJK web font (`Swei Bow Sans`) for Chinese characters.

- **Body Text (`font-['Mozilla_Text']`)**: 
  - Primary: `'Mozilla Text', monospace`
  - Fallback/CJK: `'Swei Bow Sans'`
  - Usage: General paragraphs, small labels, UI text.

- **Headings (`h1, h2, h3`, `font-['Space_Grotesk']`)**: 
  - Primary: `'Space Grotesk', sans-serif`
  - Fallback/CJK: `'Swei Bow Sans'`
  - Styling: Tightly kerned (`letter-spacing: -0.05em`).
  - Usage: Titles, prominent display text.

## 4. UI Components & Interaction System
The project relies heavily on custom interactive components rather than standard UI library buttons/cards.

### Key Visual Effects
- **WebGL & Distortion**: `WebGLFluidDistortion`, `GlassRefractionWrapper`
  - Used for background ambient effects or distorting underlying content to create a liquid/glassy feel.
- **3D Elements**: `Spiral3DSlider`, `text-3d-flip`, `transform-3d` utilities.
  - Adds depth to galleries and text interactions.
- **Glitch & Scramble**: `ScrambleText`, `ascii-art`, `.animate-flicker`
  - Introduces a hacker/retro-digital vibe to text rendering.

### Animations & Transitions
- **Framer Motion (`<AnimatePresence>`)**: Page transitions (`HomeTransition`, `PageTransition`) ensure seamless navigation without hard reloads.
- **CSS Animations**:
  - `animate-flicker`: Fast opacity toggling for glitch effects.
  - `animate-hint-*`: Slow, rhythmic opacity pulsing (40% or 80%) used for bilingual or subtle hint text reveal.
- **Hover Reveal**: `HoverReveal.tsx` component is used to reveal images/videos upon cursor interaction.

## 5. Development Guidelines
- **Styling**: Always use Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary (e.g., specific WebGL canvas positioning or custom `@keyframes`).
- **Context Menu**: The `App.tsx` globally disables the right-click context menu on images and videos to protect assets.
- **Routing**: All new pages must be wrapped in `<PageTransition>` inside `App.tsx` to maintain the SPA transition experience.
- **Language**: The site supports a `LanguageContext`, so hardcoded strings should ideally be connected to the translation toggle (`LanguageToggle.tsx`).

---
*Generated for AI Agent reference.*
