const path = require('path');

module.exports = {
  images: {
    domains: ["images.ctfassets.net"],
  },
  webpack: (config) => {
    config.resolve.alias["react/jsx-runtime"] = path.join(
      __dirname,
      "/node_modules/react/jsx-runtime.js"
    );
    return config;
  }
};
