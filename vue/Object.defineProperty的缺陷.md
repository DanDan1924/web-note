<!--
 * @Author: your name
 * @Date: 2020-07-02 16:11:41
 * @LastEditTime: 2020-07-02 16:31:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/vue/Object.defineProperty的缺陷.md
--> 
## Object.defineProperty的缺陷
众所周知，尤大大的vue3.0版本用Proxy代替了defineProperty来实现数据响应，那么defineProperty有什么缺陷呢
```
// 这是将要被劫持的对象
const data = {
  name: '',
};

function say(name) {
  if (name === '古天乐') {
    console.log('给大家推荐一款超好玩的游戏');
  } else if (name === '渣渣辉') {
    console.log('戏我演过很多,可游戏我只玩贪玩懒月');
  } else {
    console.log('来做我的兄弟');
  }
}

// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});

data.name = '渣渣辉';
//大家好,我系渣渣辉
//戏我演过很多,可游戏我只玩贪玩懒月

```

虽然Object.defineProperty通过为属性设置getter/setter能够完成数据的响应式，但是它并不算是实现数据的响应式的完美方案，主要缺陷有
### 无法检测到对象属性的新增或删除
```
<p>{{obj}}</p>
<p>{{arr}}</p>

data(){
    return {
        obj:{
            a:2
        }
    }
},
mounted () {
    this.obj.b = 222
},
<!-- obj显示结果 -->
//obj:{ "a": 2 }
```
> 解决方法

（1）.增加属性
```
this.obj = Object.assign({},this.obj, { b: 1, e: 2 })
this.$set(this.obj,'f',0)
this.obj = {...this.obj,...{ b: 3, e: 2 }}
```
（数组类似）
（2）删除属性
```
Vue.delete(obj, propertyName/index)
vue.$delete(obj, propertyName/index)
```

 ### 无法监听数组变化
vue实现响应式时，把无法监听数组 的情况通过重写数组的部分方法来实现响应式，但是只局限在以下7种方法
`push` `pop` `shift` `unshift` `splice` `sort` `reverse`

```
<p>{{arr}}</p>

data(){
    return {
        arr:[1,2]
    }
},
mounted () {
    this.arr[0]= 3333
},
<!-- arr显示结果 -->
arr:[ 1, 2 ]

```
