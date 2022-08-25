import React, { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import './fun.css'
// import { Context } from "./app";

// function func(props) {

//     const {age} = props;
//     console.log(`&&&&&&&&&&&&&&&&&&&    ${age}`);
//     //     const value = useContext(Context);
//     //     console.log(value);

//     //     const dom = useRef(false);
//     //     // console.log(dom);

//     //     const [name, setName] = useState('lorrin');
//     //     const [age, setAge] = useState(20);

//     // // useMemo

//     //     useEffect(() => {
//     //         // (async () => {
//     //         //     console.log('useEffect: ', age);
//     //         // })()
//     //         console.log('useEffect: ', age);

//     //         return function () {
//     //             console.log('effect unmonut');
//     //             // console.log(dom);
//     //         }
//     //     }, [age])

//     //     return (
//     //         <div>
//     //             {/* {selectList} */}
//     //             <p />
//     //             {`年龄：${age}`}
//     //             <button ref={dom} onClick={() => { setAge(age + 1) }}>点击年龄+1</button>
//     //         </div>
//     //     )

//     const [number, setNumber] = useState(0)

//     const newLog = useMemo(() => {
//         console.log('useMemo init');
//         const log = () => {
//             /* 点击span之后 打印出来的number 不是实时更新的number值 */
//             console.log(number)
//         }
//         return log
//         /* [] 没有 number */
//         /*只执行 一次 */
//     }, [])

//     return <div>
//         <div onClick={() => newLog()} >打印</div>
//         <p>{number}</p>
//         <span onClick={() => setNumber(number + 1)} >增加</span>
//     </div>
// }

// export default memo(func)



// function classHOC(WrapComponent){
//     return class  Idex extends React.Component{
//         state={
//             name:'alien'
//         }
//         componentDidMount(){
//            console.log('HOC')
//         }
//         render(){
//             return <WrapComponent { ...this.props }  { ...this.state }   />
//         }
//     }
// }
// function Index(props){
//   const { name } = props
//   useEffect(()=>{
//      console.log( 'index' )
//   },[])
//   return <div>
//     hello,world , my name is { name }
//   </div>
// }

// export default classHOC(Index)



// function classHOC(WrapComponent){

//     console.log('classHOC render: ');

//     return class  Idex extends React.Component{
//         constructor(){
//           super()
//           this.state={
//             name:'alien'
//           }
//         }
//         changeName(name){
//           this.setState({ name })
//         }
//         render(){
//             console.log('Idex render');
//             return <WrapComponent { ...this.props }  { ...this.state } changeName={this.changeName.bind(this)  }  />
//         }
//     }
//   }
//   function Index(props){
//     const [ value ,setValue ] = useState(null)
//     const { name ,changeName } = props
//     console.log('Index render');
//     return <div>
//       <div>   hello,world , my name is { name }</div>
//       改变name <input onChange={ (e)=> setValue(e.target.value)  }  />
//       <button onClick={ ()=>  changeName(value) }  >确定</button>
//     </div>
//   }

//   export default classHOC(Index)



/**实现一个动态挂载组件的HOC */
// function renderHOC(WrapComponent){
//     return class Index  extends React.Component{
//         constructor(props){
//           super(props)
//           this.state={ visible:true }  
//         }
//         setVisible(){
//            this.setState({ visible:!this.state.visible })
//         }
//         render(){
//            const {  visible } = this.state 
//            return <div className="box"  >
//              <button onClick={ this.setVisible.bind(this) } > 挂载组件 </button>
//              { visible ? <WrapComponent { ...this.props } setVisible={ this.setVisible.bind(this) }   />  : <div className="icon" ><SyncOutlined spin  className="theicon"  /></div> }
//            </div>
//         }
//     }
//   }

//   class Index extends React.Component{
//     render(){
//       const { setVisible } = this.props
//       return <div className="box" >
//           <p>hello,my name is alien</p>
//           <img  src='/Users/lorrin/webFront/code/20210510 - react2/test/public/logo512.png'   /> 
//           <button onClick={() => setVisible()}  > 卸载当前组件 </button>
//       </div>
//     }
//   }
//   export default renderHOC(Index)


/**分片渲染 */
const renderQueue = []
let isFirstrender = false

const tryRender = () => {
    const render = renderQueue.shift()
    if (!render) return
    setTimeout(() => {
        render() /* 执行下一段渲染 */
    }, 1000)
}
/* HOC */
function renderHOC(WrapComponent) {
    return function Index(props) {
        const [isRender, setRender] = useState(false)
        useEffect(() => {
            renderQueue.push(() => {  /* 放入待渲染队列中 */
                setRender(true)
            })
            if (!isFirstrender) {
                tryRender() /**/
                isFirstrender = true
            }
        }, [])
        return isRender ? <WrapComponent tryRender={tryRender}  {...props} /> : <div className='box' >加载中……</div>
    }
}
/* 业务组件 */
class Index extends React.Component {
    componentDidMount() {
        const { name, tryRender } = this.props
        /* 上一部分渲染完毕，进行下一部分渲染 */
        tryRender()
        console.log(name + '渲染')
    }
    render() {
        return <div id="name">
            <label>{this.props.name}</label>
        </div>
    }
}
/* 高阶组件包裹 */
const Item = renderHOC(Index)

export default function fun() {
    return <React.Fragment>
        <Item name="组件一" />
        <Item name="组件二" />
        <Item name="组件三" />
    </React.Fragment>
}