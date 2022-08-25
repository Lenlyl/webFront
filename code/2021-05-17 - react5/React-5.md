# redux - 状态管理容器

# 上节课内容回顾

hooks：
    useState - 状态
    useEffect - 副作用
    useRef - 关联实例或跨更新阶段传递数据
    useMemo
    useCallback
    memo



# 课程目标
- 掌握自定义 hooks
- 掌握 redux 三大原则
- 掌握 redux 基础使用
- 掌握 react-redux 使用
- 掌握 redux-thunk 使用  

# redux
- Redux 是一个独立的 JavaScript 状态管理库，不依赖于任何其他库
- https://www.redux.org.cn/

# 安装 Redux
npm i redux
yarn add redux

# 课程内容

### 核心概念

理解 Redux 核心几个概念与它们之间的关系

- state 状态
- reducer 纯函数 - 提供修改状态的方法
- store 仓库 - 管理状态
- action 动作 - 对 state 的修改动作

#### state 对象

通常我们会把应用中的数据存储到一个对象树（Object Tree） 中进行统一管理，我们把这个对象树称为：state

##### state 是只读的

这里需要注意的是，为了保证数据状态的可维护和测试，不推荐直接修改 state 中的原数据

##### 通过纯函数修改 state

什么是纯函数？

###### 纯函数

1. 相同的输入永远返回相同的输出
2. 不修改函数的输入值
3. 不依赖外部环境状态，只依赖其参数
4. 无任何副作用

使用纯函数的好处

1. 便于测试
2. 有利重构

#### action 对象

我们对 state 的修改是通过 reducer 纯函数来进行的，同时通过传入的 action 来执行具体的操作，action 是一个对象

- type 属性 : 表示要进行操作的动作类型，增删改查……
- payload属性 : 操作 state 的同时传入的数据

但是这里需要注意的是，我们不直接去调用 Reducer 函数，而是通过 Store 对象提供的 dispatch 方法来调用

#### Store 对象

为了对 state，Reducer，action 进行统一管理和维护，我们需要创建一个 Store 对象

## redux 三大原则

- 单一数据源: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中

- state 是只读的: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象

- 使用纯函数来执行修改


## redux API
- createStore(reducer, [preloadedState], enhancer); 
    - reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
    - [preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 - reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
    - enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。
    - 返回值 (Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。
- reducer 
    - reducer(state,action)
- Store 
    - getState()
    - dispatch(action)
    - subscribe(listener)
    - replaceReducer(nextReducer)

- combineReducers(reducers)
    将 reducer 函数拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分

- applyMiddleware(...middlewares) 中间件

## react-redux 
react项目中的 redux 绑定库
- 安装：npm i react-redux
- <Provider store>
- connect() -- 高阶函数:传入数据，返回一个函数
- useDispatch 获取 dispatch
- useStore 获取 store
- useSelector 获取 state 


## 中间件
更新的过程中，去做一些其他的事情，
dispatch ---> reducer 更新state
dispatch --> 中间件 --> reducer


## 异步操作中间件
- redux-thunk
    - 参数是对象，直接调用 reducer 修改我们的 state
    - 参数是函数，调用该函数，并且把 dispatch 和 getState 传递我们的函数，可以在函数中，进行异步操作

# 总结

# 下节课内容

react-router

# 作业
任务1：参加直播课，学习时长需>=60%

- 基于 Redux 和 函数组件 及 hooks 重新实现 ToDoList 案例
- todoList 案例实现细节如下  
    - 添加 todo
    - 点击复选框修改todo状态
    - 双击todo可以对todo进行编辑
    - 汇总todo（总条数，完成多少项）
    - 点击删除按钮，删除当前todo
    - 点击删除已完成项
































