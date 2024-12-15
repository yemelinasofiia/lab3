const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...glob.sync('./src/pages/*.html').map((file) => {
      return new HtmlWebpackPlugin({
        template: file,
        filename: path.basename(file),
      });
    }),
    // Обновление пути к папке с изображениями
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/pages/images'),  // Правильный путь к папке с изображениями
          to: path.resolve(__dirname, 'dist/assets/images'),  // Папка назначения
        },
      ],
    }),
  ],
  mode: 'development',
};
