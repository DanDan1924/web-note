/*
 * @Author: your name
 * @Date: 2020-06-28 17:21:58
 * @LastEditTime: 2020-06-28 17:41:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/ES6/Es6.js
 */ 
let size = Symbol('size')
class Collection{
    constructor(){
        console.log('constructor',this)
        this[size] = 0
    }
    add(item) {
        console.log('add',this)
        this[this[size]] = item
        this[size] ++
    }
    static sizeOf(instance){
        // console('sizeOf',this)
        return instance[size]
    }
}
let x = new Collection();
Collection.sizeOf(x)

x.add('foo');
Collection.sizeOf(x) // 1


