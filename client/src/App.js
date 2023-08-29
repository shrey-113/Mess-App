import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexScreen from "./screens";
import OrderScreen from "./screens/form";
import AuthScreen from "./screens/auth";
import { useContext } from "react";
import { authContext } from "./services/authContext";
import OrderHistory from "./screens/orderhistory";
import ManagementAdmin from "./screens/managementAdmin";
import MessAdmin from "./screens/messAdmin";

function App() {
  const { isAuthenticated, type } = useContext(authContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexScreen />} />

        {isAuthenticated && type === "Student" && (
          <>
            <Route path="/order" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </>
        )}

        {isAuthenticated && type === "Mess" && (
          <>
            <Route path="/admin/mess" element={<MessAdmin />} />
          </>
        )}

        {isAuthenticated && type === "Admin" && (
          <>
            <Route path="/admin/management" element={<ManagementAdmin />} />
          </>
        )}

        <Route path="/session/oauth/google" element={<AuthScreen />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
