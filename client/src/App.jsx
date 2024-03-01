import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import FooterComponent from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Header from "./components/Header";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  return (
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route  element={<PrivateRoutes />}>
                <Route path="/" element={<Home events={sampleEvents}/>} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
          <FooterComponent />
        </div>
      </BrowserRouter>
  );
}
