const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.js',
  cache: false,
  devtool: isDevelopment ? 'eval-cheap-module-source-map': false,
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    port: 8080,
    open: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "modules": false
              }], "@babel/preset-react", "@babel/preset-typescript"],
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(css|less)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        type: 'asset',
        include: /src/,
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    isDevelopment && new ReactRefreshPlugin(), 
  ].filter(Boolean),
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  }
}