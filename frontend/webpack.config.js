const internalIp = require("internal-ip");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestWebpackPlugin = require("webpack-manifest-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { GenerateSW } = require("workbox-webpack-plugin");

const WEBSITE_URL = "https://www.example.com";
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
  mode: process.env.NODE_ENV,
  entry: "./index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, PUBLIC_PATH.replace("/", "")),
    publicPath: PRODUCTION_MODE ? PUBLIC_PATH : "/",
  },
  devtool: "source-map",
  node: { fs: "empty" },
  resolve: {
    extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "templates", "frontend", "index.html"),
      filename: "index.html",
    }),
    new CopyWebpackPlugin([{ from: "pwa" }]),
    new ManifestWebpackPlugin({
      fileName: "asset-manifest.json", // Not to confuse with manifest.json
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new LoadablePlugin(),
    new Dotenv(),
    new GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp(WEBSITE_URL),
          handler: "StaleWhileRevalidate",
        },
      ],
    }),
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
          outputPath: "assets",
        },
      },
    ],
  },
  devServer: {
    publicPath: "/",
    contentBase: `.${PUBLIC_PATH}`,
    watchContentBase: true,
    compress: true,
    port: PORT,
    hot: true,
    inline: true,
    open: true,
    openPage: "",
    historyApiFallback: true,
    allowedHosts: ["127.0.0.0", "localhost"],
    stats: {
      colors: true,
    },
  },
};
