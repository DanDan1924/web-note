/*
 * class组件拥有状态和生命周期，继承于compontent，实现render方法
 */
const { render } = require("react-dom")

 

//  声明周期：
// constructor
// componentWillMount(v7弃用)
render
componentDidMount

shouldComponentUpdate
componentWillUnmount


// componentWillUpdate(v7弃用)
render
// getSnapshotBeforeUpdate(prevProps, prevState) 
// 此声明周期的任何返回值都将作为参数传递给 componentDidUpdate(prevProps, prevState, snapshot)
componentDidUpdate

// componentWillReceiveProps(v7弃用)  父组件更新    ==>static getDerivedStateFromProps(props,state)，需要return
// 区别：后者在初次和之后的父组件更新都会被调用




// import React, { Component } from 'react';


// export default class classCompontent extends Component {
//     constructor(props){
//         super(props)
//         //  使用state属性维护状态
//         this.state = { date: new Date()}
//     }
//     componentDidMount(){
//         // 组件挂载之后
//         this.timerId = setInterval(() => {
//             this.setState({
//                 date: new Date()
//             })
//         }, 1000);
//     }
//     componentWillUnmount(){
//         // 组件卸载前
//         clearInterval(this.timerId)
//     }
//     componentDidUpdate(){
//         // 组件更新
//     }
//     render() {
//         return (
//             <div>
//                 {this.state.date.toLocaleDateString()}
//             </div>
//         );
//     }
// }

