module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@core': './src/core',
        '@infra': './src/infra',
        '@modules': './src/modules'
      }
    }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
