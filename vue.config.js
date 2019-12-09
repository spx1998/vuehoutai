const webpack=require('webpack');
module.exports = {
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
                //TODO: 路径上线需要修改
                '/': {
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            },
        }
    },


};
