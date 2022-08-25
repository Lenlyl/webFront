import {Layout} from "antd";
import Header from "./components/header";
import RootRouter from "./routers";
// 根组件
function App(){
  return <Layout className="page">
      <Header/>
      <Layout className="wrap page-main">
          <RootRouter />
      </Layout>
      <Layout.Footer className="footer">这是页面底部</Layout.Footer>
  </Layout>
}

export default App;
