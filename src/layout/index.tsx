import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderCom from "./header";
import SiderCom from "./sider";
// import FooterCom from "./footer";
import styles from "./index.module.less";

const { Header, Sider, Content } = Layout;

const LayoutCom: React.FC = () => {
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width="25%" className={styles.sider}>
          <SiderCom />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <HeaderCom />
          </Header>
          <Content>
            <Outlet />
          </Content>
          {/* <Footer>
            <FooterCom />
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutCom;
