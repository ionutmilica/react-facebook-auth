'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    example: ['./src/index.js'],
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
    ]
  },

  externals: {
    'react': 'react',
    'react-dom': 'ReactDOM',
  },

  output: {
    filename: 'dist/react-fb-auth.js',
    libraryTarget: 'umd',
    library: 'FacebookAuth',
  },

  resolve: {
    extensions: ['', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
};
