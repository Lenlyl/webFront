import { Component } from "react";
import Menu from "./menu";
import "./app.css";
import data from "./data";
/*
  React 组件间通信：
    React 是单向数据流设计，数据只能自上向下进行传递，也就是只能父级向子孙级传递信息
    父 --> 子组件：props
    子 --> 父组件: 在父级中定义回调方法，将回调传递给子级，子级调用父级的回调，向父级进行通信。
    兄 --> 弟: 将数据委托给父级进行管理
*/
class App extends Component {
  state = {
    openName:""
  }
  changeOpen=(openName)=>{
    this.setState({
      openName
    })
  }
  render() {
    const {openName} = this.state;
    return <div className="friend-list">
      {Object.keys(data).map((item,index)=><Menu 
        key={index} 
        data={data[item]} 
        name={item} 
        openName={openName} 
        changeOpen={this.changeOpen}
      />)}
    </div>
  }
}
export default App;