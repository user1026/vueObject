const webpack = require('webpack')

module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }])
    },
    devServer:{
        proxy: {  
            '/api': {  //代理地址  
                target: 'http://localhost:3000',  //需要代理的地址  
                changeOrigin: true,  //是否跨域  
                secure: false,    
                pathRewrite: {  
                    '^/api': 'http://localhost:3000'   //本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉  
                }
            }
        }
    }
   
}