// const withPlugins = require("next-compose-plugins");
// const withImages = require("next-images");
const webpack = require("webpack");
const path = require("path");

// module.exports = withPlugins([[withImages]], {
//   webpack(config, options) {
//     config.resolve.modules.push(path.resolve("./"));
//     return config;
//   },
//   images: {
//     domains: ['media.syodo.com.ua', 'd2bj1fdxpytfk0.cloudfront.net'],
//   },

// });

module.exports = async (phase, { defaultConfig }) => {
  const nextConfig = {
    webpack(config, options) {
      config.resolve.modules.push(path.resolve("./"));
      return config;
    },
    images: {
      domains: ["media.syodo.com.ua", "d2bj1fdxpytfk0.cloudfront.net"],
    },
    experimental: {
      appDir: true,
    },
  };
  return nextConfig;
};
