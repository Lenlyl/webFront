import { Component } from "react";
/*
  state - 不可变值
    不可变值: 不能直接修改的值
    修改 state 唯一的方法是 调用 setState，不要直接修改原来的state而是给他返回一个 新得值（尤其注意当状态是一个引用类型的时候，要返回一个新的引用）
  - setState(updater, [callback])
    - updater: 更新数据 FUNCTION/OBJECT
          FUNCTION 必须有返回值，返回值使我们要修改的状态
    - callback: 更新成功后的回调 FUNCTION
    - 同步/异步: react通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
          - 批处理机制：在批处理机制下，setState 表现为异步，在非批处理的环境下 setState 表现为同步
          - 批处理环境下：(React 事件中，React 的生命周期函数中)
              同一个操作中，多次调用setState，会合并更新组件，也就是组件只会更新一次
          - 非批处理环境下：(异步方法中，DOM 事件中)
               同一个操作中，多次调用setState，每调用一次setState，组件都会更新一次
    - 浅合并 Objecr.assign()
    - 调用 setState 之后，会触发生命周期，重新渲染组件
*/
class App extends Component {
  state={
    nub: 1,
    count: 0
  }
  addCount=()=>{
    setTimeout(() => {
      // 非批处理环境
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count);
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count);
      this.setState({
        count: this.state.count + 1
      });
      console.log(this.state.count); 
    });
  }
  addNub=()=>{
    // 批处理环境下
    this.setState({
      nub: this.state.nub + 1
    },()=>{
      console.log("当前次 setState组件更新完成")
    });
    console.log(this.state.nub);
    this.setState({
      nub: this.state.nub + 1
    });
    console.log(this.state.nub);
    this.setState({
      nub: this.state.nub + 1
    });
    console.log(this.state.nub); 
  }
  render(){
    const {nub,count} = this.state;
    console.log("render");
    return <div>
      <p>{nub}</p>
      <button onClick={this.addNub}>递增nub</button>
      <p>{count}</p>
      <button onClick={this.addCount}>递增count</button>
    </div>
  }
}
export default App;