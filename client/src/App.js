import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import { ToastContainer } from "react-toastify";
import { Error } from "./Containers/Pages/Error";
import Layout from "./Containers/Layout/Layout";
import Login from "./Containers/Auth/Login";
import IndexPage from "./Containers/IndexPage";
import Register from "./Containers/Auth/Register";
import UserDashboard from "./Containers/User/UserDashboard";
import Places from "./Containers/Places/Places";
import PlacesForm from "./Containers/Places/PlacesForm";
import PlacePage from "./Containers/Places/PlacePage";
import BookingPage from "./Containers/Places/BookingPage";
import ChangePassword from "./utils/ChangePassword";
import OTP from "./Containers/ResetPassword/OTP";
import EmailIdentification from "./Containers/ResetPassword/EmailIdentification";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="*" element={<Error />} />
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="identify" element={<EmailIdentification />} />
          <Route path="/identify/otp" element={<OTP />} />
          <Route path="/resetPassword" element={<ChangePassword />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/account/password" element={<ChangePassword />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </UserContextProvider>
  );
};

export default App;
