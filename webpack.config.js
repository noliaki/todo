const webpack = require('webpack')

module.exports = {
  context: `${__dirname}/src/js`,
  entry: './entry.js',

  output: {
    path: `${__dirname}/dist/js`,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:{
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      React: "react"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
