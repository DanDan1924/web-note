<!--
 * @Author: your name
 * @Date: 2020-07-13 12:06:47
 * @LastEditTime: 2020-07-13 12:06:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /web-note/vue/Vue查看看源码的技巧.md
--> 
### 搭建调试环境
- 获取地址：git clone https://github.com/vuejs/vue.git
- 安装依赖：npm i
- 安装rollup：npm i -g rollup(因为是用rollup打包的)
- script修改dev脚本 加上--sourcemap
```
"dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
```
作用：打包之后 dist 下多了map文件，可以和源码进行很好的映射，方便更好的调试源码
![vue.js.map](https://upload-images.jianshu.io/upload_images/5074864-d461f5b4462fea98?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 执行dev:npm run dev

### 调试技巧

- 打开指定文件： ctrl+p   (cmd+p)
- 断点
![调试技巧](https://upload-images.jianshu.io/upload_images/5074864-055340c7328d62d2?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 查看调用栈
特别想搞清除先后之前的调用关系，有时候进入过深就蒙圈了，就好好研究call stack，能给你一个很好的思路
![查看调用栈](https://upload-images.jianshu.io/upload_images/5074864-043a33ae12dac472?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 定位源文件所在位置
![定位文件位置](https://upload-images.jianshu.io/upload_images/5074864-827e75489af3d25b?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
掌握了以上，看的次数多了后，源码的执行就很清晰的在脑海中了。