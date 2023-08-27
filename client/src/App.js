import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import IndexScreen from "./screens";
import OrderScreen from "./screens/form";
import AuthScreen from "./screens/auth";
import { useContext } from "react";
import { authContext } from "./services/authContext";
import OrderHistory from "./screens/orderhistory";

function App() {
  const { isAuthenticated } = useContext(authContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexScreen />} />
        {isAuthenticated && (
          <>
            <Route path="/order" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
          </>
        )}
        <Route path="/session/oauth/google" element={<AuthScreen />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
