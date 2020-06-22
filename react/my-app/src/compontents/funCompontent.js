/*
 * @Author: your name
 * @Date: 2020-06-19 17:28:32
 * @LastEditTime: 2020-06-19 18:52:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /web/react/my-app/src/compontents/funCompontent.js
 */ 
// 函数组件通常无状态，仅关注内容展示，返回渲染结果即可
// 注：从16.8引入hooks开始，函数组件也能够拥有状态
import React, { useState, useEffect } from "react";
export default function FunctionComponent(props) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {//副作⽤
        const timer = setInterval(() => {
        setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);//组件卸载的时候执⾏
        });
    return (
        <div>
        <h3>FunctionComponent</h3>
        <p>{date.toLocaleTimeString()}</p>
        </div>
    );
}
 
 