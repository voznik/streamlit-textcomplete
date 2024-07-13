/** @type {import('@rspack/core').Configuration} */
module.exports = {
  devServer: {
    hot: false,
  },
  // watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            // some options
          },
        },
      },
    ],
  },
  output: {
    path: 'build',
    filename: 'index.js',
  },
};
