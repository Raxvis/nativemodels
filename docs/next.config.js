const withNextra = require('nextra')({
  distDir: '../build',
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra();
