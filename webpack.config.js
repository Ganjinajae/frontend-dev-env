const path = require('path');
const MyWebpackPlugin = require('./my-webpack-plugin');

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
        test: /\.css$/,
        use: [
          'style-loader', // 처리된 javascript 문자열 style 코드를 html에 적용시켜 브라우저에서 
          'css-loader' // css 파일을 javascript moudle처럼 사용
        ]
      },
      // file-loader: image 파일을 모듈로 사용할 수 있도록 변환, output file로 이동
      // {
      //   test: /\.png/,
      //   use: [
      //     'file-loader'
      //   ]
      // },
      {
        test: /\.(png|jpeg|gif|svg)$/,
        loader: 'url-loader', // 파일을 base64로 인코딩하여 javascript 파일로 변환, 파일 크기 제한, 나머지는 file-loader로
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 20000, // 20KB 미만이면 url-loader로 base64 encoding함. 이상이면 file-loader가 실행됨 
        }
      }
    ]
  },
  plugins: [
    new MyWebpackPlugin() // 번들된 파일에 대해 딱 한 번 실행한다.
  ]
}