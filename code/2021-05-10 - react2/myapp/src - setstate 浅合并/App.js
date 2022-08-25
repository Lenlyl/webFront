import { Component } from "react";
/*
  state - 不可变值
    不可变值: 不能直接修改的值
    修改 state 唯一的方法是 调用 setState，不要直接修改原来的state而是给他返回一个 新得值（尤其注意当状态是一个引用类型的时候，要返回一个新的引用）
  - setState(updater, [callback])
    - updater: 更新数据 FUNCTION/OBJECT
          FUNCTION 必须有返回值，返回值使我们要修改的状态
    - callback: 更新成功后的回调 FUNCTION
    - 同步/异步:react通常会集齐一批需要更新的组件，然后一次性更新来保证渲染的性能
    - 浅合并 Objecr.assign()
    - 调用 setState 之后，会触发生命周期，重新渲染组件
*/
class App extends Component {
  state={
    nub: 1,
    count: 0,
    data:{
      i: 10,
      j: 20
    }
  }
  addCount=()=>{
    const {count} = this.state;
    this.setState(()=>{
      return {
        count: count + 5
      }
    });
  }
  addNub=()=>{
    const {nub} = this.state;
    this.setState({
      nub: nub + 1
    });
  }
  addI=()=>{
    const {data} = this.state;
    this.setState({
      data: {
        ...data,
        i: data.i + 3
      }
    });
  }
  render(){
    const {nub,count,data} = this.state;
    const {i,j} = data;
    return <div>
      <p>{nub}</p>
      <button onClick={this.addNub}>递增nub</button>
      <p>{count}</p>
      <button onClick={this.addCount}>递增count</button>
      <p>{i}</p>
      <button onClick={this.addI}>递增i</button>
      <p>{j}</p>
    </div>
  }
}
export default App;