import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";
import Contact from "./Components/Contact";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Layout from "./Layout/Layout";
import User from "./Pages/User";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route element = {<ProtectedRoute/>}>
      <Route element ={<Layout/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/students" element={<Students />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/users" element = {<User/>}/>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;