import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
function App() {
  return (
    <div>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<NotFound />} />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
