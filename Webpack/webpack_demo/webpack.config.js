/*
 * @Author: your name
 * @Date: 2020-06-09 17:43:29
 * @LastEditTime: 2020-06-10 15:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/Webpack/webpack_demo/webpack.config.js
 */ 
const path = require('path')
// module.exports={
//     //入口文件的配置项
//     entry:'./src/entery.js',
//     //出口文件的配置项
//     output:{
//         path: path.resolve(__dirname,'dist'),
//         filename:'bundle.js'
//     },
//     //模块：例如解读CSS,图片如何转换，压缩
//     module:{},
//     //插件，用于生产模版和各项功能
//     plugins:[],
//     //配置webpack开发服务功能
//     devServer:{}
// }

// 多入口、多出口的配置
// 在入口文件配置中，增加了一个entry2.js的入口文件（这个文件你需要自己手动建立），这时候要打包的就有了两个入口文件。在代码14行我们把原来的bundle.js修改成了[name].js
module.exports={
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry.js',
    },
    //出口文件的配置项
    output:{
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase:path.resolve(__dirname,'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host:'localhost',
        //服务端压缩是否开启
        compress:true,
        //配置服务端口号
        port:1717
    }
}
