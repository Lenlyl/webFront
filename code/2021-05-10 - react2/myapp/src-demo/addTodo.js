import { Component } from "react";
/*
  受控组件和非受控组件
  受控组件: 当我们想要在表单控件外获取或控制表单控件的状态(value,checked)，就可以将表单控件做出受控组件，也就是将 表单控件的状态和组件的状态进行绑定.
  非受控组件: 如果只是想要设置控件的初始状态，而非受控组件和组件的状态绑定，这时可以使用非受控组件 defaultChecked 和 defaultValue
*/
export default class AddTodo extends Component {
  state = {
    date: "",
    title: ""
  }
  render() {
    const { addTodo } = this.props;
    const { title, date } = this.state;
    return <div>
      <input
        type="date"
        value={date}
        onChange={({ target }) => {
          this.setState({
            date: target.value
          })
        }}
      />
      <input
        type="text"
        value={title}
        onChange={({ target }) => {
          this.setState({
            title: target.value
          })
        }}
      />
      <button onClick={() => {
        addTodo(date,title);
        this.setState({
            title: "",
            date:""
          })
      }}>添加</button>
      <br/>
      {/* <input type="text" defaultValue="123" /> */}
    </div>
  }
}