<!--
 * @Author: your name
 * @Date: 2020-07-05 19:15:30
 * @LastEditTime: 2020-07-05 19:23:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-note/vue/vue源码.md
--> 
## Vue的设计思想
### MVVM模式
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200705192223881.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)
- MVVM框架三要素：数据响应式、模板引擎、渲染
    - 数据响应式：监听数据变化并在视图中更新
        - Object.defindProperty
        - proxy
    - 模板引擎
        - 插值：{{}}
        - 指令： v-bind，v-on，v-model，v-for，v-if
    - 渲染：如何将模板转换成html
        - 模板=> vdom => dom
#### 数据响应式的原理
数据变更能相应在视图中，就是数据响应式。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200705192335501.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2RhbmRhbjE5MjQ=,size_16,color_FFFFFF,t_70)

