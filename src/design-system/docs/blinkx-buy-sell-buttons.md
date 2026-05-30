# blinkX Design System V1 - Buy/Sell Buttons

Generated from `src/components/BuySellButtons.stories.tsx` and `src/components/BlinkXBuySellButton.css` so the downloadable markdown matches the Storybook Buy/Sell page.

## Component

`BlinkXBuySellButton` is the trading CTA component used for buy and sell actions. It supports filled primary CTAs, outline secondary CTAs, full text labels, symbol-only labels, five sizes, four states, and light/dark themes.

```tsx
import { BlinkXBuySellButton } from './BlinkXBuySellButton'
import './BlinkXBuySellButton.css'

export function Example() {
  return (
    <BlinkXBuySellButton
      bs="Buy"
      type="Primary"
      buttonStyle="Default"
      size="lg"
      state="Default"
      theme="light"
    />
  )
}
```

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `bs` | `"Buy" \| "Sell"` | `"Buy"` | Selects the green buy tone or red sell tone. |
| `type` | `"Primary" \| "Secondary"` | `"Primary"` | Primary is filled. Secondary is outlined. |
| `buttonStyle` | `"Default" \| "Symbol"` | `"Default"` | Default shows full CTA text. Symbol shows `B` or `S`. |
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"sm"` | Controls height, horizontal padding, type size, and line height. |
| `state` | `"Default" \| "Focused" \| "Hover" \| "Disabled"` | `"Default"` | Storybook state preview. `Disabled` also disables the native button. |
| `theme` | `"light" \| "dark"` | `"light"` | Uses light or dark Figma token values. |
| `textOnBuyPrimary` | `string` | `"Buy"` | Text shown for Buy + Primary + Default style. |
| `textOnBuySecondary` | `string` | `"Buy"` | Text shown for Buy + Secondary + Default style. |
| `textOnSellPrimary` | `string` | `"Sell"` | Text shown for Sell + Primary + Default style. |
| `textOnSellSecondary` | `string` | `"Sell"` | Text shown for Sell + Secondary + Default style. |
| `textOnSymbolBuy` | `string` | `"B"` | Text shown for Buy + Symbol style. |
| `textOnSymbolSell` | `string` | `"S"` | Text shown for Sell + Symbol style. |
| `htmlType` | `"button" \| "submit" \| "reset"` | `"button"` | Native button type. |

## Figma Component Set

| Item | Value |
| --- | --- |
| Figma node | `83:1313` |
| Component set | `CTA B/S Light` |
| Variants | `Type`, `Style`, `B/S`, `Size`, `State`, `Theme` |
| Types | `Primary`, `Secondary` |
| Styles | `Default`, `Symbol` |
| B/S | `Buy`, `Sell` |
| Sizes | `sm`, `md`, `lg`, `xl`, `2xl` |
| States | `Default`, `Focused`, `Hover`, `Disabled` |
| Themes | `light`, `dark` |

## Size Specs

| Size | Height | Default padding X | Symbol padding X | Font size | Line height | Default sample width | Symbol sample width |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `sm` | `24px` / `1.5rem` | `16px` / `1rem` | `10px` / `0.625rem` | `12px` / `0.75rem` | `16px` / `1rem` | `52px` / `3.25rem` | `28px` / `1.75rem` |
| `md` | `32px` / `2rem` | `20px` / `1.25rem` | `14px` / `0.875rem` | `12px` / `0.75rem` | `16px` / `1rem` | `60px` / `3.75rem` | `36px` / `2.25rem` |
| `lg` | `36px` / `2.25rem` | `24px` / `1.5rem` | `16px` / `1rem` | `14px` / `0.875rem` | `20px` / `1.25rem` | `72px` / `4.5rem` | `42px` / `2.625rem` |
| `xl` | `40px` / `2.5rem` | `28px` / `1.75rem` | `20px` / `1.25rem` | `16px` / `1rem` | `24px` / `1.5rem` | `82px` / `5.125rem` | `50px` / `3.125rem` |
| `2xl` | `48px` / `3rem` | `32px` / `2rem` | `24px` / `1.5rem` | `18px` / `1.125rem` | `24px` / `1.5rem` | `94px` / `5.875rem` | `60px` / `3.75rem` |

## Shared Layout

| Property | Value |
| --- | --- |
| Width | `auto`, hug content |
| Min width | none |
| Border radius | `9999px` |
| Padding top | `4px` / `0.25rem` |
| Padding bottom | `4px` / `0.25rem` |
| Font family | `Barlow`, fallback sans-serif |
| Font weight | `600` / SemiBold |
| Letter spacing | `0` |
| Text alignment | center |
| Text overflow | visible, no truncation |
| Transition | `background`, `border-color`, and `color` at `160ms ease` |

## Light Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Buy primary background default | `#2BB02B` | `Colors/green/Light/green-500` |
| Buy primary background hover | `#289329` | `Colors/green/Light/green-600` |
| Buy secondary background hover | `#E9F7E9` | `Colors/green/Light/green-50` |
| Buy focus ring | `#D5EFD5` | `Colors/green/Light/green-100` |
| Buy stroke | `#2BB02B` | `Colors/green/Light/green-500` |
| Buy text | `#2BB02B` | `Colors/green/Light/green-500` |
| Sell primary background default | `#DD2006` | `Colors/red/Light/red-500` |
| Sell primary background hover | `#B6200C` | `Colors/red/Light/red-600` |
| Sell secondary background hover | `#FBE8E6` | `Colors/red/Light/red-50` |
| Sell focus ring | `#F8D2CD` | `Colors/red/Light/red-100` |
| Sell stroke | `#DD2006` | `Colors/red/Light/red-500` |
| Sell text | `#DD2006` | `Colors/red/Light/red-500` |
| Disabled background | `#E7E7E7` | `Colors/neutral/Light/neutral-100` |
| Disabled stroke | `#CECECE` | `Colors/neutral/Light/neutral-200` |
| Disabled text | `#9D9D9D` | `Colors/neutral/Light/neutral-400` |
| Primary text | `#FFFFFF` | `Colors/base/white` |

## Dark Theme Tokens

| Usage | Value | Figma variable |
| --- | --- | --- |
| Buy primary background default | `#48A848` | `Colors/green/Dark/green-500` |
| Buy primary background hover | `#367139` | `Colors/green/Dark/green-300` |
| Buy secondary background hover | `#1F2C27` | `Colors/green/Dark/green-50` |
| Buy focus ring | `#2C5532` | `Colors/green/Dark/green-200` |
| Buy stroke | `#48A848` | `Colors/green/Dark/green-500` |
| Buy text | `#48A848` | `Colors/green/Dark/green-500` |
| Sell primary background default | `#CD4937` | `Colors/red/Dark/red-500` |
| Sell primary background hover | `#85382F` | `Colors/red/Dark/red-300` |
| Sell secondary background hover | `#2C2225` | `Colors/red/Dark/red-50` |
| Sell focus ring | `#622F2B` | `Colors/red/Dark/red-200` |
| Sell stroke | `#CD4937` | `Colors/red/Dark/red-500` |
| Sell text | `#CD4937` | `Colors/red/Dark/red-500` |
| Disabled background | `#33373B` | `Colors/neutral/Dark/neutral-100` |
| Disabled stroke | `#4D4F52` | `Colors/neutral/Dark/neutral-200` |
| Disabled text | `#808081` | `Colors/neutral/Dark/neutral-400` |
| Primary text | `#FFFFFF` | `Colors/base/white` |

## State Rules

| State | Primary | Secondary |
| --- | --- | --- |
| `Default` | Uses buy/sell fill and white text. | Transparent fill, buy/sell stroke, buy/sell text. |
| `Hover` | Background changes to the buy/sell primary hover token. | Background changes to the buy/sell secondary hover token. |
| `Focused` | Adds `3px` focus ring using the buy/sell focus token. | Adds `3px` focus ring using the buy/sell focus token. |
| `Disabled` | Disabled background, disabled text, `not-allowed` cursor. | Disabled stroke, disabled text, `not-allowed` cursor. |

## Primary CTA CSS

```css
.blinkx-buy-sell-button.blinkx-buy-sell-button--type-primary {
  background: var(--bs-tone-bg-default);
  border: 1px solid transparent;
  color: var(--bs-text-on-primary);
}

.blinkx-buy-sell-button.blinkx-buy-sell-button--type-primary:hover:not(:disabled),
.blinkx-buy-sell-button.blinkx-buy-sell-button--type-primary.blinkx-buy-sell-button--state-hover {
  background: var(--bs-tone-bg-hover-primary);
}

.blinkx-buy-sell-button.blinkx-buy-sell-button--type-primary:disabled {
  background: var(--bs-bg-disabled);
  color: var(--bs-text-disabled);
}
```

## Secondary CTA CSS

```css
.blinkx-buy-sell-button.blinkx-buy-sell-button--type-secondary {
  background: transparent;
  border: 1px solid var(--bs-tone-stroke);
  color: var(--bs-tone-text);
}

.blinkx-buy-sell-button.blinkx-buy-sell-button--type-secondary:hover:not(:disabled),
.blinkx-buy-sell-button.blinkx-buy-sell-button--type-secondary.blinkx-buy-sell-button--state-hover {
  background: var(--bs-tone-bg-hover-secondary);
}

.blinkx-buy-sell-button.blinkx-buy-sell-button--type-secondary:disabled {
  border-color: var(--bs-stroke-disabled);
  color: var(--bs-text-disabled);
}
```

## Symbol Style CSS

```css
.blinkx-buy-sell-button.blinkx-buy-sell-button--style-symbol {
  padding-left: var(--bs-padding-symbol-x);
  padding-right: var(--bs-padding-symbol-x);
}
```
