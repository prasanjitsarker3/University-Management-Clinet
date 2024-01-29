import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";
const { Header, Content, Footer, Sider } = Layout;

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
        <Sider
          style={{ borderRadius: "8px" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div>
            <h1
              style={{
                color: "white",
                fontSize: "17px",
                textAlign: "center",
                paddingTop: "24px",
                paddingBottom: "8px",
              }}
            >
              UNIMAN DASH
            </h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={adminSidebarItems}
          />
        </Sider>
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
          <Footer
            style={{ textAlign: "center", margin: "0px", padding: "0px" }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
