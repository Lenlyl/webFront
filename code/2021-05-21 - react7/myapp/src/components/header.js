import { Affix, Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {navs} from "../assets/config/navs.config"
import Nav from "./nav";
// import logo from "../assets/image/kkb.png";
function Header() {
    return <Affix offsetTop={0}>
        <Layout.Header>
            <Row className="wrap">
                <Col span={4}>
                    <h1 id="logo">
                        <Link to="/">
                            <img src={require("../assets/image/kkb.png").default} />
                        </Link>
                    </h1>
                </Col>
                <Col span={20}>
                    <Nav
                        navs={navs}
                        getkey={({ pathname }) => {
                            return navs.findIndex(item => {
                                if (item.isActive) {
                                    return item.isActive(pathname)
                                }
                                return item.path === pathname;
                            })
                        }}
                    />
                </Col>
            </Row>
        </Layout.Header>
    </Affix>
}

export default Header;
