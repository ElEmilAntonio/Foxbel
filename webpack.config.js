const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const generateHtmlPlugin = (title) => {
  return new HtmlWebpackPlugin({
    title, 
    filename: `${title}.html`,
    template: `${title}.html`,
    chunks: [title]
  });
}

const populateHtmlPlugins = (array) => {
  res = [];
  array.forEach(page => res.push(generateHtmlPlugin(page)));
  return res;
}

const pages = populateHtmlPlugins(["index", "another-page"]);


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    another_page: './src/js/another-page.js'
  },
  mode: 'none',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    clean: true,
  },
  plugins: pages,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};