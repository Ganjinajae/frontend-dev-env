const path = require('path');

// es6 moudle system이 아닌 node의 moudle system
module.exports = { 
  mode: 'development',
  entry: {
    main: './src/app.js',
    // main2: './src/app2.js'
  },
  output: {
    paht: path.resolve('./dist'),
    filename: '[name].js'
  }
}