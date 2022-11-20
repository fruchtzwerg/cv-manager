module.exports = {
  extends: ['../../.eslintrc.json', 'prettier'],
  ignorePatterns: ['!**/*'],
  rules: {},
  env: {
    node: true,
  },
  overrides: [
    {
      files: ['*.vue'],
      extends: ['plugin:vue/vue3-essential', '@vue/typescript/recommended'],
    },
    {
      files: ['**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
};
