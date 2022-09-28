const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


const baseConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

const config = {
  development: merge(baseConfig, {
    devtool: 'eval-cheap-source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 8000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        title: 'Webcomponent Stock Report App', 
        template: './index.html'
      }),
    ],
  }),
  production: merge(baseConfig, {
    devtool: 'source-map',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }),
};

module.exports = (env, argv) => config[argv.mode];
