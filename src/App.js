import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { fetchUser } from "./components/utils/fetchUser";
import { useEffect } from "react";



const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let permisson = fetchUser();
    if (!permisson) navigate("/login");
  }, []);
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
