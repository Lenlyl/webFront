import React from "react";
import HOC from "./hoc";


class wrapComponent extends React.Component {
    say() {
        const { name } = this.props
        console.log(name)
    }

    render() {
        return <div> hello,world <button onClick={this.say.bind(this)} >点击</button>  </div>
    }
}

export default wrapComponent;