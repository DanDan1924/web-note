## webpack 
### 一.webpack的作用、快速上手一个demo
#### 1.什么是webpack
> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

重点：

`打包`：可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。<br>
`转换`：把拓展语言转换成为普通的JavaScript，让浏览器顺利运行<br>
`优化`：前端变的越来越复杂后，性能也会遇到问题，而WebPack也开始肩负起了优化和提升性能的责任。

#### 2.安装
1.安装node

2.新建文件夹，然后操作
```
mkdir webpack_demo
cd webpack_demo
```
3.安装webpack
```
<!-- 全局安装 -->
npm install -g webpack
// 注意：全局安装是可以的，但是webpack官方是不推荐的。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。
```
4.对项目目录进行安装
```
npm n init
npm install --save-dev webpack
// –save:保存到package.json中
// dev:在开发时使用这个包，而生产环境中不使用
```
拓展：开发环境and生产环境：

开发环境：在开发时需要的环境，这里指在开发时需要依赖的包。

生产环境：程序开发完成，开始运行后的环境，这里指要使项目运行，所需要的依赖包。

#### 3.快速上手demo
1.在webpack_demo文件夹下新建文件：
/dist/index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jspang webpack</title>
</head>
<body>
    <div id="title"></div>
    <script src="./bundle.js"></script>
</body>
</html>
```
/src/entery.js
```
document.getElementById('title').innerHTML='Hello JenneyJ';

```
2.命令行打包
webpack src/entery.js dist/bundle.js
这时dist文件夹下就会出现bundle文件
### 二.webpack配置文件：入口和出口
#### 1.配置文件webpack.config.js
在根目录手动创建文件：webpack.config.js
webpack配置模板如下：
```
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```
>entry：配置入口文件的地址，可以是单一入口，也可以是多入口。

>output：配置出口文件的地址，在webpack2.X版本后，支持多出口配置。

>module：配置模块，主要是解析CSS和图片转换压缩等功能。

>plugins：配置插件，根据你的需要配置不同功能的插件。

>devServer：配置开发服务功能，后期我们会详细讲解。
#### 2.单入口、单出口配置
```
const path = `require`('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'bundle.js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```
#### 3.多入口、多出口配置
```
const path = `require`('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```

可以看到代码的第7和14行进行了增加和修改，在入口文件配置中，增加了一个entry2.js的入口文件（这个文件你需要自己手动建立），这时候要打包的就有了两个入口文件。在代码14行我们把原来的bundle.js修改成了`[name].js`。

`[name]`的意思是`根据入口文件的名称，打包成相同的名称`，有几个入口文件，就可以打包出几个文件。
执行 webpack 就可以看到结果

### 三.配置文件：服务和热更新
热更新:作为一个前端工程师，最大的编程需求之一就是所见即所得的工具
#### 1.设置webpack-dev-server(webpack 3.6新增)
（1）要执行`webpack-dev-server`是要先用`npm install webpack-dev-server –save-dev`来进行下载的

```
npm install webpack-dev-server --save-dev

```

（2）下载完`配置devServer`

最简单的devServer配置项只有四个:
```
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
```
>contentBase:配置服务器`基本运行路径`，用于找到程序打包地址。<br>
host：`服务运行地址`，建议使用本机IP，这里为了讲解方便，所以用localhost。<br>
compress：`服务器端压缩选型，一般设置为开启`，如果你对服务器压缩感兴趣，可以自行学习。<br>
port：`服务运行端口`，建议不使用80，很容易被占用，这里使用了1717.

（3）命令行执行 webpack-dev-server 成功，在 http://localhost:1717/ 可看到结果

（4）在package.json 中配置 scripts 后，就可以执行命令 npm run server
```
"scripts": {
    "server":"webpack-dev-server"
  }
```
备注：在npm run server 启动后，它是有一种监控机制的（也叫watch）。它可以监控到我们修改源码，并立即在浏览器里给我们更新。
这里只是我们的webpack3.6版本支持，在3.5版本时要支持热更新还需要一些其他的操作。
### 四.模块：CSS文件打包




