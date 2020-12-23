const HtmlWebpackPlugin =  require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const backendConfig = {
    target: 'node',
    externals: [nodeExternals()],
    entry: './src/server/index.ts',
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'server.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    node: {
        __dirname: true
    },
    mode: 'development'
};

const frontendConfig = {
    target: 'web',
    entry: './src/app/index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx']
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/dist/app'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html'
        })
    ]
};

module.exports = [ backendConfig, frontendConfig ];