const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  ROOT: path.resolve(__dirname),
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  // SASS: path.resolve(__dirname, 'src/sass'),
};

const files = {
  INDEX_JS: path.join(paths.SRC, 'index.jsx'),
  INDEX_HTML: 'dist/index.html',
  MAIN_SCSS: path.join(paths.SRC, 'index.scss'),
  BUNDLE: 'dist/bundle.js',
  DIST_CSS: 'dist/styles.css',
};

// Webpack configs
module.exports = {
  entry: [files.INDEX_JS, files.MAIN_SCSS],
  output: {
    path: paths.DIST,
    // TODO: make this app.bundle.js to be more clear
    filename: files.BUNDLE,
  },
  devtool: 'eval-source-map',
  // Loaders configs
  // Babel Loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // Important to note, from http://bit.ly/2zoKnrv
        // There needs to be a loader option somewhere
        // This is inspite of the articles
        // Then also, 'babel-loader' instead of 'babel' is needed
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      // TODO: Figure out how to properly extract regular css as loader
      // { // regular css files
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract({
      //     loader: 'css-loader?importLoaders=1',
      //   }),
      // },
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      },
    ],
  },
  // Tell Webpack to use html & CSS extract text plugin
  plugins: [
    new ExtractTextPlugin({ // define where to save the file
      filename: files.DIST_CSS,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: files.INDEX_HTML,
    }),
  ],
  // Enable importing JS files without specifying their extensions
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
