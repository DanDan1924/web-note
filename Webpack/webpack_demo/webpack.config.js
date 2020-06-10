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
    entry:{
        entry:'./src/entery.js',
        entry2:'./src/entery2.js',

    },
    //出口文件的配置项
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
