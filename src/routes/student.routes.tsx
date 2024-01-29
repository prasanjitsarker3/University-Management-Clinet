import OfferedCourse from "../pages/Faculty/OfferedCourse";
import StudentDashboard from "../pages/Student/StudentDashboard";

export const studentRoutePaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
