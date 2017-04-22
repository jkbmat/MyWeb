var path = require('path');

const APP_DIR = path.resolve(__dirname, 'app');
const BUILD_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  entry: ['babel-polyfill', APP_DIR + '/entry.js'],
  output: {
    path: BUILD_DIR,
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    loaders : [
      {
        test : /\.jsx?$/,
        include : APP_DIR,
        loaders : ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.png|\.jpe?g|\.svg/,
        loader: 'file-loader?name=./img/[name].[ext]'
      },
      {
        test: /\.html?/,
        loader: 'file-loader?name=./html/[name].[ext]'
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  resolve: {
    modules: [APP_DIR, 'node_modules']
  },
};
