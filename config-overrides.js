const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    https: "https-browserify",
  };
  return config;
};
