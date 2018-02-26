const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const libSrc = path.resolve(__dirname, '../src');

module.exports = {
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [__dirname, libSrc],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-facebook-auth': libSrc,
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
};
