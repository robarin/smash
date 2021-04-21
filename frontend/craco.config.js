const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@src": path.resolve(__dirname, "src/"),
      "@actions": path.resolve(__dirname, "src/actions/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@reducers": path.resolve(__dirname, "src/reducers/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@layouts": path.resolve(__dirname, "src/layout/")
    }
  }
}
