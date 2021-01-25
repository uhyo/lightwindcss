const path = require('path')

module.exports = {
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      return config;
    }
    // disable styles/lightwind.css in dev
    config.resolve.alias[
      path.join(__dirname, "styles/lightwind.css")
    ] = path.join(__dirname, "styles/dummy.css")
    return config
  },
}