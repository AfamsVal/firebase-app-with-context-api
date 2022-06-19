import { Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import Dashboard from "./pages/Dashboard";
import ForgotPwd from "./pages/forgot-pwd/ForgotPwd";
import Gallery from "./pages/gallery/Gallery";
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
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/forgot-pwd" element={<ForgotPwd />} />
          <Route path="/register" element={<Register />} />
          <Route element={<NotFound />} />
        </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
