import { useHistory, useLocation, useParams, useRouteMatch, withRouter } from 'react-router-dom';
import {data} from '../../data';
const limit = 5;
/*
page: 
1, 0 - 5
2, 5 - 10
3, 10 - 15
*/
function List(props){
    let {type="good",page="1"} = useParams();
    page = Number(page);
    let start = (page-1)*limit;
    let end = start + limit;
    let nowData = data[type].filter((item,index)=>(index>=start&&index<end));
    //console.log(nowData);
    return <ul>
        {nowData.length > 0?nowData.map(item=><li key={item.id}>{item.title}</li>):"暂无数据"}
    </ul>
}

// console.log(useLocation());
// console.log(useHistory());
// console.log(useRouteMatch());
// console.log(useParams());
/*
    withRouter 高阶路由(高阶组件)
        使非路由组件，可以获取达到路由参数
*/
// const newList = withRouter(List);
// export default newList;
//export default withRouter(List);


export default List;
