
import AdminLogin from "./Components/Adminstrator/Administrator/AdminLogin"
import Dashboard from "./Components/Adminstrator/Administrator/Dashboard";
import Home from "./Components/UserInterface/Home";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes >
       

          <Route  element={<AdminLogin/>} path="/adminlogin" />
          <Route  element={<Dashboard/>} path="/dashboard/*" />
          <Route  element={<Home/>} path="/home" />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
