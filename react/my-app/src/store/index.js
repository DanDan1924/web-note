/*
 * @Author: your name
 * @Date: 2020-06-26 16:20:07
 * @LastEditTime: 2020-06-26 16:53:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/react/my-app/src/store/index.js
 */ 
import { createStore } from  "redux"
// 定义state的初始化和修改规则  reducer是纯函数
function counterReducer(state=0, action){
    console.log('state',state);
    switch(action.type){
        case 'ADD':
            return state+1;
        case 'MUNUS':
            return state-1;
        default:
            return state;            
    }
}

const store = createStore(counterReducer)

export default store
