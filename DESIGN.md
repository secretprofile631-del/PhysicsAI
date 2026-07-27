---
name: Nocturne
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#dac0c9'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#a28a93'
  outline-variant: '#544249'
  surface-tint: '#ffafd3'
  primary: '#ffafd3'
  on-primary: '#620040'
  primary-container: '#f472b6'
  on-primary-container: '#6d0047'
  inverse-primary: '#a43073'
  secondary: '#cebdff'
  on-secondary: '#381385'
  secondary-container: '#4f319c'
  on-secondary-container: '#bea8ff'
  tertiary: '#c3c6d7'
  on-tertiary: '#2c303d'
  tertiary-container: '#9b9eaf'
  on-tertiary-container: '#323543'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffd8e7'
  primary-fixed-dim: '#ffafd3'
  on-primary-fixed: '#3d0026'
  on-primary-fixed-variant: '#85145a'
  secondary-fixed: '#e8ddff'
  secondary-fixed-dim: '#cebdff'
  on-secondary-fixed: '#21005e'
  on-secondary-fixed-variant: '#4f319c'
  tertiary-fixed: '#dfe2f3'
  tertiary-fixed-dim: '#c3c6d7'
  on-tertiary-fixed: '#171b28'
  on-tertiary-fixed-variant: '#434654'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is built upon a "Cinematic Nocturne" aesthetic—an atmospheric, dark-mode experience that evokes the quiet intimacy of a clear night sky. It targets a sophisticated audience looking for an emotional, premium connection rather than traditional wedding tropes. 

The visual style leverages **Glassmorphism** and **Minimalism** to create depth. Surfaces feel like dark obsidian or polished glass, layered over a deep cosmic void. The emotional response is one of serenity, wonder, and modern romance. Interaction is defined by soft transitions, background blurs, and a sense of weightlessness.

## Colors
The palette is anchored in the depths of the night, using **Midnight Black** as the primary canvas to allow accent colors to "glow" like distant nebulae. 

- **Primary (Rose Pink):** Used sparingly for key calls to action and emotional highlights. It represents the warmth of a sunset's last light.
- **Secondary (Soft Purple):** Used for interactive states, secondary buttons, and subtle gradients.
- **Tertiary (Deep Navy):** Provides a transitional layer between the absolute black background and the glass components.
- **Warm White:** Employed for high-readability text and icons, softened to prevent harsh contrast against the dark background.
- **Gradients:** Use a linear gradient (45deg) from Soft Purple to Rose Pink for primary interactive elements to simulate a soft light source.

## Typography
The typography pairing balances classical elegance with modern precision. 

**Playfair Display** (Serif) is the voice of the brand—used for headlines and editorial moments. It should be typeset with slightly tighter letter-spacing in larger sizes to emphasize its cinematic quality.

**Manrope** (Sans-serif) provides a clean, professional, and highly legible counterpoint for body copy and UI labels. It maintains the modern feel of the system and ensures that functional information is never lost in the atmosphere.

## Layout & Spacing
The layout philosophy is **Fluid and Breathable**. High whitespace (or "dark space") is essential to maintain the premium feel. 

- **Grid:** A 12-column fluid grid for desktop with wide margins (64px) to center-align core content, creating a cinematic "widescreen" focus.
- **Rhythm:** Use an 8px baseline grid. Stack spacing should be generous; use `stack-lg` between major sections to allow the background atmosphere to breathe.
- **Mobile:** Transition to a 4-column grid. Reduce vertical margins but maintain the `stack-md` spacing to avoid a cluttered appearance.

## Elevation & Depth
Depth is created through **Glassmorphism** and light-based layering rather than traditional shadows.

1.  **Base Layer:** Midnight Black (#020408) with a very subtle radial gradient of Deep Navy in the center.
2.  **Glass Layer:** Surfaces use a semi-transparent Deep Navy (#0A0E1A) with a 20px - 40px backdrop blur. 
3.  **Border Glow:** Instead of shadows, use a 1px solid stroke with 10% opacity Warm White. For active elements, this stroke can transition to a Soft Purple glow.
4.  **Particles:** Implement a low-z-index canvas layer with slowly drifting, soft-edged particles (1px to 3px) in Warm White and Rose Pink, appearing only behind glass panels.

## Shapes
The design system uses a **Rounded** shape language to feel approachable and organic. 

- **Standard Elements:** Buttons and input fields use a 0.5rem (8px) corner radius.
- **Feature Cards:** Larger glass containers use `rounded-xl` (1.5rem/24px) to soften the layout and feel more like modern hardware or premium surfacing.
- **Interactive States:** On hover, shapes may subtly expand by 2-4px to create a "pulsing" organic effect.

## Components

### Buttons
- **Primary:** Gradient background (Purple to Pink), Warm White text, no border. Subtle outer glow on hover.
- **Secondary:** Glass background (15% opacity), 1px Warm White border (20% opacity). 

### Cards (Glassmorphism)
- Background: `#0A0E1A` at 60% opacity.
- Backdrop Blur: `blur(24px)`.
- Border: 1px linear gradient (top-left to bottom-right) from 20% white to 0% white.

### Input Fields
- Background: Absolute black or very dark navy.
- Border: Bottom-only 1px stroke in Warm White (30% opacity). On focus, the stroke becomes a Soft Purple to Rose Pink gradient.

### Chips & Tags
- Pill-shaped with a low-opacity Purple background and 12px `label-caps` typography.

### Progress Indicators
- Ultra-thin (2px) lines using the primary gradient. Avoid heavy circular loaders; use elegant, fading line animations to maintain the cinematic feel.

### Selection Controls
- **Checkboxes/Radios:** Custom circular designs. When selected, they should glow with a Rose Pink center and a soft outer halo.