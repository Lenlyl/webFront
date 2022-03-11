import {createStore} from "redux";

const reducer = (state={
    count: 1,
    name: "开课吧"
},action)=>{
    switch(action.type){
        case "add":
          return {
            ...state,  
            count: state.count + 1
          }
        case "mius":
            return {
              ...state,  
              count: state.count - 1
            }  
    }
    return state;
}


export default createStore(reducer);
