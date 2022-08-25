import {Layout} from "antd"
import { indexNavs } from "../../../assets/config/navs.config";
import Nav from "../../../components/nav";
import qs from "qs";

function HomeView() {
  return <>
    <Layout.Content  className="page-content">
        <Nav 
            navs={indexNavs}
            theme="light"
            getkey={({search})=>{
              const {tab="all"} = qs.parse(search.slice(1));
              return indexNavs.findIndex(item=>{
                  return qs.parse(item.path.slice(2)).tab === tab;
              })
            }}
        />
    </Layout.Content>
    <Layout.Sider className="page-sider">
      侧边栏
    </Layout.Sider>
  </>
}
export default HomeView;
