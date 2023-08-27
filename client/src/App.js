import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexScreen from "./screens";
import OrderScreen from "./screens/form";
import AuthScreen from "./screens/auth";
import { useAuth } from "./services/authContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexScreen />} />
        {isAuthenticated && <Route path="/order" element={<OrderScreen />} />}
        <Route path="/session/oauth/google" element={<AuthScreen />} />
      </Routes>
    </div>
  );
}

export default App;
