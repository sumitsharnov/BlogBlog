import { Button, Navbar, TextInput } from "flowbite-react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const location = useLocation();

  return (
    <Navbar className="top-0 left-0 w-full border-b-2 z-50 mb-10 ">
      <NavLink
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl">
          {`Sumit's`}
        </span>
        <span className="p-1">Portfolio</span>
      </NavLink>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <NavLink to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </NavLink>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as="div">
          <NavLink
            to="/"
            className={
              location.pathname === "/" ? "border-b-4 border-purple-400" : ""
            }
          >
            Home
          </NavLink>
        </Navbar.Link>
        <Navbar.Link as="div">
          <NavLink
            to="/about"
            className={
              location.pathname === "/about"
                ? "border-b-4 border-purple-400"
                : ""
            }
          >
            About
          </NavLink>
        </Navbar.Link>
        <Navbar.Link as="div">
          <NavLink
            to="/projects"
            className={
              location.pathname === "/projects"
                ? "border-b-4 border-purple-400"
                : ""
            }
          >
            Projects
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
