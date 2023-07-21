import "./App.css";
import { UserContextProvider } from "./UserContext";
import { ToastContainer } from "react-toastify";
import Layout from "./Containers/Layout/Layout";

const App = () => {
  return (
    <UserContextProvider>
      <Layout />
      <ToastContainer position="top-center" autoClose={2000} />
    </UserContextProvider>
  );
};

export default App;
