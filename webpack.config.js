const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process"); // terminal 명령 실행할 수 있다.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // default로 export 되어 있지 않다.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");

const mode = process.env.NODE_ENV || "development";
// es6 moudle system이 아닌 node의 moudle system
module.exports = {
  mode,
  entry: {
    main: "./src/app.js",
    // main2: './src/app2.js' // [name]에서 동적으로 할당이 가능하다
  },
  output: {
    path: path.resolve("./dist"),
    filename: "[name].js",
  },
  stats: "errors-only",
  devServer: {
    client: {
      overlay: true,
    },
    onBeforeSetupMiddleware: (devServerer) => {
      devServerer.app.use(apiMocker("/api", "mocks/api"));
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // css 분리하기 위한 loader가 필요하다.
            : "style-loader", // 처리된 javascript 문자열 style 코드를 html에 적용시켜 브라우저에서
          "css-loader", // css 파일을 javascript moudle처럼 사용
        ],
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
        loader: "url-loader", // 파일을 base64로 인코딩하여 javascript 파일로 변환, 파일 크기 제한, 나머지는 file-loader로
        options: {
          // publicPath: './dist/',
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20KB 미만이면 url-loader로 base64 encoding함. 이상이면 file-loader가 실행됨
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
      `,
    }),
    new webpack.DefinePlugin({
      // 환경 정보들을 정의할 수 있다. 각 환경마다 구분해서 사용 가능(api주소 등)
      // TWO: '1+1'
      TWO: JSON.stringify("1+1"),
      "api.doamin": JSON.stringify("http://dev.api.domain.com"),
    }),
    /** 빌드과정에 html을 포함한다. => 의존적이지 않은 코드를 만들 수 있다.
     * 동적으로 생성되는 js, css를 index.html에 반영할 수 있음
     * 빌드타임에 결정되는 값들을 template에 넣어서 html에 동적으로 반영할 수 있음
     * 유동적으로 dev, prod 등의 index.html 파일을 만들 수 있음
     */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              // 운영에서만 키자
              collapseWhitespace: true, // space 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(), // build시 dist 폴더 삭제하고 새롭게 구성할 수 있도록 해줌
    ...(process.env.NODE_ENV === "production" // 나머지 연산자를 붙일 수 있다? => 정보가 잘 없음
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })] // css 파일을 뽑아내서 js로 한꺼번에 로딩하는 것이 아니라 js, css 각자 로딩하여 성능 향상을 꾀함
      : []), // 지정 안 하면 hash값으로 만들어짐
  ],
};
