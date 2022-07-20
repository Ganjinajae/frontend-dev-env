module.exports = {
  // plugins: [
  //   '@babel/plugin-transform-block-scoping',
  //   '@babel/plugin-transform-arrow-functions',
  //   '@babel/plugin-transform-strict-mode',
  // ]
  presets: [
    // './my-babel-preset.js'
    ['@babel/preset-env', { // 변환할 수 있는 것만 변환할 수 있다. 
      targets: {
        chrome: '79',
        ie: '11'
      },
      useBuiltIns: 'usage', // 'entry', false
      corejs: {
        version: 2,
      }
    }]
  ]
}