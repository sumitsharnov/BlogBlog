import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import FooterComponent from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Header from "./components/Header";
import Communication from "./pages/Communication";
import PrivateRoutes from "./components/PrivateRoutes";
import UserProfile from "./pages/UserProfile";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "./services/user_api";
import { updateCurrentUser, clearSignInSuccess } from "./redux/user/userSlice";
import Cookies from "js-cookie";

export default function App() {
  const { currentUser, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser && currentUser._id && token) {
      const fetch = async () => {
        try {
          const res = await getUserInfo(currentUser._id, token);
          const userInfo = await res.json();
          dispatch(updateCurrentUser({ ...userInfo, token: token }));
        } catch (error) {
          dispatch(clearSignInSuccess());
          Cookies.set("timeout", "You have been logged out");
        }
      };
      fetch();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/communications" element={<Communication />} />
            </Route>
            {/* Catch all unmatched routes and redirect to the root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

const ScrollbarStyles = `
  /* Scrollbar Styles */
  ::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: transparent; /* color of the track */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888; /* color of the scroll thumb */
    border-radius: 6px; /* roundness of the scroll thumb */
    border: 3px solid transparent; /* creates padding around scroll thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* color of the scroll thumb on hover */
  }
`;

const style = document.createElement("style");
style.appendChild(document.createTextNode(ScrollbarStyles));
document.head.appendChild(style);
