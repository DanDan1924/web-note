<!--
 * @Author: your name
 * @Date: 2020-06-14 16:14:32
 * @LastEditTime: 2020-07-02 12:04:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/vue/vue.md
--> 
<!-- 1.在父组件的created里面，父组件先于子组件创建 -->
## Vue组件
### 通信方式
#### 父子 ：`props` `$children` `refs`
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


#### 子父：`自定义事件 `
```
// child
this.$emit('add', good)
// parent
<Cart @add="cartAdd($event)"></Cart>
```
#### 任意组件：`事件总线` `vuex`
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
#### 兄弟组件:`$parent` `$root` 
```
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```
#### 跨组件通信 `provide/inject`
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
#### ⾮prop特性 `$attrs/$listeners`  
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
- 具名插槽
- 作用域插槽

### 组件创建
- Vue.component 全局注册   
https://cn.vuejs.org/v2/api/#Vue-component 

- Vue.extend 使用 Vue 构造器   
https://cn.vuejs.org/v2/api/#Vue-extend 
```

```

- template

## v-modal
v-model是一个指令，限制在 input,textarea,select,components中使用

修饰符 .lazy(取代input监听change事件)、.number(输入字符串转为有效数字)
她其实是一个语法糖

 ## Vue 常见实例方法 $mount() $destroy $watch $forceUpdate()
 - $mount()：挂载，（vue的作用范围）
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
 - $destroy()：手动销毁
 - $watch() 监听
 - $forceUpdate() 强制跟新 （react也有）
 