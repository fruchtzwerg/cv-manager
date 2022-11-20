const plugin = require('tailwindcss/plugin');

function extractColors(colorDict, colors = [], colorGroup = '') {
  // console.log(colorDict);
  return Object.entries(colorDict).reduce((cssVarsDict, [colorName, colorValue]) => {
    const cssVar =
      colorName === 'DEFAULT'
        ? `--${colorGroup}`
        : colorGroup
        ? `--${colorGroup}-${colorName}`
        : `--${colorName}`;

    const allVarsDict =
      typeof colorValue === 'string'
        ? { [cssVar]: colorValue }
        : extractColors(colorValue, colors, colorName);

    const vars = Object.entries(allVarsDict).filter(([key]) =>
      colors.some(color => key.includes(color))
    );
    const dict = Object.fromEntries(vars);

    return { ...cssVarsDict, ...dict };
  }, {});
}

const exposeColorsPlugin = colors =>
  plugin(({ addBase, theme }) => {
    addBase({
      ':root': extractColors(theme('colors'), colors),
    });
  });

module.exports = exposeColorsPlugin;
