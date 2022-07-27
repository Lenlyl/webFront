import { Component } from "react";
import Child from "./child";
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
    age: 9,
    show:true
  }
  afterYear=()=>{
    this.setState({
      age: this.state.age + 1
    })
  }
  render() {
    const {show} = this.state;
    return <div>
      {show?<Child 
          age={this.state.age}
          afterYear={this.afterYear}
        />:""}
        <button onClick={()=>{
          this.setState({
            show:!show
          })
        }}>显示、隐藏</button>
    </div>
  }
}
export default App;