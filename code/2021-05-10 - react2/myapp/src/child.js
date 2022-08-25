import { Component } from "react";
/*
  组件挂载阶段(mount): 从组件初始化--> 组件中的内容挂载到真实 DOM 中
    - constructor
    - static getDerivedStateFromProps(props,state) 
      - 注意 this 问题
    - render
    - componentDidMount -- 处理副作用(请求)
  组件更新阶段(update): 从组件开始更新(父组件更新或组件内调用了setState)-->组件完成 DOM 更新
      prevProps, prevState 更新前的 props 和 state
      nextProps, nextState 更新后的 props 和 state

    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate()  -- 判断是否更新
    - render()
    - getSnapshotBeforeUpdate() -- 获取 DOM 更新前的快照
    - componentDidUpdate() -- 处理副作用(请求)
  组件卸载阶段(unMount): 从组件开始卸载，到组件完全从DOM中删除 
    componentWillUnmount 组件即将卸载
*/
class Child extends Component {
  state = {
    name: "kkb"
  }
  componentDidMount(){
    window.onresize=()=>{
        let p = document.querySelector("#p");
        p.innerHTML = window.innerWidth;
    };
  }
  componentWillUnmount(){
    console.log("组件间即将卸载");
    window.onresize = null;
  }
  render() {
    const {age,afterYear,name} = this.state;
    return <div id="box">
        <p>{age}</p>
        <button onClick={afterYear}>afterYear</button>
        <p>{name}</p>
        <p id="p">0</p>
    </div>
  }
}
export default Child;