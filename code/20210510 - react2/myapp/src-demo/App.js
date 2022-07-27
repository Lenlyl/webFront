import { Component } from "react";
import AddTodo from "./addTodo";
import Todo from "./todo";
class App extends Component {
  state={
    todos:[
      {
        id: 1,
        date: "20210101",
        title:"事项1"
      },{
        id: 2,
        date: "20210101",
        title:"事项2"
      }
    ]
  }
  addTodo=(date,title)=>{
    const {todos} = this.state;
    this.setState({
      todos:[...todos,{
        id: Date.now(),
        date,
        title
      }]
    });
  }
  removeTodo=(id)=>{
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(item=>item.id !== id)
    });
  }
  render() {
    const {todos} = this.state;
    return <div>
        <h2>Todo</h2>
        <AddTodo 
          addTodo={this.addTodo}
        />        
        <ul>
          {
            todos.map(item=><Todo key={item.id} data={item} removeTodo={this.removeTodo} />)
          }
        </ul>
    </div>
  }
}
export default App;