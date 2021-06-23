const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const generateHtmlPlugin = (title) => {
  return new HtmlWebpackPlugin({
    title, 
    filename: `${title}.html`,
    template: `${title}.html`,
    chunks: [title]
  });
}
const generateCSSPlugin = () => {
  return new MiniCssExtractPlugin({
    filename: `css/[name].css`,
  });
}

const populateHtmlPlugins = (array) => {
  res = [];
  array.forEach(page => {
    res.push(generateHtmlPlugin(page));
    res.push(generateCSSPlugin());
  });
  return res;
}

const pages = populateHtmlPlugins(["index", "anotherpage"]);


module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    anotherpage: './src/js/anotherpage.js'
  },
  mode: 'none',
  output: {
    filename: 'js/[name].js',
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
      },
      { 
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'Quicksand.[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
};