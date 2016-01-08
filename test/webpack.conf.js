var path = require('path');

module.exports = {
  entry: './test/src/index.ts',
  output: {
    filename: './test/build/bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  bail: true,
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ],
  }
}