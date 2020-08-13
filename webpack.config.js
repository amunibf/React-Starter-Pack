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
              test : /\.(js|jsx)$/,
              exclude : /node_modules/,
              use : {
                loader : 'babel-loader'
              }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use : {
              loader : 'file-loader'
            }
          }
      ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins : [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    
  ]
}