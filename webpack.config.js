const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Đặt đường dẫn đến tệp gốc của ứng dụng của bạn (có thể là .ts nếu không sử dụng JSX)
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Các đuôi tệp bạn muốn sử dụng trong dự án (bao gồm cả .tsx và .ts)
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Sử dụng ts-loader cho các tệp .ts hoặc .tsx
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 3000,
  },
};