import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutePaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerators";
import { facultyRoutePaths } from "./faculty.routes";
import { studentRoutePaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(adminRoutePaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routeGenerator(facultyRoutePaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(studentRoutePaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
export default router;
