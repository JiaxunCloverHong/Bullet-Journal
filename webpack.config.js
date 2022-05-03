const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'client/src/components/'),
    },
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
};
