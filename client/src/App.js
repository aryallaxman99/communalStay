import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Containers/Layout/Layout";
import Login from "./Containers/Auth/Login";
import IndexPage from "./Containers/IndexPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
