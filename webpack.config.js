const webpack = require('webpack')

module.exports = {
  context: `${__dirname}/src/js`,
  entry: './entry.js',

  output: {
    path: `${__dirname}/docs/js`,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }]
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
