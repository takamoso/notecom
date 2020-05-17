import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'

export default {
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(core-js|webpack)/,
      use: [{
        loader: 'babel-loader',
      }],
    }],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: /^!|@preserve|@license|@cc_on|@author/i,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}