---
name: FreshBites Brand Identity
colors:
  surface: '#fff8f6'
  surface-dim: '#eed5cd'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ed'
  surface-container: '#ffe9e3'
  surface-container-high: '#fde3db'
  surface-container-highest: '#f7ddd5'
  on-surface: '#261814'
  on-surface-variant: '#594139'
  inverse-surface: '#3c2d28'
  inverse-on-surface: '#ffede8'
  outline: '#8d7168'
  outline-variant: '#e1bfb5'
  surface-tint: '#ab3500'
  primary: '#ab3500'
  on-primary: '#ffffff'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ffb59d'
  secondary: '#5a5d70'
  on-secondary: '#ffffff'
  secondary-container: '#dee1f8'
  on-secondary-container: '#606376'
  tertiary: '#00677e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a7cb'
  on-tertiary-container: '#003744'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#dee1f8'
  secondary-fixed-dim: '#c2c5db'
  on-secondary-fixed: '#171b2b'
  on-secondary-fixed-variant: '#424658'
  tertiary-fixed: '#b5ebff'
  tertiary-fixed-dim: '#59d5fb'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#fff8f6'
  on-background: '#261814'
  surface-variant: '#f7ddd5'
typography:
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  gutter: 16px
  margin: 20px
---

## Brand & Style

The brand personality is efficient, appetizing, and dependable. This design system utilizes a **Corporate / Modern** aesthetic, prioritizing clarity and ease of use to ensure the food remains the hero of the experience. By leveraging a high-contrast primary palette against a neutral background, the UI evokes an emotional response of freshness and professional reliability.

The interface relies on substantial white space to reduce cognitive load during the decision-making process. The visual language is sophisticated yet accessible, catering to busy professionals and families who value quality and speed.

## Colors

The palette is anchored by a vibrant orange primary color, scientifically chosen to stimulate appetite and drive action. This is balanced by a deep charcoal secondary color used for primary text and structural elements, providing a grounded, premium feel. 

The background uses a specific light gray to reduce screen glare and distinguish the white cards and containers that house content. Status colors are used sparingly for order tracking and system feedback to maintain the minimal aesthetic.

## Typography

This design system utilizes **Inter** for its exceptional legibility and systematic performance across mobile and web interfaces. The typographic hierarchy is strictly enforced to guide users through restaurant menus and checkout flows effortlessly.

Headlines use tighter letter spacing and heavier weights to create impact, while body copy maintains a generous line height to ensure readability during quick scrolling. Labels are used for metadata like delivery times, ratings, and price points.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile-first consumption. A standard 4-column grid is used for mobile devices, expanding to 12 columns for desktop viewports. 

A strict 4px baseline grid ensures a consistent rhythmic flow. Sections are separated by large white space (32px or 48px) to clearly demarcate different cuisines or promotional offers, while internal card components use tighter padding (12px or 16px) to maintain information density.

## Elevation & Depth

Visual hierarchy is established through **Ambient Shadows** and tonal layering. Surfaces do not use heavy borders; instead, they rely on soft, diffused shadows with a low-opacity charcoal tint (#2D3142 at 8-12%) to suggest lift.

- **Level 0 (Background):** Light Gray (#F7F9FB) - The base canvas.
- **Level 1 (Cards):** Pure White (#FFFFFF) - Used for restaurant cards and menu items, featuring a subtle shadow.
- **Level 2 (Modals/Overlays):** Pure White (#FFFFFF) - Higher elevation with a more pronounced shadow (16px blur) for cart summaries and filter drawers.

## Shapes

The shape language is defined by a consistent 12px corner radius (defined as level 2). This "rounded" approach softens the professional aesthetic, making the app feel more approachable and modern. 

- **Standard Elements:** Buttons, input fields, and small cards use the base 12px radius.
- **Containers:** Large promotional banners and featured restaurant cards use "rounded-lg" (16px) to emphasize their importance.
- **Interactive Small Elements:** Chips and badges use "rounded-xl" (24px) to create a pill-shaped appearance, distinguishing them from primary action buttons.

## Components

**Buttons**
Primary buttons are solid Vibrant Orange with white text, utilizing the 12px border radius. Secondary buttons use a charcoal outline or a subtle gray fill for less critical actions like "Add more."

**Cards**
Restaurant and dish cards are the primary vessel for content. They feature a white background, the standard 12px roundedness, and a subtle shadow. Content within cards should follow the 16px internal padding rule.

**Input Fields**
Search bars and form fields use a white background with a 1px border in light gray. Upon focus, the border transitions to the primary orange.

**Chips**
Used for categories (e.g., "Burger," "Vegan," "Fast Delivery"). These should be pill-shaped with a light gray background and secondary charcoal text.

**Status Trackers**
Unique to this design system, a vertical or horizontal progress stepper for delivery tracking uses the primary orange for completed states and a light gray for pending states, ensuring the user can glance and understand progress instantly.

**Quantity Selectors**
A specialized component for food ordering. These use a minimal layout with a charcoal "minus" and "plus" icon flanking the numerical value, typically housed within a 12px rounded container.