const internalIp = require("internal-ip");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const PUBLIC_PATH = "/static/frontend/";

const PORT = 4000;

const PRODUCTION_MODE = process.env.NODE_ENV === "production";

if (!PRODUCTION_MODE) {
  console.log(
    `\n\nWhen done building, your application will be available at http://${internalIp.v4.sync()}:${PORT}\n\n\n`
  );
}

module.exports = {
  context: __dirname,
  mode: process.env.NODE_ENV || "development",
  entry: ["./index.tsx"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, PUBLIC_PATH.replace("/", "")),
    publicPath: PRODUCTION_MODE ? PUBLIC_PATH : "/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json", ".css"],
    alias: {
      "@": path.resolve("lib"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(
        __dirname,
        "templates",
        "frontend",
        PRODUCTION_MODE ? "" : "dev",
        "index.html"
      ),
      filename: "index.html",
    }),
    new CopyWebpackPlugin([{ from: "public" }]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.(woff2|png|jp(e*)g|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "icons|fonts/[name].[ext]",
          outputPath: PUBLIC_PATH,
        },
      },
    ],
  },
  devServer: {
    watchFiles: `.${PUBLIC_PATH}`,
    compress: true,
    port: PORT,
    hot: true,
    open: true,
    historyApiFallback: true,
    allowedHosts: ["127.0.0.0", "localhost"],
  },
};
