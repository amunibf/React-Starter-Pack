const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry : './src/index.js',
  output : {
    path : path.resolve(__dirname, 'dist'),
    filename : 'index.bundle.js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module : {
      rules :[
          {
              test : /\.js$/,
              exclude : /node_modules/,
              use : {
                loader : 'babel-loader'
              }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
      ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins : [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    
  ]
}