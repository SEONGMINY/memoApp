module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@apis': './src/apis',
        '@assets': './src/assets',
        '@components': './src/components',
        '@constants': './src/constants',
        '@hooks': './src/hooks',
        '@modules': './src/modules',
        '@queries': './src/queries',
        '@screens': './src/screens',
        '@stacks': './src/stacks',
        '@states': './src/states',
        '@styles': './src/styles',
        '@models': './src/types',
        '@utils': './src/utils',
        '@': './src',
      },
    },
  ],
};
