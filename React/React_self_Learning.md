# 自信来自于熟练度(编程/面试)
一切面试题往readable, reusable, easy to maintain考虑

# ReactJS: 一个专注于UI的JS库
Vanilla_JS: 原生JS, 不依赖任何第三方库和框架, 执行DOM/BOM操作
node_JS: 操作server

jQuery: 更轻松和DOM交互/ajax请求
- 跨平台兼容
- 简化语法
- 缺点是不能处理大型应用

# 创建react项目
## Solution 1: 手动安装babel/webpack/react/react dom
```zsh
npm init -y
npm install react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin
```

*babel用于将新的js变成旧js*<br>
*webpack将模块打包, 输出最终文件*

## Solution 2: createt-react-app
```zsh
npx create-react-app my-app
cd my-app
npm start
```

Hot-reloading: 实时更新

# JSX, Component, Props, CSS
主流工具会解决每个人遇到的问题, 并且简单易用
React的知识点很少: JSX, Component, Props, State, Hooks, Context

## JSX
JSX的优势在于可复用/可维护, 而不是性能

### 为什么在JSX中需要import React from "react"
React 17和早期版本, jsx会转化成React.creatElement调用, 所以import React from "react"是必须的
为什么要消除这个需要? 可读/可复用

## Component：
组件是独立, 可复用的代码块 (封装/可复用/组合/状态管理)
一个JSX只能有一个component, 并且文件名和组件名要一致, 文件名和组件名要大写(区分组件和html元素)

Function component vs Class component

## Props:


# && vs if-else vs ?:
如果条件判断后面的statements有return -> 不需要else -> if + return
如果条件判断后面的statements有return -> 需要else -> ?:
如果条件判断后面的statements没有return -> 不需要else/ break/ continue -> &&
如果条件判断后面的statements没有return -> 需要else -> ?:

# 什么是好代码
可读 可维护 可复用 + solid原则
1. 不要copy/paste, 定义方法避免重复代码

# React是声明式语言(Imperative), 原生JS是命令式语言(Declarative)
- 命令式注重过程(因为html简单但不完整, 每次修改都是大改, 每个细节都要注意), 无法在团队合作中复用
- 声明式注重结果(html在一开始定义完整, 告诉结果是什么, 让组件自己实现, 逻辑和ui分离)
1. React隐藏了处理dom细节的过程, 思想是把UI都写完(HTML/CSS), 通过控制state变化, 实现appendChild, insertElementBefore这些原生js的dom操作
2. 原生js相当于HTML写主干, 直接操作DOM/BOM来修改HTML

# 只有函数式组件可以用hook, 要对不同hook有自己的理解
- useState: 添加状态, 返回一个数组
> 用户操作, 新数据对ui更改有直接关系, 应该用usestate<br>
> 遇到状态冲突, state lifting, 使得不同自组件同一个state 状态是同步的

- useEffect: 组件渲染后执行, 可以设置依赖数组 (useEffect的回调函数不带参数)
- useRef: 获得一个dom对象引用或者保存不会触发re-render的一个变量引用(一般配合useEffect使用, state有变化会触发render, 之后会执行useEffect)
当使用form时, 用useRef控制input dom的performance比用usestate更好
```tsx
import React, { useRef, useEffect } from 'react';

export default function ExampleComponent() {
  const inputRef = useRef();
  useEffect(() => inputRef.current.focus(), []); // []表示在组件挂载时运行
  return <input ref={inputRef} />;
}
```

- useMemo: `缓存变量的结果`, 当数据量大时, 提高计算的性能, 缓存计算的结果, 从而避免render时重新计算

```tsx
const memoizedValue = useMemo(() => {
    return expensiveCalculation();
}, [someProp]);
```

- useCallback: `缓存方法`, 在需要function作为useEffect的dependency array时使用. 或者父组件给自组件传递方法参数时创建. 利用自身dependcy array避免每次render时创建一次方法
const printName = useCallback(()=>
  console.log(`Name: ${name}`)
  , [name])

useEffect(()=>{
  console.log("In effect");
  printName()
  },[name])
```

