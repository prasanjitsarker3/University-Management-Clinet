import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminRoutePaths } from "./admin.routes";
import { routeGenerator } from "../utils/routeGenerators";
import { facultyRoutePaths } from "./faculty.routes";
import { studentRoutePaths } from "./student.routes";
import ChangePassword from "../pages/ChangePassword";
import ProtectedRoute from "../components/Layout/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminRoutePaths),
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routeGenerator(facultyRoutePaths),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
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
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
]);
export default router;
