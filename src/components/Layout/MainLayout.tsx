import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";
const { Header, Content } = Layout;

const MainLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
  };
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px",
              marginBottom: "0px",
              marginTop: "0px",
              paddingTop: "0px",
              paddingBottom: "0px",
              background: "#99AAAB",
              marginLeft: "14px",
              marginRight: "14px",
              borderRadius: "8px",
            }}
          >
            <p className="pl-12 text-lg">University Management Project</p>
            <button
              onClick={handleLogout}
              className="bg-red-400 text-white border-none px-4 py-1 rounded-sm cursor-pointer font-bold mr-4"
            >
              logout
            </button>
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
