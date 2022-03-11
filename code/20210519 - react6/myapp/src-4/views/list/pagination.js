import { Link, useParams } from 'react-router-dom';
import {data} from '../../data';
const limit = 5;
function Paginition(){
    let {type="good",page="1"} = useParams();
    let nowData = data[type];
    let pageLen = Math.ceil(nowData.length/limit);
    let render = ()=>{
        let child = [];
        for(let i = 1; i <= pageLen; i++){
            if(i == page){
                child.push(<span key={i}>{i}</span>)
            } else {
                child.push(<Link to={`/list/${type}/${i}`} key={i}>{i}</Link>)
            }
        }
        return child;
    }
    return <nav className="pagination">
        {render()}
    </nav>
}
export default Paginition;
