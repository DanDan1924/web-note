/*
 * @Author: your name
 * @Date: 2020-06-23 19:52:06
 * @LastEditTime: 2020-06-26 17:03:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/react/my-app/src/store/ReduxPage.js
 */ 
import React, { Component } from 'react';
import store from '../store/index';

class ReduxPage extends Component {
    componentDidMount(){
        store.subscribe(()=>{
            console.log('state发生变化了');
            this.forceUpdate();//强制刷新（方法一）
            // 也可以再index.js里面调用store.subscribe，然后在里面render
        })
    }
    render() {
        console.log('store',store);
        // subscribe :订阅：当state变化时同同志vue
        return (
            <div>
                <h1>ReduxPage</h1>
                <p>{store.getState()}</p>
                <button onClick={()=>store.dispatch({type:'ADD'})}>加</button>
            </div>
        );
    }
}

export default ReduxPage;

// 所有数据存在store
// 视图要更新的话要调用dispatch方法，传递action（对象）
// 拿到当前的action和state之后，reducer返回一个新的state  new state
// store 里面是数据发生改变可以通过订阅（subscribe）知道

/**
 * 
subscribe  :订阅
dispatch : 跟新视图时用
replaceReducer
getState：得到state
Symbol
forceUpdate:强制更新
 * 
 * 
 */



