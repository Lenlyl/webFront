# hooks 
## 本节课重点内容
### 函数式组件
- 函数式组件，本质就是一个常规函数，接收一个参数 props 并返回一个 reactNodes
- 函数式组件中没有this和生命周期函数,不能使用 string ref
- 使用函数式组件时，应该尽量减少在函数中声明子函数，否则，组件每次更新时都会重新创建这个函数

### React hooks(钩子)
React hooks 是React 16.8中的新增功能。它们使您无需编写类即可使用状态和其他React功能

### 常用 hook
- useState  
    `const [state, setState] = useState(initialState);`
            const [状态,修改该状态的方法] = useState(初始值);
            1. 在同一个组件中可以使用 useState 定义多个状态
            2. 注意 useState 返回的 setState 方法，不会进行对象合并
            3. 注意 useState 返回的 setState 方法同样是异步方法

- useEffect
    类组件
        componentDidMount、componentDidUpdate 和 componentWillUnmount
    需要清除的副作用 

- useRef
    用户关联原生DOM节点，或者用来记录组件更新前的一些数据

- useMemo
    const data = useMemo(cb,[]);

- useCallback

### Memo
React.memo(Component, [areEqual(prevProps, nextProps)]);

#### Hook 使用规则
- 只在 React 函数中调用 Hook
    - React 函数组件中
    - React 自定义 Hook 中
- 只在最顶层使用 Hook 


# 练习
- 基于给定视图基于函数组件和hooks完成购物车效果
    1. 新添加商品 件数默认为 1
    2. 汇总时，只汇总件数>=1 的商品


下节课内容：
1. 自定义 hooks
