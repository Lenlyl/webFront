import { Component } from "react";
import { Consumer } from "./context"
class Nub extends Component {
  render() {
    return <Consumer>
      {
        ({ nub, addNub }) => {
          return <><p>{nub}</p>
          <button onClick={addNub}>递增nub</button></>
        }
      }
      {/* */}
    </Consumer>
  }
}

export default Nub