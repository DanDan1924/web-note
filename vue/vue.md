<!--
 * @Author: your name
 * @Date: 2020-06-14 16:14:32
 * @LastEditTime: 2020-07-02 18:36:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/vue/vue.md
--> 
<!-- 1.在父组件的created里面，父组件先于子组件创建 -->
[TOC] Vue组件
## Vue组件
### 通信方式
#### 父子 ：props $children refs
```
<!-- 1、props -->
// child
props: { msg: String }
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>

```
```
<!-- 2、$children -->
 // parent
this.$children[0].xx = 'xxx'
 
```
```
<!-- 3、$refs -->
// parent
<HelloWorld ref="hw"/>
mounted() {
  this.$refs.hw.xx = 'xxx'
}
```


#### 子父：自定义事件 
```
// child
this.$emit('add', good)
// parent
<Cart @add="cartAdd($event)"></Cart>
```
#### 任意组件：事件总线  vuex
```
<!-- 1、$bus 事件总线 -->
 // Bus:事件派发、监听和回调管理 class Bus {
  constructor(){
    this.callbacks = {}
  }
  $on(name, fn){
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args){
    if(this.callbacks[name]){
      this.callbacks[name].forEach(cb => cb(args))
    }
} }
// main.js
Vue.prototype.$bus = new Bus()
// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```
> 解析：Bus实现了Vue的$on   $emit   
#### 兄弟组件: `$parent`   `$root`
```
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```
#### 跨组件通信 provide/inject
```
// ancestor
provide() {
    return {foo: 'foo'}
}
// descendant
inject: ['foo']

<!-- 给inject传过来的值重命名 -->
inject: {
    bar1: {
        from: 'bar',
        default: 'barrrrrrrr'
    }
}, 
```
#### ⾮prop特性  `$attrs`/`$listeners`

>包含了父作用域中**不作为 prop 被识别** (且获取) 的特性绑定 ( `class 和 style 除外`)。当一个组件没有 声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。
```
// child:并未在props中声明msg 
<p v-bind="$attrs" v-on="$listeners"></p>

// parent
<Child msg="msg from grandpa"
      @foo="onFoo"></Child>
```


### 插槽
- 匿名插槽
```
// comp1
<div>
    <slot></slot>
</div>
// parent
<comp>hello</comp>
```
- 具名插槽
```
// comp2
<div>
    <slot></slot>
    <slot name="content"></slot>
</div>
// parent
<Comp2>
<!-- 默认插槽用default做参数 -->
<template v-slot:default>具名插槽</template> <!-- 具名插槽用插槽名做参数 -->
<template v-slot:content>内容...</template>
</Comp2>
```
- 作用域插槽
```
// comp3
<div>
    <slot :foo="foo"></slot>
</div>
// parent
<Comp3>
<!-- 把v-slot的值指定为作用域上下文对象 --> <template v-slot:default="ctx">
来自子组件数据:{{ctx.foo}} </template>
</Comp3>
```


### 组件创建  Vue.component  Vue.extend  template
- Vue.component 全局注册   
https://cn.vuejs.org/v2/api/#Vue-component 

- Vue.extend 使用 Vue 构造器   
Vue.extend 属于 Vue 的全局 API，在实际业务开发中我们很少使用，因为相比常用的 Vue.component 写法使用 extend 步骤要更加繁琐一些。但是在一些独立组件开发场景中，`Vue.extend + $mount` 这对组合是我们需要去关注的。
https://cn.vuejs.org/v2/api/#Vue-extend 

应用场景
（1）从接口动态渲染组件
（2）要实现类似于window.alert()的提示组件，要求像JS函数一样调用它。


```
<!-- 如下实现 -->
<!-- utils代码 -->
import Vue from 'vue'
// 传入一个组件配置
// 创建它的实例，并且将它挂载到body上
// 返回组件实例

export default function create(Component, props) {
    //Component：传入的组件
    //props：组件需要的参数

    const Ctor = Vue.extend(Component)
    const comp = new Ctor()
    Object.keys(props).forEach(item=>{
    comp[item] = props[item]
    })
    const vm = comp.$mount()
    document.body.appendChild(vm.$el)
    vm.remove = ()=>{
        <!-- 实例上挂载其他方法 -->
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return vm

    // extend方式二
    const Ctor = Vue.extend(Component)
    const comp = new Ctor({propsData:props})
    console.log(comp)
    const vm = comp.$mount()
    document.body.appendChild(vm.$el)
    vm.remove = ()=>{
         <!-- 实例上挂载其他方法 -->
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return vm
}


```

- template

## v-modal
> v-model是一个指令，限制在 `input`,`textarea`,`select`,`components`中使用

修饰符 .lazy(取代input监听change事件)、.number(输入字符串转为有效数字)
她其实是一个语法糖

### 自定义组件的v-model
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200702172308467.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)


### v-model是语法糖：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200702171512558.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)


 ## Vue 常见实例方法
 
 `$mount()`、`$destroy`、`$watch`、`$forceUpdate()`
 - **$mount()**：挂载，（vue的作用范围）
 ```
 <!-- 将 vue实例挂载在 #app上-->
 let vm = new Vue({
    data:{
        message:"张三"
    }
}).$mount("#app")

<!-- 将vue实例append到body里面（常用于需要js调用组件的写法） -->
 let vm = new Vue({
    data:{
        message:"张三"
    }
}).$mount() //将vdom变成dom

// vm.$el上有生成的dom
document.body.appendChild(vm.$el)
 ```
 - **$destroy()**：手动销毁
 - **$watch()** 监听
 - **$forceUpdate()** 强制跟新 （react也有）
 
 
## vue Router
### hash
hash change 时
component 

router-view
拿出component 重新执行下render函数

这个router-view能实现页面渲染的原因
### history API


### vuex的实现原理
view  
store: state

$store.state.ddd来访问

commit (type)  提交来改变store 
dispath: 

想办法把state里面的数据更新到view
数据响应式

准备 （1）vue plugin 的写法
    （2）render(h)的知识
     (3)  vue.util  defind  数据响应式
     new vue({})里面定义data 
     （4）熟悉 vue关于class语法

### 