const path = require('path');
// add following
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 模块打包：
  // entry: Specifies the entry point of the application. Webpack starts from this file and searches for all dependencies to bundle them into one or more output files.
  // output: Defines the output files of webpack, including the filename and the path where the output files will be stored.
  entry: './src/index.js', // start from this file, webpack will search all dependencies and pack them into one or more output files
  // output: {   // configuration of output if not using the optimization.splitChunks option.
  //   // define the output files of webpack
  //   filename: 'bundle.js', // output file name
  //   path: path.resolve(__dirname, 'dist'), // output files storage path
  // },
  output: {  // configuration of output if using the optimization.splitChunks option.
    filename: '[name].bundle.js', // Use [name] placeholder to ensure unique filename for each entry point
    chunkFilename: '[name].chunk.js', // Use [name] placeholder to ensure unique filename for additional chunks
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    // configure rules of different modules
    // 代码转换：
    // module.rules: Specifies the rules for different modules, including the test to define the types of files that need to be processed, and the use to specify which loader to use on matched files.
    // In this configuration, the rule for .jsx? files uses babel-loader, which allows transforming modern JavaScript (including JSX) into backward-compatible versions.
    rules: [
      {
        test: /\.jsx?$/, // test defines the types of files that need to be processed following the rule
        use: ['babel-loader'], // use defines which loader to be used on matched files
        exclude: /node_modules/, // exclude defines files that should NOT be packed into output files
      },
      // 静态资源管理：
      // module.rules: The configuration includes rules for handling different types of static resources like CSS and images. For example, the rule for .css files uses both style-loader and css-loader to handle CSS files and inject them into the HTML.
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
  // 插件系统：
  // plugins: The configuration includes two plugins - CleanWebpackPlugin and HtmlWebpackPlugin. Plugins extend the functionality of Webpack. The CleanWebpackPlugin cleans the 'dist' directory before each build, and HtmlWebpackPlugin generates an HTML file with the specified settings, including injecting the bundled script (bundle.js) into the generated HTML.
  plugins: [
    new CleanWebpackPlugin(), // This plugin cleans the 'dist' directory before each build.
    new HtmlWebpackPlugin({
      // This plugin generates an HTML file with the specified settings.
      title: 'React, Webpack and Babel',
      template: 'index.html',
      filename: 'index.html',
    }),
  ],
  // 资源优化：
  // mode: The mode is set to 'production', which enables optimization features like minification and tree shaking to reduce the size of the output bundle.
  mode: 'production', // production || development || none
  performance: {
    // prevent size exceeds the recommended limit (244 KiB) error
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    // 代码分割：通过Webpack的代码分割功能，可以将应用程序分割成多个小块，按需加载，从而减少首次加载时间，提高页面性能。
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
