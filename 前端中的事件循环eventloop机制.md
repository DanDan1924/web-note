### 前端中的事件循环eventloop机制

我们知道 js 是单线程执行的，那么异步的代码 js 是怎么处理的呢？例如下面的代码是如何进行输出的：

```javascript
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);
new Promise(function(resolve) {
    console.log(3);
    resolve(Date.now());
}).then(function() {
    console.log(4);
});
console.log(5);
setTimeout(function() {
    new Promise(function(resolve) {
        console.log(6);
        resolve(Date.now());
    }).then(function() {
        console.log(7);
    });
}, 0);
```

在不运行的情况可以先猜测下最终的输出，然后展开我们要说的内容。

#### 1. 宏任务与微任务

依据我们多年编写 ajax 的经验：js 应该是按照语句先后顺序执行，在出现异步时，则发起异步请求后，接着往下执行，待异步结果返回后再接着执行。但他内部是怎样管理这些执行任务的呢？

在 js 中，任务分为宏任务(macrotask)和微任务(microtask)，这两个任务分别维护一个队列，均采用先进先出的策略进行执行！同步执行的任务都在宏任务上执行。

宏任务主要有：script(整体代码)、setTimeout、setInterval、I/O、UI 交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)。

微任务主要有：Promise.then、 MutationObserver、 process.nextTick(Node.js 环境)。

具体的操作步骤如下：

1. 从宏任务的头部取出一个任务执行；
2. 执行过程中若遇到微任务则将其添加到微任务的队列中；
3. 宏任务执行完毕后，微任务的队列中是否存在任务，若存在，则挨个儿出去执行，直到执行完毕；
4. GUI 渲染；
5. 回到步骤 1，直到宏任务执行完毕；

这 4 步构成了一个事件的循环检测机制，即我们所称的`eventloop`。

回到我们上面说的代码：

```javascript
console.log(1);
setTimeout(function() {
    console.log(2);
}, 0);
new Promise(function(resolve) {
    console.log(3);
    resolve(Date.now());
}).then(function() {
    console.log(4);
});
console.log(5);
setTimeout(function() {
    new Promise(function(resolve) {
        console.log(6);
        resolve(Date.now());
    }).then(function() {
        console.log(7);
    });
}, 0);
```

执行步骤如下：

1. 执行 log(1)，输出 1；
2. 遇到 setTimeout，将回调的代码 log(2)添加到宏任务中等待执行；
3. 执行 console.log(3)，将 then 中的 log(4)添加到微任务中；
4. 执行 log(5)，输出 5；
5. 遇到 setTimeout，将回调的代码 log(6, 7)添加到宏任务中；
6. 宏任务的一个任务执行完毕，查看微任务队列中是否存在任务，存在一个微任务 log(4)（在步骤 3 中添加的），执行输出 4；
7. 取出下一个宏任务 log(2)执行，输出 2；
8. 宏任务的一个任务执行完毕，查看微任务队列中是否存在任务，不存在；
9. 取出下一个宏任务执行，执行 log(6)，将 then 中的 log(7)添加到微任务中；
10. 宏任务执行完毕，存在一个微任务 log(7)（在步骤 9 中添加的），执行输出 7；

因此，最终的输出顺序为：1, 3, 5, 4, 2, 6, 7;

我们在Promise.then实现一个稍微耗时的操作，这个步骤看起来会更加地明显：

```javascript
console.log(1);
var start = Date.now();
setTimeout(function() {
    console.log(2);
}, 0);
setTimeout(function() {
    console.log(4, Date.now() - start);
}, 400);
Promise.resolve().then(function() {
    var sum = function(a, b) {
        return Number(a) + Number(b);
    }
    var res = [];
    for(var i=0; i<5000000; i++) {
        var a = Math.floor(Math.random()*100);
        var b = Math.floor(Math.random()*200);
        res.push(sum(a, b));
    }
    res = res.sort();
    console.log(3);
})
```

Promise.then中，先生成一个500万随机数的数组，然后对这个数组进行排序。运行这段代码可以发现：马上会输出1，稍等一会儿才会输出3，然后再输出2。不论等待多长时间输出3，2一定会在3的后面输出。这也就印证了eventloop中的第3步操作，必须等所有的微任务执行完毕后，才开始下一个宏任务。

同时，这段代码的输出很有意思：

```javascript
setTimeout(function() {
    console.log(4, Date.now() - start); // 4, 1380 电脑状态的不同，输出的时间差也不一样
}, 400);
```

本来要设定的是400ms后输出，但因为之前的任务耗时严重，导致之后的任务只能延迟往后排。也能说明，setTimeout和setInterval这种操作的延时是不准确的，这两个方法只能大概将任务400ms之后的宏任务中，但具体的执行时间，还是要看线程是否空闲。**若前一个任务中有耗时的操作，或者有无限的微任务加入进来时，则会阻塞下一个任务的执行**。

#### 2. async-await

从上面的代码中也能看到 Promise.then 中的代码是属于微服务，那么 async-await 的代码怎么执行呢？比如下面的代码：

```javascript
function A() {
    return Promise.resolve(Date.now());
}
async function B() {
    console.log(Math.random());
    let now = await A();
    console.log(now);
}
console.log(1);
B();
console.log(2);
```

其实，async-await 只是 Promise+generator 的一种语法糖而已。上面的代码我们改写为这样，可以更加清晰一点：

```javascript
function B() {
    console.log(Math.random());
    A().then(function(now) {
        console.log(now);
    })
}
console.log(1);
B();
console.log(2);
```

这样我们就能明白输出的先后顺序了： 1, 0.4793526730678652(随机数), 2, 1557830834679(时间戳);

#### 3. requestAnimationFrame

requestAnimationFrame也属于执行是异步执行的方法，但我任务该方法既不属于宏任务，也不属于微任务。按照[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)中的定义：

> `window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

requestAnimationFrame是GUI渲染之前执行，但在微服务之后，不过requestAnimationFrame不一定会在当前帧必须执行，由浏览器根据当前的策略自行决定在哪一帧执行。

#### 4. 总结

我们要记住最重要的两点：js是单线程和eventloop的循环机制。