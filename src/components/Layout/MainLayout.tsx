import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const { Header, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout
        style={{
          height: "100vh",
          paddingLeft: "6px",
          paddingTop: "4px",
          paddingBottom: "4px",
        }}
      >
        <Sidebar />
        <Layout>
          <Header
            style={{
              padding: "0px",
              marginBottom: "0px",
              marginTop: "0px",
              paddingTop: "0px",
              paddingBottom: "0px",
              background: "#99AAAB",
              marginLeft: "14px",
              marginRight: "14px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            University Management Project
          </Header>
          <Content style={{ margin: "16px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
          {/* <Footer
            style={{ textAlign: "center", margin: "0px", padding: "0px" }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer> */}
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
