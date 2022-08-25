import { Component } from "react";
export default class Todo extends Component {
  render() {
    const {data,removeTodo} = this.props;
    const {id,date,title} = data;
    return <li>
      {date} - {title} - <button onClick={()=>{
        removeTodo(id);
      }}>删除</button>
    </li>
  }
}