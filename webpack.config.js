const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');

const {
    version,
    name,
    license,
    repository,
    author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *\<[^)]*\> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'GuacamoleCommonJS',
        libraryTarget: 'umd',
        clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ extractComments: false}),
        ]
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};
