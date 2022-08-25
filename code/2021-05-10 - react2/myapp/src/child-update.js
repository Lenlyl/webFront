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
*/
class Child extends Component {
  state = {
    name: "kkb"
  }
  static getDerivedStateFromProps(nextProps, nextState){
    console.log(1,"将props中的数据映射到state中去");
    return nextProps;
  }
  shouldComponentUpdate(nextProps, nextState){
    //console.log(this.props,this.state); // 这个函数中，props 和 state 还是 更新前的
    console.log(2,"判断组件是否需要更新");
    return true;// true 继续更新组件，false 终止组件更新
  }
  getSnapshotBeforeUpdate(prevProps,prevState){
    //console.log(this.props,this.state);
    // 已经生成了新的虚拟DOM，即将更新真实DOM
    // 用户获取DOM更新前的快照
    let box = document.querySelector("#box");
    return box.innerHTML;
  }
  componentDidUpdate(prevProps,prevState,prevDOM){
      console.log(prevDOM);
  }
  render() {
    const {age,afterYear,name} = this.state;
    console.log(3,"render");
    return <div id="box">
        <p>{age}</p>
        <button onClick={afterYear}>afterYear</button>
        <p>name</p>
    </div>
  }
}
export default Child;