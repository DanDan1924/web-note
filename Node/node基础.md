### 一.Node 介绍
#### 1.优势和缺点
1.便于前端开发入门
2.性能高
（node运行在chrome V8引擎上）
3.利于前端代码整合
（比如说写正则，写一套通用的）
缺点：
框架少，和java等大后端比。不过node的定位主要是中间层
#### 2.Node环境搭建与运行
官网：https://nodejs.org/zh-cn/
#### 3.npm 和 包
没有npm时引用插件
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020051720192813.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)

有了之后用package.json管理
常用命令：
```
npm init //初始化

npm install XXX //安装(npm i XXX //简写)

npm uninstall XXX //卸载(npm un XXX //简写)

npm update XXX //更新包

npm install //拷贝给朋友所有依赖里面的包（npm i //简写）

npm install cnpm -g --registry=https://registry.npm.taobao.org（cnpm下载）

```
### 二.Node 的模块
#### 1.Node中的模块：全局模块
（1）定义：何时何地都能访问，不需要引用
（2）process.env 环境变量
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200517202914907.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)
（3）process.argv
（4）__dirname 等  

#### 2.Node中的模块：系统模块
（1）定义：`需要require，但不需要单独下载`
系统内置好的模块，只需要引进来，不需要下载
（2）path：用于处理文件路径和目录路径的实用工具
```
path.dirname:路径

path.basename : 返回 path 的最后一部分
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'

path.extname //返回扩展名
path.extname('index.html');
// 返回: '.html'


path.resolve //方法将路径或路径片段的序列解析为绝对路径。
path.resolve('/foo/bar', './baz');
// 返回: '/foo/bar/baz'
path.resolve('/foo/bar', '/tmp/file/');
// 返回: '/tmp/file'
path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
// 如果当前工作目录是 /home/myself/node，
// 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'


```
（3）fs: 用于文件读写操作

#### 3.Node中的模块：自定义模块

#### 4.核心：http模块

### 三.Node中的数据交互
#### 1.get请求
#### 2.post请求


