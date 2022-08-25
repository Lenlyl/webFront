import React from "react";
import Child from "./child";
import Fun from "./fun";
// import WrapComponent from "./wrap";

export const Context = React.createContext();

export default class app extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 30,
            name: 'xiaoMin',
            count: 0
        }
    }

    componentDidMount() {

        this.setState({
            count: 1
        });
        console.log('count 1 :', this.state.count);

        this.setState({
            age: 40
        })

        this.setState({
            count: 2
        });
        console.log('count 2 :', this.state.count);

        setTimeout(() => {
            this.setState({
                count: 3
            });
            console.log('count 3 :', this.state.count);
            this.setState({
                count: 4
            });
            console.log('count 4 :', this.state.count);
        }, 0);
    }

    // static getDerivedStateFromProps(props, state) {
    //     console.log('app.js props:', props);
    //     console.log('app.js state:', state);
    //     console.log(1, "app.js 将props中的数据映射到state中去");
    //     return props;
    // }

    callBack = () => {
        let p1 = this.setState({ age: this.state.age + 1 });
        console.log(this.state.age);
        console.log(p1);
        console.dir(p1);

        setTimeout(() => {
            this.setState({ age: this.state.age + 1 });
            console.log(this.state.age);

            this.setState({ age: this.state.age + 1 });
            console.log(this.state.age);

        }, 0);

        this.setState({ age: this.state.age + 1 }, () => {
            console.log('*******');
            console.log(this.state.age);
            console.log('*******');
        });

        setTimeout(() => {
            console.log(this.state.age);
        }, 2000);
    }

    sleepTimeout = () => {
        setTimeout(() => {
            console.log('timeout 2000');
        }, 2000)

        // sleep(4000);

        console.log('end')
    }

    render = () => {
        console.log('render:', this.state.count);
        let { age, name } = this.state;

        return <div>
            <p>{'姓名：' + name + '\n' + '年龄：' + age}</p>
            <button onClick={() => {this.setState({age: this.state.age+1})}}>修改age +1</button>
            <Child age={age} name={name} />
            {/* <WrapComponent /> */}
            <button onClick={this.callBack}>setState</button>
            <p />
            <button onClick={this.sleepTimeout}>sleep timeout</button>
            <div id='di'>
                <div styled={"background: red"}></div>
                <div styled={"background: blue"}></div>
            </div>
            <p />
            <Context.Provider value={{name: 'lorrin', age: 30}}>
                <Fun age={age}/>
            </Context.Provider>
        </div>
    }
}