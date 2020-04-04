const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [ new OptimizeCssAssetsPlugin() ]
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /styles\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,                    
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use:[
                    {
                        loader: 'html-loader',
                        options:{
                            minimize:false,
                            attributes: false,
                        }

                    }
                ]
                
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'[name].[contentHash].css',
            ignoreOrder: false
        }),
        new CopyPlugin([
            { from: 'src/assets', to: 'assets/' }
        ]),
        new CleanWebpackPlugin(),
    ]

}

