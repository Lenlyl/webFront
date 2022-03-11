import { Component } from "react";

class App extends Component {
  componentDidMount(){
    console.log(this.refs);
  }
  render(){
    return <div ref="div">
        <h1 ref="h1">hello react</h1>
    </div>
  }
}

export default App;
