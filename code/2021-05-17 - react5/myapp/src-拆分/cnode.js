import CNodeNav from "./conde-nav";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { updateCNode } from "./actions";

function CNode(){
   const {type,list,loading} = useSelector(state=>state.cnode);
   const dispatch = useDispatch();
   useEffect(()=>{
        dispatch(updateCNode);
   },[type]);
   return <div>
       <CNodeNav 
           type={type}
       />
       <ul>
            {loading?"正在请求数据……":list.map(item=><li key={item.id}>{item.title}</li>)}
       </ul>
   </div> 
}

export default CNode;
