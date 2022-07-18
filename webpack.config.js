const path = require('path');

// es6 moudle system이 아닌 node의 moudle system
module.exports = { 
  mode: 'development',
  entry: {
    main: './src/app.js',
    // main2: './src/app2.js' // [name]에서 동적으로 할당이 가능하다
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          path.resolve('./my-webpack-loader.js')
        ]
      }
    ]
  }
}