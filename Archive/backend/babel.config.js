module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current', // This ensures that Babel will target the version of Node that you are currently running.
          },
        },
      ],
    ],
  };
  