
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

