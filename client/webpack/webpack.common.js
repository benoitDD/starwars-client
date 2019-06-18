const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = () => {
    const result = dotenv.config({ path: __dirname + '/../.env' })
    let envKeys
	if (!result.error) {
		const env = result.parsed
		envKeys = Object.keys(env).reduce((prev, next) => {
			prev[`process.env.${next}`] = JSON.stringify(env[next])
			return prev
		}, {})
		console.log('Chargement du fichier .env')
	}

	let plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
	]
	if(envKeys){
		plugins.push(new webpack.DefinePlugin(envKeys))
	}
    return {
        context: path.resolve(__dirname, '..'),
        entry: {
            main: './index.js'
        },
        output: {
            path: path.resolve(__dirname, '../../server/public/'),
            filename: '[name].[contenthash].bundle.js',
            publicPath: '/'
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    include: path.resolve(__dirname, '..'),
                    use: ['babel-loader']
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
					test: /\.gql$/,
					include: path.resolve(__dirname, '../query'),
					use: ['graphql-tag/loader']
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                      'file-loader'
                    ]
                }
            ]
        },
        plugins,
        optimization: {
            runtimeChunk: 'single'
        },
        resolve: {
            symlinks: false
        },
        performance: {
            maxEntrypointSize: 700000,
            maxAssetSize: 700000
        }
    }
}