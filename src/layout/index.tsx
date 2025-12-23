import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCom from "./header";
import SiderCom from "./sider";
// import FooterCom from "./footer";
import styles from "./index.module.less";
import { KeepAlive } from "../KeepAlive";

const { Header, Sider, Content } = Layout;

const LayoutCom: React.FC = () => {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width="20%" className={styles.sider}>
          <SiderCom />
        </Sider>
        <Layout>
          <KeepAlive>
            <Header className={styles.header}>
              <HeaderCom />
            </Header>
            <Content className={styles.content}>
              <Outlet />
            </Content>
          </KeepAlive>

          {/* <Footer>
            <FooterCom />
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutCom;
