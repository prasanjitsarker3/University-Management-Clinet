import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoute from "./components/Layout/ProtectedRoute";

const App = () => {
  return (
    <div>
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    </div>
  );
};

export default App;
