var path = require('path');
var webpack = require('webpack');

var basePath = __dirname;

module.exports = {
  entry: {
    "csx": './src/index.ts',
    "csx.min": "./src/index.ts",
  },
  output: {
    path: path.join(basePath, './umd'),
    filename: '[name].js',
    library: ['csx']
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            "noImplicitAny": true,
            "noImplicitReturns": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "strictNullChecks": true,
            "declaration": false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ], 
  node: {
    fs: "empty"
  }
}