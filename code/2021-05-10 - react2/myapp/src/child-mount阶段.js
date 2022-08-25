import { Component } from "react";
/*
  组件挂载阶段(mount): 从组件初始化--> 组件中的内容挂载到真实 DOM 中
    - constructor
    - static getDerivedStateFromProps(props,state) 
      - 注意 this 问题
    - render
    - componentDidMount -- 处理副作用(请求)
  组件更新阶段(update): 从组件开始更新(父组件更新或组件内调用了setState)-->组件完成 DOM 更新
    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate()  -- 判断是否更新
    - render()
    - getSnapshotBeforeUpdate() 
    - componentDidUpdate() -- 处理副作用(请求)
  组件卸载阶段(unMount): 从组件开始卸载，到组件完全从DOM中删除 
*/
class Child extends Component{
  constructor(props){
    super(props);
    console.log(0,"组件的实例化");
    this.state={
      name: "kkb"
    }
  }
  static getDerivedStateFromProps(props,state){
    //console.log(props,state);
    console.log(1,"将props中的数据映射到state中去");
    return props;//将props的内容，映射到state中去
  }
  componentDidMount(){
    console.log(3,"挂载完成");
    /*
      通常在该方法中处理副作用
      副作用:
        1. 数据请求
        2. DOM 获取
    */
  }
  render(){
    console.log(2,"更新prosp和state生成虚拟DOM");
    //console.log(this.state);
    return <div>child</div>
  }
}
export default Child;