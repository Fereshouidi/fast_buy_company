// module.exports = {
//     module: {
//       rules: [
//         {
//           test: /\.css$/,
//           use: [
//             'style-loader', 
//             'css-loader', 
//             'postcss-loader', // هنا يتأكد من أن postcss يعمل بشكل صحيح
//           ],
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
//     },
//     plugins: [
//       new PostCssPlugin({
//         plugins: [
//           require('autoprefixer')({
//             browsers: ['last 2 versions', '> 5%'],
//           }),
//         ],
//       }),
//     ],
//   };
  