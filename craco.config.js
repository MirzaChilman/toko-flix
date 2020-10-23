const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@menu-dark-item-active-bg": "red",
          "@card-background": "#434343",
          "@skeleton-to-color": "shade(#747474, 5%)",
        },
      },
    },
  ],
};
