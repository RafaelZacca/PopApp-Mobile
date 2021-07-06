module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      local: {
        plugins: [
          [
            "inline-dotenv",
            {
              path: ".env.local",
            },
          ],
        ],
      },
      development: {
        plugins: [
          [
            "inline-dotenv",
            {
              path: ".env.development",
            },
          ],
        ],
      },
    },
  };
};
