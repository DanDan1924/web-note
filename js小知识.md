<!--
 * @Author: your name
 * @Date: 2020-06-28 16:21:58
 * @LastEditTime: 2020-06-30 15:05:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/js小知识.md
--> 
## 低耦合
### 概念
所谓低耦合，就是一个组件在多个环境，复杂的项目下，都可以运行，而不会出现不可用的情况
vue的组件就是使模块独立，尽量降低耦合性，达到组件高复用，低耦合
### 1.尽量减少使用全局变量
### 2.js/css/html的耦合
不推荐在js里直接修改样式，而是应该通过增删类来控制，让样式写在css里
### 3.减少代码重复，整体思路
整体思路：`出现重复代码--->封装成函数--->封装成模块--->封装成插件`

## arguments对象
### 须知概念
形参：函数定义的参数
实参：函数调用时实际传递的参数
从左往右匹配，如果实参小于形参，后面的形参会对应赋值 undefined
- 访问形参个数：
    - 函数名.length
- 访问实参个数：
    - arguments.length访问,(只有函数中才有arguments,arguments是所在函数实参的数组)
    
`arguments.length为函数实参个数，arguments.callee引用函数自身`

```
function a(ff){
    console.log(arguments)
}
a.length //1

(function(){
    console.log(arguments)
    console.log(arguments.callee)
})(1)

//结果自己运行下看看吧
```


