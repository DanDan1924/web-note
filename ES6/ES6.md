<!--
 * @Author: your name
 * @Date: 2020-05-26 11:46:51
 * @LastEditTime: 2020-06-28 16:20:42
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
魔术字符串定义：