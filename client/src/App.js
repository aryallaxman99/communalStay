import "./App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import Login from "./Containers/Auth/Login";
import IndexPage from "./Containers/IndexPage";
import Register from "./Containers/Auth/Register";
import { UserContextProvider } from "./UserContext";
import { Error } from "./Containers/Pages/Error";
import UserDashboard from "./Containers/User/UserDashboard";
import Places from "./Containers/Places/Places";
import PlacesForm from "./Containers/Places/PlacesForm";
import Account from "./Containers/User/Account";

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
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/account/bookings" element={<Account />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
