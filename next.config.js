
  // next.config.js
module.exports = {
    webpack(config) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      });
  
      return config;
    },
  };
  