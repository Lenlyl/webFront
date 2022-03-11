import List from "./list";
import ListNav from "./listnav";
import Paginition from "./pagination";

function ListView(props){
    return <div>
        <h2>列表视图</h2>
        <ListNav />
        <List />
        <Paginition />
    </div>
}

export default ListView;
