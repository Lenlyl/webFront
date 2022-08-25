import axios from "axios";
function updateCNode(dispatch,getState){
    dispatch({
        type: "cnode/loading"
    });
    const {cnode} = getState();
    axios.get(`https://cnodejs.org/api/v1/topics?page=1&tab=${cnode.type}&limit=10`)
    .then(res=>{
        dispatch({
            type:"cnode/update",
            data: res.data.data
        })
    })
}

export {updateCNode};
