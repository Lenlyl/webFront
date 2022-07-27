import Count from "./count";
import Nub from "./nub";
/*
  函数式组件：（无状态组件，纯渲染组件）
    function 组件名(props){
        return 要 render 的内容
    }
*/
function Child() {
  return <>
    <Count/>
    <Nub/>
  </>
}

export default Child;