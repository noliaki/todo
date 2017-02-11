const webpack = require('webpack')
const config = require('./webpack.config.js')

config.watch = true
// config.debug = true
config.devtool = 'source-map'
config.plugins = [
  new webpack.LoaderOptionsPlugin({
    debug: true
  }),
  new webpack.ProvidePlugin({
    React: "react"
  })
]

module.exports = config
