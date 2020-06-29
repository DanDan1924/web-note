<!--
 * @Author: your name
 * @Date: 2020-05-26 11:46:51
 * @LastEditTime: 2020-06-29 19:56:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/es6/es6-flat.md
--> 
## es6之数组的flat()，flatMap()，多维数组变一维数组扩展

### 一、flat()：
1.负责将`多维数组--->一维数组`。该方法返回一个新的数组，对原数据没有影响。
```
[1,2,[2,3],[2,2]].flat()
//[1, 2, 2, 3, 2, 2]
```
2.flat()`默认只会“拉平”一层，默认为1`，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数。
```
[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]
[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
```
3.如果不管有多少层嵌套，都要转成一维数组，可以用`Infinity`关键字作为参数。
如果原数组有空位，flat()方法会跳过空位。
```
[1, [2, [3,4]]].flat(Infinity)
// [1, 2, 3, 4]

[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]
```
### 二、flatMap()
flatMap()方法对原数组的每个成员执行一个函数，`相当于执行Array.prototype.map()`,`然后对返回值组成的数组执行flat()`方法。该方法返回一个新数组，不改变原数组。
flatMap()`只能展开一层数组`。

```
[2, 3, 4].flatMap((x) => [x, x * 2])
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
// [2, 4, 3, 6, 4, 8]
```
### 三、扩展：多维数组-->一维数组

## Symbol
### 一.概述
#### 1.基本概念
ES6引进一种新的原始数据类型`Symbol`,表示独一无二的值。
Symbol 值通过`Symbol函数生成`,也就是对象的属性名可以有两种类型，`原有的字符串`和`新增的 Symbol 类型`。

```
let s = Symbol();

typeof s
// "symbol"
```
注意：注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的 Symbol 是一个原始类型的值，不是对象。也就是说，由于 Symbol 值`不是对象`，所以`不能添加属性`。基本上，它是一种类似于字符串的数据类型。
#### 2.参数
（1）字符串：`对 Symbol 实例的描述`，（`主要是为了`在控制台显示，或者转为字符串时，比较容易`区分`）
```
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```
（2）对象(就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值)
```
const obj = {
  toString() {
    return 'abc';
  }
};
const sym = Symbol(obj);
sym // Symbol(abc)
```
注意：相`同参`数的Symbol函数的`返回值`是`不`相`等`的
理由：Symbol函数的参数只是表示对当前 Symbol 值的描述
```
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```
#### 3.转换
只可以转换为以下两种类型
（1）转为字符串
```
let sym = Symbol('My symbol');

String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'
```
（2）转为布尔值
```
let sym = Symbol();
Boolean(sym) // true
!sym  // false

if (sym) {
  // ...
}

Number(sym) // TypeError
sym + 2 // TypeError
```
### 二.Symbol.prototype.description
创建 Symbol 的时候，可以添加一个描述。
```
const sym = Symbol('foo');
上面代码中，sym的描述就是字符串foo。

但是，读取这个描述需要将 Symbol 显式转为字符串，即下面的写法。
const sym = Symbol('foo');

String(sym) // "Symbol(foo)"
sym.toString() // "Symbol(foo)"

```

ES2019 提供了一个实例属性description，直接返回 Symbol 的描述
```
const sym = Symbol('foo');

sym.description // "foo"
```

### 作为属性名的 Symbol

能`保证不会出现同名的属性`
对于一个对象由多个模块构成的情况非常有用，能`防止某一个键被不小心改写或覆盖`
```
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

注意，Symbol 值作为对象属性名时，`不能用点运算符`。
```
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
\\上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值

同理：在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```

### 四.实例：消除魔术字符串
魔术字符串定义：在代码中多次出现，`与代码形成强耦合的字符串或数值`。（风格良好的代码，应该消除魔术字符串，改由含义清晰的变量代替）
```
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

//上述代码 Triangle为魔术字符串，不利于将来的维护和修改
变为变量 后的代码
onst shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```
如果仔细分析，可以发现shapeType.triangle等于哪个值并不重要，只要确保不会跟其他shapeType属性的值冲突即可。因此，这里就很适合改用 Symbol 值。
```
//除了将shapeType.triangle的值设为一个 Symbol，其他地方都不用修改。
const shapeType = {
  triangle: Symbol()
};
```
### 五.属性名的遍历
Symble作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`（返回指定对象的可枚举属性组成的数组）、`Object.getOwnPropertyNames()`(返回指定对象的所有自身属性组成的数组，包括不可枚举属性)、`JSON.stringify()`（JSON对象-->JSON字符串）返回。
> `Object.getOwnPropertySymbols()`:获取指定对象的所有 Symbol 属性名组成的数组

> `Reflect.ownKeys()`:返回所有类型的属性名（包括常规键名和 Symbol 键名）

```
//例1：Object.getOwnPropertySymbols()
const obj = {
    [Symbol('a')]:'Hello',
    [Symbol('b')]:'world'
}
const a = Object.getOwnPropertySymbols(obj);
a 
//[Symbol(a), Symbol(b)]



//例2：Reflect.ownKeys()
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```
由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。
```
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```
上面代码中，对象`x`的`size`属性是一个 Symbol 值，所以`Object.keys(x)`、`Object.getOwnPropertyNames(x)`都无法获取它。这就造成了一种非私有的内部方法的效果。

### 六、Symbol.for()，Symbol.keyFor() 
#### 1、Symbol.for()
需求：希望重新`使用同一个 Symbol 值`
> Symbol.for()：接受一个字符串作为参数，`搜索有没有以该参数作为名称的 Symbol 值` --->
（1）`有`：就`返回`这个 Symbol 值.
（2）`没有`：`新建`一个以 该名称为参数的 Symbol 值，并将其注册到全局
```
//以下s1 和 s2 实际上为同一个值

let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

```
#### 2、Symbol.keyFor()
> Symbol.keyFor():方法返回一个已登记的 Symbol 类型值的`key`
注意：`Symbol()写法没有登记机制`

```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

解析：上面代码中，变量s2属于未登记的 Symbol 值，所以返回undefined
```
#### 3、Symbol.for()与Symbol()异同
相同点：都会生成新的 Symbol
区别：
（1）`Symbol.for()会被登记在全局环境中`,Symbol()不会
（2）`Symbol.for()不会每次调用都返回一个新的Symbol类型的值`，会先检查给定的key是否存在。Symbol()每次返回新的
```
示例1：
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false

```
Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。
```
示例2：
function foo() {
  return Symbol.for('bar');
}

const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true
//解析：上面代码中，Symbol.for('bar')是函数内部运行的，但是生成的 Symbol 值是登记在全局环境的。所以，第二次运行Symbol.for('bar')可以取到这个 Symbol 值
```

Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

```
示例3：
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true
解析：上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。
```

### 七、模块的 Singleton 模式
Singleton 模式概念：指调用一个类，任何时候返回的都是同一个实例

对于 Node 来说，模块文件可以看成是一个类。怎么保证每次执行这个模块文件，返回的都是同一个实例呢？

很容易想到，可以把实例放到顶层对象`global`。

```
// mod.js
function A() {
  this.foo = 'hello';
}

if (!global._foo) {
  global._foo = new A();
}

module.exports = global._foo;
```
然后，加载上面的mod.js。
```
const a = require('./mod.js');
console.log(a.foo);
```
上面代码中，变量a任何时候加载的都是A的同一个实例。

但是，这里有一个问题，全局变量global._foo是可写的，任何文件都可以修改。

```
global._foo = { foo: 'world' };

const a = require('./mod.js');
console.log(a.foo);
```
上面的代码，会使得加载mod.js的脚本都失真。

为了防止这种情况出现，我们就可以使用 Symbol。
```
// mod.js
const FOO_KEY = Symbol.for('foo');

function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];
```
上面代码中，可以保证`global[FOO_KEY]`不会被无意间覆盖，但还是可以被改写。
```
global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');
```
如果键名使用Symbol方法生成，那么外部将无法引用这个值，当然也就无法改写。
```
// mod.js
const FOO_KEY = Symbol('foo');

// 后面代码相同 ……
```
上面代码将导致其他脚本都无法引用FOO_KEY。但这样也有一个问题，就是如果多次执行这个脚本，每次得到的FOO_KEY都是不一样的。虽然 Node 会将脚本的执行结果缓存，一般情况下，不会多次执行同一个脚本，但是用户可以手动清除缓存，所以也不是绝对可靠。

### 八、内置的 Symbol 值
除了定义自己使用的 Symbol 值以外，ES6 还提供了 `11 个内置的 Symbol` 值，指向语言内部使用的方法。
#### Symbol.hasInstance
#### Symbol.isConcatSpreadable
#### Symbol.species 
#### Symbol.match
#### Symbol.replace 
#### Symbol.search 
#### Symbol.split 
#### Symbol.iterator 
#### Symbol.toPrimitive
#### Symbol.toStringTag
#### Symbol.unscopables


## Set数据结构
### Set
- 定义：类似于数组的数据结构，成员值是唯一的且没有重复的值
- 声明：`const set = new Set(arr)`
- 参数：具有`Iterator接口`的数据结构
```
// 例一
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5


// 例二
const set = new Set(document.querySelectorAll('div'));
set.size // 56

//解析：例一是数组作为参数，例二是类似数组的对象作为参数
```
- 属性：
  - constructor：构造函数，默认就是Set函数
  - size：返回实例成员总数
- 方法：
 1). 操作方法
  - add()：添加值，返回set实例本身
  - delete()：删除值，返回成功或失败的布尔
  - has()： 检查值，返回布尔
  - clear()：清除所有成员，无返回值 
  
  2). 操作方法
  - keys()：返回以属性值为遍历器的对象
  - values()：返回以属性值为遍历器的对象
  - entries()：返回以属性值和属性值为遍历器的对象
  - forEach()：使用回调函数遍历每个成员
  ```
    let set = new Set(['red', 'green', 'blue']);
    for (let item of set.keys()) {
    console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.values()) {
    console.log(item);
    }
    // red
    // green
    // blue

    for (let item of set.entries()) {
    console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]

    let set = new Set([1, 4, 9]);
    set.forEach((value, key) => console.log(key + ' : ' + value))
    // 1 : 1
    // 4 : 4
    // 9 : 9
  ```

> 应用场景

- 去重数组：`[...new Set(arr)]`或`Array.from(new Set(arr))`
- 去重字符串： `[...new Set(str)].join('')`
  ```
  var str = 'kkkaaa222'
  [...new Set(str)]..join('')
  //"ka2"
  ```
- 集合数组
    - 声明：const a = new Set(arr1)、const b = new Set(arr2)
    - 并集：`new Set([...a, ...b])`
    - 交集：`new Set([...a].filter(v => b.has(v)))`
    - 差集：`new Set([...a].filter(v => !b.has(v)))`（有问题，待更新）

- 映射集合
    - 声明：let set = new Set(arr)
    - 映射：`set = new Set([...set].map(v => v * 2))`或`set = new Set(Array.from(set, v => v * 2))`
> 重点难点
- 遍历顺序：插入顺序
- 没有键只有值，可认为`键和值两值相等`
- 添加多个NaN时，只会存在一个NaN
- 添加相同的对象时，会认为是不同的对象
- 添加值时不会发生类型转换(5 !== "5")
- `keys()`和`values()`的行为完全一致，`entries()`返回的遍历器同时包括键和值且两值相等

### WeakSet
- 定义：和Set结构类似，成员值只能是对象
```
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
```
- 声明：new WeakSet()
- 入参：具有 Iterable 接口的对象
```
示例1.
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
解析：注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。

示例2.
const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
解析：上面代码中，数组b的成员不是对象，加入 WeakSet 就会报错。
``` 
- 属性：
    - constructor：构造函数，返回WeakSet
- 方法：
    - add()：添加值，返回set实例本身
    - delete()：删除值，返回成功或失败的布尔
    - has()： 检查值，返回布尔
        
WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失
> 应用场景
- 储存DOM节点：DOM节点被移除时自动释放此成员，不用担心这些节点从文档移除时会引发内存泄漏
- 临时存放一组对象或存放跟对象绑定的信息：只要这些对象在外部消失，它在WeakSet结构中的引用就会自动消 
>重点难点
- 成员都是`弱引用`，垃圾回收机制不考虑WeakSet结构对此成员的引用
- 成员不适合引用，它会随时消失，因此ES6规定WeakSet结构`不可遍历`
- 其他对象不再引用成员时，垃圾回收机制会自动回收此成员所占用的内存，不考虑此成员是否还存在于`WeakSet结构`中

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

## Class
