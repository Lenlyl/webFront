import { Component } from "react";
import "./child.css";

/*
  组件挂载阶段(mount): 从组件初始化--> 组件中的内容挂载到真实 DOM 中
    - constructor
    - static getDerivedStateFromProps(props,state) 
      - 注意 this 问题
    - render
    - componentDidMount -- 处理副作用(请求)
  组件更新阶段(update): 从组件开始更新(父组件更新或组件内调用了setState)-->组件完成 DOM 更新
    - static getDerivedStateFromProps(props, state)
    - shouldComponentUpdate()  -- 判断是否更新
    - render()
    - getSnapshotBeforeUpdate() 
    - componentDidUpdate() -- 处理副作用(请求)
  组件卸载阶段(unMount): 从组件开始卸载，到组件完全从DOM中删除 
*/
class Child extends Component {
  constructor(props) {
    super(props);
    console.log(0, "组件的实例化");
    this.state = {
      name: "kkb",
      age: props.age
    }
  }
  static getDerivedStateFromProps(props, newState) {
    // console.log(1, "将props中的数据映射到state中去");
    // console.log(props, newState);
    return newState;//将props的内容，映射到state中去
  }

  shouldComponentUpdate() {
    console.log('是否更新UI');
    return true;
  }

  componentDidMount() {
    console.log(3, "挂载完成");
    /*
      通常在该方法中处理副作用
      副作用:
        1. 数据请求
        2. DOM 获取
    */
  }

  afterYear = () => {
    let oldAge = this.state.age;
    this.setState({
      age: ++oldAge
    })
  }

  render() {
    console.log(2, "更新prosp和state生成虚拟DOM");
    //console.log(this.state);
    const { name, age } = this.state;

    return <div>child {name}
      <div id="box">
        <p>{age}</p>
        <button onClick={this.afterYear}>afterYear</button>
        <p>{name}</p>
        <p id="p">0</p>
        <p className="single_line">
          这是一行文字这是一行文字这是一行文字
          是一行文字这是一行文字这是一行文字
        </p>
        <p className="mulit_line">
          <span style={{fontSize: '12px'}}>这里是高度为150px的标签内的多行文字，文字大小为12像素。
            <br />这里是第二行，用来测试多行的显示效果
          </span>
          {/* <i>&nbsp;</i> */}
        </p>
      </div>
    </div>
  }

  getSnapshotBeforeUpdate(props, state) {
    console.log('获取更新之前的快照', props, state);
    return state;
  }
  componentDidUpdate(props, odlState) {
    console.log('componentDidUpdate', props, odlState);
    console.log('current state: ', this.state);
  }
}
export default Child;