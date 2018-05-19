const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const at = relativePath => path.resolve(__dirname, relativePath)

module.exports = {
  mode: 'development',
  entry: at('src/index.js'),
  output: {
    filename: 'bundle.js',
    path: at('dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: at('dist'),
    open: true,
    hot: true,
    compress: true,
    port: 8080
  },
  resolve: {
    alias: {
      '~': at('src')
    }
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'colide'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
