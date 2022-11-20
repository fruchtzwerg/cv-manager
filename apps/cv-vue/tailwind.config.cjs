const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{vue,ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        screen: { raw: 'screen' },
        'max-xl': { raw: 'not all and (min-width: 1280px)' },
        'max-2xl': { raw: 'not all and (min-width: 1536px)' },
        '3xl': '1800px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'black',
            'font-weight': 500,
            h1: {
              color: 'var(--section-heading-color, #000)',
              marginBlockEnd: '0.83em',
              fontWeight: 700,
            },
            h2: {
              color: 'var(--heading-color, --indigo-700)',
              fontSize: '1.65rem',
              fontWeight: 900,
              marginBlockEnd: '0.83em',
              marginTop: 0,
              lineHeight: 'normal',
            },
            h3: {
              color: 'var(--title-color, --indigo-700)',
              fontSize: '1.5rem',
              fontWeight: 300,
              margin: '0.25rem 0',
              lineHeight: 'normal',
            },
            h4: {
              color: 'var(--caption-color, --indigo-900)',
              fontSize: '0.75rem',
              fontWeight: 400,
              margin: '0.25rem 0',
            },
            h5: {
              color: 'var(--subtitle-color, --indigo-400)',
              margin: '0.25rem 0',
              fontSize: '0.83em',
              lineHeight: 'normal',
            },
            a: {
              color: 'var(--href-color, --indigo-400)',
              fontSize: '0.85rem',
              lineHeight: 'normal',
            },
            p: {
              lineHeight: '1.5rem',
            },
            'p:first-of-type': {
              marginTop: '1rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('daisyui'),
    require('./tailwind/plugins/colors.plugin')([500, 700, 900].map(light => `indigo-${light}`)),
  ],
  daisyui: {
    themes: ['winter', 'night'],
    darkTheme: 'night',
  },
};
