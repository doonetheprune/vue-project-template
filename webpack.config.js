/**
 * Created by ShaunBetts on 01-Sep-15.
 */
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname+'',
    entry: {
        main: "./src/app.js",
        vendor : ['jquery','lodash','vue','bootstrap'],
    },
    output: {
        path: __dirname+'/dist/',
        filename: "js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, query: { presets: ['es2015'] } },
            { test: /\.vue$/, loader: 'vue'},
            { test: /\.html/, loader: "vue-html-loader?root=" + __dirname + "/src/img" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.json$/,loader: "json-loader" },
            { test: /\.less$/,loader: "style-loader!css-loader!less-loader" },
            { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader?name=img/[name].[ext]'},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff"},
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /img/, loader: "file-loader?name=fonts/[name].[ext]"}
        ]
    },
    resolve:{
        alias: {vue: 'vue/dist/vue.js'},
        extensions: ['', '.js', '.css', '.html'],
        modulesDirectories:[
          'node_modules',
          'modules',
          'styles'
        ]
    },
    amd: {
        jQuery: true
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"js/vendor.bundle.js"),
        new webpack.ProvidePlugin({
            _: "lodash",
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new HtmlWebpackPlugin({
            title: 'Vue Template'
        })
    ],
  devtool: 'source-map'
};