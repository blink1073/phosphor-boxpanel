
module.exports = {
  entry: './example/build/index.js',
  output: {
    filename: './example/build/bundle.js'
  },
  bail: true,
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
