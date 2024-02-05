import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminRoutePaths } from "../../routes/admin.routes";
import { facultyRoutePaths } from "../../routes/faculty.routes";
import { studentRoutePaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const user = useAppSelector(selectCurrentUser);

  let sidebarItems;
  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminRoutePaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemGenerator(facultyRoutePaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemGenerator(studentRoutePaths, userRole.STUDENT);
      break;
    default:
      break;
  }

  return (
    <div>
      <Sider
        style={{ borderRadius: "8px", height: "99vh" }}
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
          items={sidebarItems}
          //   items={sidebarItemGenerator(facultyRoutePaths, "faculty")}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
