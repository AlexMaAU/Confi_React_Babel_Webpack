const path = require('path');
// add following
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // start from this file, webpack will search all dependencies and pack them into one or more output files
  output: {
    // define the output files of webpack
    filename: 'bundle.js', // output file name
    path: path.resolve(__dirname, 'dist'), // output files storage path
  },
  module: {
    // configure rules of different modules
    rules: [
      {
        test: /\.jsx?$/, // test defines the types of files that need to be processed following the rule
        use: ['babel-loader'], // use defines which loader to be used on matched files
        exclude: /node_modules/, // exclude defines files that should NOT be packed into output files
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  // add following
  plugins: [
    new CleanWebpackPlugin(), // This plugin cleans the 'dist' directory before each build.
    new HtmlWebpackPlugin({
      // This plugin generates an HTML file with the specified settings.
      title: 'React, Webpack and Babel',
      template: 'index.html',
      filename: 'index.html',
    }),
  ],
  mode: 'production', // production || development || none
  performance: {
    // prevent size exceeds the recommended limit (244 KiB) error
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
