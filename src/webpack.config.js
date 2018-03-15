var webpack = require('webpack')
var path = require('path')  //nodejs内置的，用于组装js
var Ex = require('extract-text-webpack-plugin')


module.exports = [
    {
        entry: path.join(__dirname, "js/app/index.js"),  //入口
        output: {
            path: path.join(__dirname, "../public"),  //输出
            filename: "js/index.js"
        },
        resolve: {
            //解析模块别名
            alias: {
                jquery: path.join(__dirname, "js/lib/jquery-3.3.1.min.js"),//当require开头的是jQuery，就引导到这里。
                mod: path.join(__dirname, "js/mod"),
                less: path.join(__dirname, "less")
            },
            extensions: ['.less']
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: Ex.extract({
                        use: ['css-loader', 'less-loader'],
                    })
                },
                {
                    test: /\.(woff|svg|eot|ttf|otf)(\??.*)?/,
                    loader: ['url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]']
                }
            ]
        },
        plugins: [
            new Ex("css/style.css")
        ]
    }
]
