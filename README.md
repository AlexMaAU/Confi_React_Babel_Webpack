## Following steps shows how to configure Webpack and Babel for a React project, without using scaffold

## 1. Configure Webpack
```
init npm and install webpack in local environment
```

commands (under working directory)
```
npm init -y
npm install webpack webpack-cli --save-dev
```

## 2. Update package.json
add "build": "webpack --config webpack.config.js" under "scripts"
```
{
  "name": "configure-webpack-and-babel-in-react",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4"
  }
}
```

## 3. create src file structure

## 4. Add index.html under root directory

## 5. Configure React and Babel
install React and React-Dom as dependency
```
npm install --save react react-dom
```
install Babel
```
npm install --save-dev babel-loader @babel/preset-react @babel/preset-env @babel/core @babel/plugin-proposal-class-properties
```

## 6. Create webpack.config.js and .babelrc files under root directory，and configure babel-loader and babel options
a. create webpack.config.js file, and configure as:
```
const path = require('path');
module.exports = {
  entry: './src/index.js',  // start from this file, webpack will search all dependencies and pack them into one or more output files
  output: {  // define the output files of webpack
    filename: 'bundle.js',  // output file name
    path: path.resolve(__dirname, 'dist'),  // output files storage path
  },
  module: {  // configure rules of different modules
    rules: [
      {
        test: /\.jsx?$/,  // test defines the types of files that need to be processed following the rule
        use: ['babel-loader'],  // use defines which loader to be used on matched files
        exclude: /node_modules/,  // exclude defines files that should NOT be packed into output files
      },
    ],
  },
};
```

b. create .babelrc file and configure as:
```
{
  "presets": [
    [
      "@babel/preset-env",  //This preset is used to enable the transformation of modern JavaScript features (ES6+) to an older version based on the specified target browsers. 
      {
        "targets": {
          //  The target browsers are defined as follows
          "edge": 17,
          "firefox": 60,
          "chrome": 67,
          "safari": 11.1
        },
        // The "useBuiltIns" option is set to "usage," which means that Babel will only import the necessary polyfills for the specific ES6+ features that are used in the code, rather than including all polyfills.
        "useBuiltIns": "usage"
      }
    ],
    // This preset is used to enable the transformation of JSX (React's syntax extension) into regular JavaScript.
    "@babel/preset-react"
  ],
   // This plugin enables support for class properties proposal in JavaScript. 
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```
## 7. Add content to index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## 8. Install html-webpack-plugin and lean-webpack-plugin as dev dependency, and configure webpack.config.js

install with command:
```
npm install --save-dev html-webpack-plugin clean-webpack-plugin
```

configure webpack.config.js:
```
const path = require('path');
// add following
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        use: ['babel-loader'], 
        exclude: /node_modules/, 
      },
    ],
  },
  // add following
  plugins: [
    new CleanWebpackPlugin(),  
    new HtmlWebpackPlugin({  
      title: 'React, webpack and Babel',
      template: 'index.html',
      filename: 'index.html',
    }),
  ],
  mode: 'production', // production || development || none
  performance: {  //
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
```

## 9. Execute npm run build to generate dist directory

## 10. Configure webpack-dev-server

install with command:
```
npm install --save-dev webpack-dev-server
```

update package.json file：
```
add "start": "webpack serve -env mode" under "scripts"
```

## 11. Configure CSS and Image

install with command:
```
npm install --save-dev css-loader style-loader
```

add configuration in webpack.config.js:
```
const path = require('path');
module.exports = {
    module:{
        rules: [
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            // add following rules
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
```

Please give me a star if it helps
