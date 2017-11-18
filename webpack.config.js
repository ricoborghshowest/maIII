const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}
const CopyWebpackPlugin = require(`copy-webpack-plugin`);

const commonConfig = merge([{
  entry: [
    path.join(PATHS.src,'js/script.js'),
    path.join(PATHS.src,'css/style.css')
  ],
  output: {
    path: PATHS.dist,
    filename: 'js/script.js',
  },
  module:{
      rules:[
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            attrs: [
              `audio:src`,
              `img:src`,
              `video:src`,
              `woff:src`,
              `woff2:src`,
              `source:srcset`
            ]
          }
        },
        {
          test: /\.(jpe?g|png|webp)$/,
          loader: 'url-loader',
          options: {
            context: './src',
            name: '[path][name].[ext]', //[hash] -> voor een hash waarde aan toetevoegen.
            limit: 1000
          }
        },
        {
          test: /\.css$/,
          loader: [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader?limit=100000' }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyWebpackPlugin([{
      from: `./src/assets`,
      to: `assets`
    }], {
      ignore: [
        `.DS_Store`
      ]
    })
  ]
}]);

const developmentConfig = merge([]);
const productionConfig = merge([]);


module.exports = env =>{
    if(env === 'production'){
      console.log('hello');
      return merge(commonConfig, productionConfig);
    }
    return merge(commonConfig, developmentConfig);
};
