# blinkX Design System V1 - Loader

Generated from `src/components/Loader.stories.tsx`, `src/components/BlinkXLoader.tsx`, and `src/components/BlinkXLoader.css` so the downloadable markdown matches the Storybook Loader page.

## Component

`BlinkXLoader` is the compact blinkX loading indicator. It combines a circular surface, blinkX logo, neutral background ring, and animated brand ring. It supports light and dark themes and three rotation behaviors.

```tsx
import { BlinkXLoader } from './BlinkXLoader'
import './BlinkXLoader.css'

export function Example() {
  return <BlinkXLoader rotatingVariation="Constant" theme="light" />
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `rotatingVariation` | `"Constant" \| "Breathing arc" \| "Stretch"` | `"Constant"` | Controls the animation behavior of the rotating ring. |
| `aria-label` | `string` | `"Loading"` | Accessible status text. |
| `className` | `string` | `""` | Optional class appended to the root. |

## Figma Component

| Item | Value |
| --- | --- |
| Loader | `6194:15899` |
| Surface | `6194:15904` |
| Logo | `6194:15912` |
| Bg - Grey Ring | `6194:15913` |
| Rotating Ring | `6194:15914` |
| Storybook title | `Components / Loader` |
| Component properties | `Theme`, `Rotating variation` |

## Layout Specs

| Element | Value |
| --- | --- |
| Wrapper | `56px` x `56px` / `3.5rem` x `3.5rem` |
| Surface | `56px` x `56px` / `3.5rem` x `3.5rem` |
| Surface radius | `999px` |
| Ring SVG | `56px` x `56px` / `3.5rem` x `3.5rem` |
| Ring viewBox | `0 0 56 56` |
| Ring circle radius | `25.35px` |
| Ring stroke width | `5.3px` / `0.3313rem` |
| Fixed arc length | `104px` dash with `55.3px` gap on a `159.3px` circumference |
| Logo | `28px` x `28px` / `1.75rem` x `1.75rem` |
| Surface shadow | None |

## Rotation Variations

| Variation | Behavior | Timing |
| --- | --- | --- |
| `Constant` | Fixed 90deg arc, constant-speed rotation. Predictable and quiet - the safe default. | `linear` / `0.8s` |
| `Breathing arc` | The arc rotates while its stroke thickens and thins. Subtle weight shift, no length change. | rotate + stroke-width / `1.4s` |
| `Stretch` | The arc itself grows and shrinks while rotating. Most expressive - the Material indeterminate spinner. | rotate + dash / `1.8s` |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Rotating ring | Gradient `#F8BC67` -> `#FB8043` -> `#DD3B59` | `Gradient/G4` |
| Grey ring | `#F2F2F2` | `Bg - Grey Ring` |
| Surface | `#FFFFFF` | `Color/Surface - Elevation/surface 1` -> `Colors/surface/Light/1` |
| Shadow | None | Loader node effects |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Rotating ring | Gradient `#F8BC6799` -> `#FB804399` -> `#DD3B5999` | `Color/Gradient/g-5_alpha-60` -> `Color/Gradient/g-4_alpha-60` -> `Color/Gradient/g-3_alpha-60` |
| Grey ring | `#33373B` | `Color/background/brand/bg-brand-disable` -> `Colors/neutral/Dark/neutral-100` |
| Surface | `#1A1E23` | `Color/Surface - Elevation/surface 1` -> `Colors/surface/Dark/1` |
| Shadow | None | Loader node effects |

## Accessibility

| Rule | Value |
| --- | --- |
| Root role | `status` |
| Live region | `aria-live="polite"` |
| Accessible name | `aria-label`, default `"Loading"` |
| Decorative SVGs | `aria-hidden="true"` |
| Reduced motion | Animations collapse to a single short iteration under `prefers-reduced-motion: reduce`. |

## Core Component Code

```tsx
import { useId, type HTMLAttributes } from 'react'
import './BlinkXLoader.css'

export type BlinkXLoaderTheme = 'light' | 'dark'
export type BlinkXLoaderVariation = 'Constant' | 'Breathing arc' | 'Stretch'

export type BlinkXLoaderProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  rotatingVariation?: BlinkXLoaderVariation
  theme?: BlinkXLoaderTheme
}

const variationClassNames: Record<BlinkXLoaderVariation, string> = {
  Constant: 'blinkx-loader--variation-constant',
  'Breathing arc': 'blinkx-loader--variation-breathing-arc',
  Stretch: 'blinkx-loader--variation-stretch',
}

export function BlinkXLoader({
  'aria-label': ariaLabel = 'Loading',
  className = '',
  rotatingVariation = 'Constant',
  theme = 'light',
  ...loaderProps
}: BlinkXLoaderProps) {
  const gradientIdSeed = useId().replace(/:/g, '')
  const logoGradientId = `blinkx-loader-logo-gradient-${gradientIdSeed}`
  const ringGradientId = `blinkx-loader-ring-gradient-${gradientIdSeed}`
  const classes = [
    'blinkx-loader',
    `blinkx-loader--theme-${theme}`,
    variationClassNames[rotatingVariation],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...loaderProps}
      aria-label={ariaLabel}
      aria-live="polite"
      className={classes}
      data-theme={theme}
      data-variation={rotatingVariation}
      role="status"
    >
      <span aria-hidden="true" className="blinkx-loader__surface">
        <svg className="blinkx-loader__ring" fill="none" viewBox="0 0 56 56">
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id={ringGradientId}
              x1="8"
              x2="38"
              y1="46"
              y2="4"
            >
              <stop stopColor="var(--loader-arc-start)" />
              <stop offset="0.44230768" stopColor="var(--loader-arc-middle)" />
              <stop offset="1" stopColor="var(--loader-arc-end)" />
            </linearGradient>
          </defs>
          <circle className="blinkx-loader__track" cx="28" cy="28" r="25.35" />
          <circle
            className="blinkx-loader__arc"
            cx="28"
            cy="28"
            r="25.35"
            style={{ stroke: `url(#${ringGradientId})` }}
          />
        </svg>

        <span className="blinkx-loader__logo">
          <BlinkXLoaderLogo gradientId={logoGradientId} />
        </span>
      </span>
    </div>
  )
}
```

## Core CSS

```css
.blinkx-loader {
  --loader-arc-end: #dd3b59;
  --loader-arc-middle: #fb8043;
  --loader-arc-start: #f8bc67;
  --loader-surface: #ffffff;
  --loader-track: #f2f2f2;
  align-items: center;
  display: inline-flex;
  height: 56px;
  justify-content: center;
  width: 56px;
}

.blinkx-loader--theme-dark {
  --loader-arc-end: #dd3b5999;
  --loader-arc-middle: #fb804399;
  --loader-arc-start: #f8bc6799;
  --loader-surface: #1a1e23;
  --loader-track: #33373b;
}

.blinkx-loader__surface {
  align-items: center;
  background: var(--loader-surface);
  border-radius: 999px;
  display: inline-flex;
  height: 56px;
  justify-content: center;
  position: relative;
  width: 56px;
}

.blinkx-loader__ring {
  height: 56px;
  overflow: visible;
  position: absolute;
  transform-origin: 50% 50%;
  width: 56px;
}

.blinkx-loader__track,
.blinkx-loader__arc {
  fill: none;
  stroke-width: 5.3;
}

.blinkx-loader__track {
  stroke: var(--loader-track);
}

.blinkx-loader__arc {
  stroke-dasharray: 104 55.3;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
}

.blinkx-loader__logo {
  align-items: center;
  display: inline-flex;
  height: 28px;
  justify-content: center;
  position: relative;
  width: 28px;
  z-index: 1;
}

.blinkx-loader--variation-constant .blinkx-loader__ring {
  animation: blinkx-loader-rotate 0.8s linear infinite;
}

.blinkx-loader--variation-breathing-arc .blinkx-loader__ring {
  animation: blinkx-loader-rotate 1.4s linear infinite;
}

.blinkx-loader--variation-breathing-arc .blinkx-loader__arc {
  animation: blinkx-loader-breathe-width 1.4s ease-in-out infinite;
}

.blinkx-loader--variation-stretch .blinkx-loader__ring {
  animation: blinkx-loader-rotate 1.8s linear infinite;
}

.blinkx-loader--variation-stretch .blinkx-loader__arc {
  animation: blinkx-loader-stretch 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes blinkx-loader-rotate {
  to {
    transform: rotate(360deg);
  }
}

@keyframes blinkx-loader-breathe-width {
  0% {
    stroke-width: 4.3;
  }

  50% {
    stroke-width: 6.3;
  }

  100% {
    stroke-width: 4.3;
  }
}

@keyframes blinkx-loader-stretch {
  0% {
    stroke-dasharray: 40 119.3;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 124 35.3;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 40 119.3;
    stroke-dashoffset: -159.3;
  }
}
```
