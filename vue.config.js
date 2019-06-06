const { EXPRESS_PORT } = process.env;
const API_SERVER = `http://localhost:${EXPRESS_PORT}`;

console.log('API server', API_SERVER);

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: API_SERVER,
        changeOrigin: true,
      },
    },
  },
  pluginOptions: {
    moment: {
      locales: [
        'en',
      ],
    },
  },
};
