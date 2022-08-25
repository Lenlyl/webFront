import { useDispatch } from "react-redux";

const navsData = [{
    type:"all",
    title:"全部"
},{
    type:"good",
    title:"精华"
},{
    type:"ask",
    title:"问答"
},{
    type:"job",
    title:"招聘"
}];

function CNodeNav({type}){
    const dispatch = useDispatch();
   return <nav>
    {navsData.map(item=>{
        return <button 
            key={item.type} 
            style={{
                background: type === item.type?"red":"none"
            }}
            onClick={()=>{
                dispatch({
                    type:"cnode/type",
                    tab:item.type
                })
            }}
        >{item.title}</button>
    })}
   </nav> 
}

export default CNodeNav;
