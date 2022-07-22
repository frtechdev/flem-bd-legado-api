module.exports = (phase) => {
  return {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/api",
          permanent: false,
        },
        {
          source: "/index.html",
          destination: "/api",
          permanent: false,
        },
      ];
    },
    reactStrictMode: true,
  };
};
