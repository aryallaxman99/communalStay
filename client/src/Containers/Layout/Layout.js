import { Route, Routes } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { Error } from "../Pages/Error";
import IndexPage from "../IndexPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import EmailIdentification from "../ResetPassword/EmailIdentification";
import OTP from "../ResetPassword/OTP";
import ChangePassword from "../../utils/ChangePassword";
import UserDashboard from "../User/UserDashboard";
import Places from "../Places/Places";
import PlacesForm from "../Places/PlacesForm";
import PlacePage from "../Places/PlacePage";
import BookingPage from "../Places/BookingPage";
import PlaceAddressPlot from "../../Components/maps/PlaceAddressPlot";
import AnyWeekPlaces from "../Places/AnyWeekPlaces";
import SearchResultPage from "../Places/SearchResultPage";
import ReservedPlaces from "../Pages/ReservedPlaces";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="app-height px-24">
        <UserRoutes />
      </div>
    </div>
  );
};

export default Layout;

export const UserRoutes = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
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
        <Route path="/listings/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingPage />} />
        <Route path="/places/map" element={<PlaceAddressPlot />} />
        <Route path="/place/anyweek" element={<AnyWeekPlaces />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/account/request" element={<ReservedPlaces />} />
      </Routes>
    </div>
  );
};
