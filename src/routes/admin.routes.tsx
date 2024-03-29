import AcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment/AcademicDepartment";
import CreateAcademicDepartment from "../pages/Admin/AcademicManagement/AcademicDepartment/CreateAcademicDepartment";
import AcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty/AcademicFaculty";
import CreateAcademicFaculty from "../pages/Admin/AcademicManagement/AcademicFaculty/CreateAcademicFaculty";
import AcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester/AcademicSemester";
import CreateAcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester/CreateAcademicSemester";
import AllCourse from "../pages/Admin/AcademicManagement/Course/AllCourse";
import AllOfferCourse from "../pages/Admin/AcademicManagement/Course/AllOfferCourse";
import CreateCourse from "../pages/Admin/AcademicManagement/Course/CreateCourse";
import CreateOfferedCourse from "../pages/Admin/AcademicManagement/Course/CreateOfferedCourse";
import CreateSemesterRegistration from "../pages/Admin/AcademicManagement/SemesterRegistration/CreateSemesterRegistration";
import SemesterRegistration from "../pages/Admin/AcademicManagement/SemesterRegistration/SemesterRegistration";
// import CreateAcademicSemester from "../pages/Admin/AcademicManagement/AcademicSemester/CreateAcademicSemester";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import CreateAdmin from "../pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../pages/Admin/UserManagement/Student/CreateStudent";
import StudentDetails from "../pages/Admin/UserManagement/Student/StudentDetails";
import StudentTable from "../pages/Admin/UserManagement/Student/StudentTable";

export const adminRoutePaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "All Student",
        path: "all-student",
        element: <StudentTable />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Create Sem Register",
        path: "create-semester-register",
        element: <CreateSemesterRegistration />,
      },
      {
        name: "Semester Register",
        path: "semester-register",
        element: <SemesterRegistration />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "All Course",
        path: "all-course",
        element: <AllCourse />,
      },
      {
        name: "Create Offer Course",
        path: "create-offered-course",
        element: <CreateOfferedCourse />,
      },
      {
        name: "All Offer Course",
        path: "all-offered-course",
        element: <AllOfferCourse />,
      },
    ],
  },
];

// export const adminRoutes = adminRoutePaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);

// export const adminSidebarItems = adminRoutePaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }
//     return acc;
//   },
//   []
// );
