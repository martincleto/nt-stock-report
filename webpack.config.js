const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

const config = {
  development: merge(baseConfig, {
    devtool: 'eval-cheap-source-map',
    devServer: {
      static: path.join(__dirname, 'public'),
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
    output: {
      filename: 'bundle.min.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '',
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }),
  test: merge(baseConfig, {
    optimization: {
      nodeEnv: 'test',
    }
  }),
};

module.exports = (env, argv) => {
  if (env.test) return config.test;
  
  return config[argv.mode];
};
