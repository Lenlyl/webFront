import React from "react";
import Child from "./child";

export default class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 30,
            name: 'xiaoMin'
        }
    }

    static getDerivedStateFromProps (props, state) {
        console.log('app.js props:', props);
        console.log('app.js state:', state);
        console.log(1,"app.js 将props中的数据映射到state中去");
        return props;
    }

    render = () => {

        const { age, name } = this.state;

        return <div>
            <p>{'姓名：'+ name + '\n'+ '年龄：' + age}</p>
            <Child age={age} name={name}/>
        </div>
    }
}