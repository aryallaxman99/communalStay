import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="app-height px-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
