import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./component/Navbar";
import AdminNav from "./component/AdminNav";
import Home from "./pages/user/Home";
import AdminHome from "./pages/admin/AdminHome";
import Applications from "./pages/admin/Applications";
import UserLoanLists from "./pages/user/UserLoanLists";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="my-loans" element={<UserLoanLists />} />
          </Route>

          <Route path="/admin" element={<AdminNav />}>
            <Route index element={<AdminHome />} />
            <Route path="applications" element={<Applications />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
