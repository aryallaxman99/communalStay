import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import Login from "./Containers/Auth/Login";
import IndexPage from "./Containers/IndexPage";
import Register from "./Containers/Auth/Register";
import { UserContextProvider } from "./UserContext";
import { Error } from "./Containers/Pages/Error";
import UserDashboard from "./Containers/User/UserDashboard";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Error />} />
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<UserDashboard />} />
          <Route path="/account/:subpage/:action" element={<UserDashboard />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
