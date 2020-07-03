<!--
 * @Author: your name
 * @Date: 2020-07-03 15:11:55
 * @LastEditTime: 2020-07-03 15:11:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web-note/ES6/ES6-map&set.md
--> 

## Map
### Map
- 定义：`类似于对象`的数据结构，`成员键是任何类型的值`
- 声明：new Map(arr)
- 参数：具有Iterator接口且每个成员都是一个双元素数组的数据结构
- 属性
    - **constructor**：构造函数，返回Map
    - **size**：返回实例成员总数
- 方法 
    - **get()**：返回键值对
    - **set()**：添加键值对，返回实例
    - **delete()**：删除键值对，返回布尔
    - **has()**：检查键值对，返回布尔
    - **clear()**：清除所有成员
    - **keys()**：返回以键为遍历器的对象
    - **values()**：返回以值为遍历器的对象
    - **entries()**：返回以键和值为遍历器的对象
    - **forEach()**：使用回调函数遍历每个成员

> 重点难点

- 遍历顺序：插入顺序
- 对同一个键多次赋值，后面的值将覆盖前面的值
- 对同一个对象的引用，被视为一个键
- 对同样值的两个实例，被视为两个键
- 键跟内存地址绑定，只要内存地址不一样就视为两个键
- 添加多个以NaN作为键时，只会存在一个以NaN作为键的值
- Object结构提供字符串—值的对应，Map结构提供值—值的对应

### WeakMap

- 定义：和Map结构类似，`成员键只能是对象`
- 声明：const set = `new WeakMap(arr)`
- 入参：具有Iterator接口且每个成员都是一个双元素数组的数据结构

- 属性
    -constructor：构造函数，返回WeakMap
- 方法
    - get()：返回键值对
    - set()：添加键值对，返回实例
    - delete()：删除键值对，返回布尔
    - has()：检查键值对，返回布尔

>应用场景
- 储存DOM节点：DOM节点被移除时自动释放此成员键，不用担心这些节点从文档移除时会引发内存泄漏
- 部署私有属性：内部属性是实例的弱引用，删除实例时它们也随之消失，不会造成内存泄漏
 > 重点难点
- 成员键都是`弱引用`，垃圾回收机制不考虑WeakMap结构对此成员键的引用
- `成员键不适合引用，它会随时消失`，因此ES6规定WeakMap结构`不可遍历`
- 其他对象不再引用成员键时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员- 是否还存在于WeakMap结构中
- 一旦不再需要，成员会自动消失，不用手动删除引用
- 弱引用的`只是键而不是值`，值依然是正常引用
- 即使在外部消除了成员键的引用，内部的成员值依然存在