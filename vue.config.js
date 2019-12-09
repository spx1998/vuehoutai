const webpack=require('webpack');
module.exports = {
    publicPath:"./",  // 可以设置成相对路径，这样所有的资源都会被链接为相对路径，打出来的包可以被部署在任意路径

    outputDir:"dist",  //打包时生成的生产环境构建文件的目录

    assetsDir: 'public',

    lintOnSave:false,
    configureWebpack: {
        plugins: [

            new webpack.ProvidePlugin({

                $:"jquery",

                jQuery:"jquery",

                jquery:"jquery",

                "windows.jQuery":"jquery"

            })

        ],
        devServer: {
            open: true, //是否自动弹出浏览器页面
            host: "localhost",
            port: '8888',
            https: false,
            hotOnly: false,
            proxy: {
                '/api': {
                    target: 'http://39.106.81.211:9000/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            },
        }
    },


};
