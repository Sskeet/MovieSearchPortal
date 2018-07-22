
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'index.bundle.js'
  },
  devtool: "cheap-eval-source-map",
  watch: true,
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.scss$/,
        use: 
        [ 
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/'
            }  
          }
        ]
      }
    ]
  }
};

// var path =require('path');
// module.exports = {
//   context:path.join(_dirname,'src');
//   entry: {
//     js:'src/js/index.js'
//   },
//   output: {
//     path:path.join(_dirname,'dist'),
//     filename: '[name].bundle.js'
//   }
// };