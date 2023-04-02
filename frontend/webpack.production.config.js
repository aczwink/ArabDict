const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "production",

    entry: "./src/app.ts",
    output: {
        path: __dirname + "/dist",
        filename: "bundle.js",
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    plugins: [
        new Dotenv({
            path: './.env.production'
        })
    ],

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
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
};