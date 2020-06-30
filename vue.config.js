const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
const defaultSettings = require('./src/settings.js')
module.exports = {
    publicPath: './',    //部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
    outputDir: 'dist',        //运行时生成的生产环境构建文件的目录(默认'dist'，构建之前会被清除)
    assetsDir: 'static',        //静态资源目录(js、css、img、fonts)，相对outputDir的目录(默认'')
    indexPath: 'index.html', //指定生成index.html的输出路径(相对outputDir)也可以是绝对路径
    lintOnSave: false,                //是否开启ESlint（保存时检查）
    productionSourceMap: false,    //生产环境是否生成 sourceMap 文件
    devServer: {//环境配置
        host: '0.0.0.0',
        port: 8080,
        // https: false,      //是否开启https
        // hotOnly: false, //是否配置热更新
        // open: false,      //配置自动启动浏览器
        proxy: {        //配置多个代理跨域(配置一个 proxy: 'http://localhost:4000' )
            '/api': {
                target: process.env.VUE_APP_BASE_API,//目标服务器
                changeOrigin: true,//是否跨域
                pathRewrite: { '^/api': '/' }//重定向
            },
            '/auth': {
                target: process.env.VUE_APP_BASE_API2,//目标服务器
                changeOrigin: true,//是否跨域
                pathRewrite: { '^/auth': '/' }//重定向
            }
        }
    },
    //关于svg图片的配置
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = defaultSettings.title//关于vue的title标签中出现的htmlWebpackPlugin.options.title
                return args
            })
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        const svgRule = config.module.rule('svg')
        // 清除已有的所有 loader。
        // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
        svgRule.uses.clear()
        svgRule
            .test(/\.svg$/)
            .include.add(path.resolve(__dirname, './src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
        const fileRule = config.module.rule('file')
        fileRule.uses.clear()
        fileRule
            .test(/\.svg$/)
            .exclude.add(path.resolve(__dirname, './src/assets/icons'))
            .end()
            .use('file-loader')
            .loader('file-loader')

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end()
                    config
                        .optimization.splitChunks({
                            chunks: 'all',
                            cacheGroups: {
                                libs: {
                                    name: 'chunk-libs',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: 'initial' // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: 'chunk-elementUI', // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: 'chunk-commons',
                                    test: resolve('src/components'), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        })
                    config.optimization.runtimeChunk('single')
                }
            )
    }

};