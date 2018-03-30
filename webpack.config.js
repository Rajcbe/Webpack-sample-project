var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");
var path = require("path");
var isProd = process.env.NODE_ENV === 'production';
var cssDev=['style-loader','css-loader','sass-loader'];
var cssProd= ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader","sass-loader"],
    publicPath:'../'
})
var cssConfig =isProd ? cssProd :cssDev;
module.exports={
    entry:{
        index:'./src/index.js',
    },
    output:{
        path:__dirname+'/public',
        filename:'[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // presets: [
                        //     ['es2015', { modules: false }]
                        // ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },

            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                use:['url-loader']
            },
            {
                test: /\.(gif|png|jpg|svg)$/i,
                use:[
                    {
                        loader: 'srcset-loader',
                    },
                    'file-loader?name=[name].[ext]&outputPath=images/',
                    'image-webpack-loader']
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        hot:true
    },
    plugins: [
        new HtmlWebpackPlugin(
        {
            title:'My Project',
            minify:{
                collapseWhitespace:true
            },
            template:'./src/index.html'
        }
    ),
        new ExtractTextPlugin({
        filename:"./css/[name].css",
        disable:!isProd,
        allChunks:true
    }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     Popper: ['popper.js', 'default'],
        //     "window.jQuery":"jquery"
        // }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new DynamicCdnWebpackPlugin(),
        new HtmlWebpackExternalsPlugin(
            {
            externals: [
                {
                    module: 'jquery',
                    entry: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
                    attributes:{
                        integrity:'sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=',
                        crossorigin:'anonymous',

                    },
                    global: 'jQuery',

                },

                {
                    module: 'popper',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
                        type: 'js',
                    },
                    attributes:{
                        integrity:'sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh',
                        crossorigin:'anonymous'

                    },
                },
                {
                    module: 'google-opensans',
                    entry: {
                        path: 'https://fonts.googleapis.com/css?family=Open+Sans:300,800',
                        type: 'css'
                    }
                },
                {
                    module: 'bootstrap',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css',
                        type: 'css'
                    },
                    attributes:{
                        integrity:'sha256-LA89z+k9fjgMKQ/kq4OO2Mrf8VltYml/VES+Rg0fh20=',
                        crossorigin:'anonymous',

                    }
                },
                {
                    module: 'bootstrap',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.min.js',
                        type: 'js'
                    },
                    attributes:{
                        integrity:'sha256-5+02zu5UULQkO7w1GIr6vftCgMfFdZcAHeDtFnKZsBs=',
                        crossorigin:'anonymous',

                    }
                },
                {
                    module: 'jquery-validate',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js',
                        type: 'js'
                    },
                    attributes:{
                        integrity:'sha256-F6h55Qw6sweK+t7SiOJX+2bpSAa3b/fnlrVCJvmEj1A=',
                        crossorigin:'anonymous',

                    }
                },
                {
                    module: 'moment',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js',
                        type: 'js'
                    },
                    attributes:{
                        integrity:'sha256-zG8v+NWiZxmjNi+CvUYnZwKtHzFtdO8cAKUIdB8+U9I=',
                        crossorigin:'anonymous',

                    }
                },
                {
                    module: 'moment-timezone',
                    entry: {
                        path: 'https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.14/moment-timezone.min.js',
                        type: 'js'
                    },
                    attributes:{
                        integrity:'sha256-wnlfv2SMPXay8VywRkRiL5zysJhwn2Y0du7pg2fkoEY=',
                        crossorigin:'anonymous',

                    }
                },

            ],
                files: ['index.html'],

            // enabled:isProd,
            }

        ),

        // new CompressionPlugin({
        //     asset: "[path].gz[query]",
        //     algorithm: "gzip",
        //     test: /\.js$|\.css$|\.html$/,
        //     threshold: 10240,
        //     minRatio: 0.8
        // })


    ]
};