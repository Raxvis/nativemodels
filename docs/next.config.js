const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

const config = {
  ...withNextra(),
  distDir: '../build',
  // output: 'export',
};

delete config.rewrites;

module.exports = config;
