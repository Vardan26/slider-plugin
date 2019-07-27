let ExtractTextPlugin = require("extract-text-webpack-plugin");
let path = require('path');

let conf;
conf = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\/.js$/,
                loader: "babel-loader",
                // exclude: "/node-modules/"
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: 'css-loader', options: {importLoaders: 1}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: (loader) => [
                                    require('autoprefixer')({
                                        browsers: [
                                            "> 1%",
                                            "last 2 versions./"
                                        ]
                                    }),
                                    require('cssnano')(),
                                ]
                            }
                        },
                        "sass-loader",
                    ]

                })
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|woff2?|ttf)$/,
                loader: "url-loader?Limit=8000&name=images/[name].[ext]"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
};

module.exports = (env, options) => {
    let production = options.mode === "production";
    conf.devtool = production ? "eval-source-map" : "source-map";
    return  conf;
};