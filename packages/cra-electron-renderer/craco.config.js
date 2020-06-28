// @ts-check

const packagedDependencies = Object.keys(
  // @ts-ignore
  require('cra-electron/package.json').dependencies,
);
function externals(context, request, callback) {
  const isPackagedDep = packagedDependencies.some(
    depName => request === depName || request.startsWith(depName + '/'),
  );
  if (isPackagedDep) {
    callback(null, 'commonjs ' + request);
  } else {
    callback();
  }
}

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    /**
     *
     * @param {import('webpack').Configuration} webpackConfig
     * @param {*} param1
     * @returns {import('webpack').Configuration}
     */
    configure(webpackConfig, { env, paths }) {
      return {
        ...webpackConfig,
        target: 'electron-renderer',
        externals,
      };
    },
  },
};
