const config = require('./webpack.config.js')

config.devServer = {
  contentBase: 'dist',
  inline: true,
  hot: true
}
config.watch = true
config.debug = true
config.devtool = 'source-map'

module.exports = config
