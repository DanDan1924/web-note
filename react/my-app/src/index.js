/*
 * @Author: your name
 * @Date: 2020-06-19 16:07:48
 * @LastEditTime: 2020-06-28 14:50:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/react/my-app/src/index.js
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import styles from './index.module.css'
// import ClassComponent from './compontents/classCompontent'
// import FunCompontent from './compontents/funCompontent'
import CompontentsFix from './compontentsfix/CompontentsFix'; 
import  ReduxPage  from './store/ReduxPage'; //redux
// import store from './store/';
// import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    {/* 组件 */}
    {/* <App /> */}
    {/* <ClassComponent /> */}
    {/* <FunCompontent /> */}
    {/* <CompontentsFix></CompontentsFix> */}
    <ReduxPage></ReduxPage>
  </React.StrictMode>,
  document.getElementById('root')
);

// /* 
//   *
//   *jsx
//   * 
//  */
// const name = 'Henney'
// // const ele = <h1>hellow, {name+1}</h1>
// const obj = {
//   fistName: "Harry",
//   lastName: "Potter"
// };
// function formatName(name) {
//   return name.fistName + " " + name.lastName;
// }
// const greet = <div>good</div>;
// const a = [0, 1, 2]
// const jsx = (
//   <div className={styles.app}>
//     <div>hello, {name}</div>
//     <div>{formatName(obj)}</div>
//     <ul>
//       {/* diff 的时候，首先比较type，然后是key，所以，同级同类型元素，key值必须得是唯一的 */}
//       {
//         a.map(item => (
//           <li key={item}>{item}</li>
//         ))
//       }
//     </ul>
//     <div className={styles.logo} style={{fontSize: '40px'}}>{name}</div>
//   </div >
// );
// ReactDOM.render(jsx, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
