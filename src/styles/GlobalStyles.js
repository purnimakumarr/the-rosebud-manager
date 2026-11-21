import { createGlobalStyle } from 'styled-components';

/*
 * The Rosebud Manager design tokens.
 * Palette and type mirror the customer site, The Rosebud Stays:
 *   primary (green-black) · accent (rose) · leaf (mint) · cream
 *   Bebas Neue for display, DM Sans for body.
 * Token NAMES are kept stable (grey-*, brand-*, blue/green/yellow/silver/indigo/red)
 * because components build them dynamically, e.g. Tag and Stat use var(--color-${type}-100).
 */
const GlobalStyles = createGlobalStyle`
:root {
  /* ---------- Shared (both modes) ---------- */
  --font-display: 'Bebas Neue', Impact, sans-serif;
  --font-body: 'DM Sans', system-ui, sans-serif;

  --color-leaf-300: #8fe3d2;
  --color-leaf-400: #4fc9b4;
  --color-cream-200: #fbefc6;
  --color-cream-300: #f5db8a;
  --color-rose-logo: #a83a55;

  --color-brand-50: #fdf2f4;
  --color-brand-100: #fbe3e8;
  --color-brand-200: #f6c2cd;
  --color-brand-300: #f0a3b6;
  --color-brand-400: #e77c97;
  --color-brand-500: #da5577;
  --color-brand-800: #a83a55;
  --color-brand-900: #8e2d46;

  /* Text placed on top of brand-coloured surfaces */
  --color-on-brand: #0b1210;

  --image-grayscale: 0;
  --image-opacity: 100%;

  --border-radius-tiny: 4px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  --border-radius-pill: 9999px;

  /* ---------- Light mode: warm cream front desk ---------- */
  &.light-mode {
    --color-grey-0: #fffdf8;
    --color-grey-50: #fbf6ec;
    --color-grey-100: #f3ede0;
    --color-grey-200: #e4ddcf;
    --color-grey-300: #cdd5d1;
    --color-grey-400: #a7b3ae;
    --color-grey-500: #5e6f68;
    --color-grey-600: #42524c;
    --color-grey-700: #2d3b36;
    --color-grey-800: #1e2a26;
    --color-grey-900: #0b1210;

    /* Deeper rose in light mode keeps text contrast on cream */
    --color-brand-600: #c2456a;
    --color-brand-700: #a83a55;
    --color-brand-tint: rgba(218, 85, 119, 0.12);
    --color-brand-border: rgba(194, 69, 106, 0.25);

    /* blue → mint · green → leaf · yellow → cream · silver → neutral · indigo → rose */
    --color-blue-100: #d6f2ec;
    --color-blue-700: #1d6b5f;
    --color-green-100: #e2f1d8;
    --color-green-700: #3d6b1f;
    --color-yellow-100: #fbefc6;
    --color-yellow-700: #8a6a12;
    --color-silver-100: #e4ddcf;
    --color-silver-700: #42524c;
    --color-indigo-100: #fbe3e8;
    --color-indigo-700: #a83a55;

    --color-red-100: #fde2e2;
    --color-red-700: #b4232f;
    --color-red-800: #911c26;

    --backdrop-color: rgba(11, 18, 16, 0.25);
    --page-glow:
      radial-gradient(60rem 30rem at 10% -10%, rgba(218, 85, 119, 0.10), transparent 70%),
      radial-gradient(50rem 30rem at 100% 0, rgba(79, 201, 180, 0.08), transparent 70%),
      radial-gradient(40rem 24rem at 50% 110%, rgba(245, 219, 138, 0.18), transparent 70%);

    --shadow-sm: 0 1px 2px rgba(11, 18, 16, 0.06);
    --shadow-md: 0 0.6rem 2.4rem rgba(11, 18, 16, 0.08);
    --shadow-lg: 0 2.4rem 3.2rem rgba(11, 18, 16, 0.14);
  }

  /* ---------- Dark mode (default): matches the customer site ---------- */
  &.dark-mode {
    --color-grey-0: #131c19;
    --color-grey-50: #0b1210;
    --color-grey-100: #1e2a26;
    --color-grey-200: #2d3b36;
    --color-grey-300: #42524c;
    --color-grey-400: #5e6f68;
    --color-grey-500: #808f89;
    --color-grey-600: #a7b3ae;
    --color-grey-700: #cdd5d1;
    --color-grey-800: #e7ece9;
    --color-grey-900: #f4f6f5;

    /* Site buttons: rose, hover lighter rose */
    --color-brand-600: #da5577;
    --color-brand-700: #e77c97;
    --color-brand-tint: rgba(218, 85, 119, 0.15);
    --color-brand-border: rgba(218, 85, 119, 0.3);

    --color-blue-100: #143a33;
    --color-blue-700: #8fe3d2;
    --color-green-100: #1f3a1c;
    --color-green-700: #c4ecb0;
    --color-yellow-100: #4a3d14;
    --color-yellow-700: #f5db8a;
    --color-silver-100: #2d3b36;
    --color-silver-700: #e7ece9;
    --color-indigo-100: #4a1d2a;
    --color-indigo-700: #f6c2cd;

    --color-red-100: #fde2e2;
    --color-red-700: #d43a4a;
    --color-red-800: #b02a3a;

    --backdrop-color: rgba(11, 18, 16, 0.6);
    --page-glow:
      radial-gradient(60rem 30rem at 10% -10%, rgba(218, 85, 119, 0.12), transparent 70%),
      radial-gradient(50rem 30rem at 100% 0, rgba(79, 201, 180, 0.07), transparent 70%),
      radial-gradient(40rem 24rem at 50% 110%, hsla(45, 84%, 75%, 0.05), transparent 70%);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
    --shadow-md: 0 0.6rem 2.4rem rgba(0, 0, 0, 0.35);
    --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.45);
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: var(--font-body);
  color: var(--color-grey-700);
  background-color: var(--color-grey-50);
  background-image: var(--page-glow);
  background-attachment: fixed;

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
  -webkit-font-smoothing: antialiased;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-500);
  outline-offset: -1px;
}

::selection {
  background-color: var(--color-brand-tint);
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}`;

export default GlobalStyles;
