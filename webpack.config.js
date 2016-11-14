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
      React: "react"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};
