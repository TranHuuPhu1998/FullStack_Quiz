const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: webpackConfig => {
      // other stuff with webpackConfig
      return {
        ...webpackConfig,
        ignoreWarnings: [/Failed to parse source map/],
      }
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#FF5A1D' },
            javascriptEnabled: true,
          },
        },
      },
    }
  ]
};
