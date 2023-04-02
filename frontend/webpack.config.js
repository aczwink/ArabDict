const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/app.ts",

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new Dotenv()
    ],

    devServer: {
        historyApiFallback: {
            index: 'index.htm'
        },
        
        static: {
            directory: path.join(__dirname, 'static'),
            publicPath: '/',
        },
        port: 8081
    },

    devtool: "inline-source-map",
};