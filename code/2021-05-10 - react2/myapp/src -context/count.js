import { Component } from "react";
import context from "./context";
class Count extends Component {
  static contextType = context;
  render() {
    //console.log(this);
    const {count,addCount} = this.context;
    return <>
      <p>{count}</p>
      <button onClick={addCount}>递增count</button>
    </>
  }
}

export default Count