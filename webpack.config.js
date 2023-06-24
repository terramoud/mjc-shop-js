const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    login: './src/pages/login/login.js',
    cart: './src/pages/cart/cart.js',
    "add-item": './src/pages/add-item/add-item.js',
    "item-details": './src/pages/item-details/item-details.js',
    main: './src/pages/main/main.js',
    register: './src/pages/register/register.js',
  },
  output: {
    filename: '[name]/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  devServer: {
    static: './dist',
    hot: true, // Enable hot module replacement
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/cart/cart.html',
      chunks: ['cart'],
      filename: 'cart/cart.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/login/login.html',
      chunks: ['login'],
      filename: 'login/login.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/register/register.html',
      chunks: ['register'],
      filename: 'register/register.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/add-item/add-item.html',
      chunks: ['add-item'],
      filename: 'add-item/add-item.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/item-details/item-details.html',
      chunks: ['item-details'],
      filename: 'item-details/item-details.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/main/main.html',
      chunks: ['main'],
      filename: 'main/main.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    })
  ],
};
