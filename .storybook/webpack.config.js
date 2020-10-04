const path = require('path')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  })
  // fonts
  config.module.rules.push({
    test: /\.(png|woff|woff2|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  })
  config.resolve.extensions.push('.ts', '.tsx')

  const rules = config.module.rules
  const fileLoaderRule = rules.find((rule) => rule.test.test('.js'))
  fileLoaderRule.use[0].options.plugins.push([
    require.resolve('babel-plugin-named-asset-import'),
    {
      loaderMap: {
        svg: {
          ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
        },
      },
    },
  ])

  return config
}
