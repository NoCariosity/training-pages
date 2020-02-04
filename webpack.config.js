const path = require('path');

module.exports = {
    context: path.resolve(__dirname),
    entry: './src/coursecatalogue/index.js',

    devtool: 'source-map',

    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'js/bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        sourceType: 'unambiguous',
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
			{
				test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
			}
        ]
    },
}