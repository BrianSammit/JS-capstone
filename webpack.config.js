const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist/",
    filename: "main.js",
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true),
    }),
  ],
};
