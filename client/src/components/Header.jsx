import { Button, Navbar, TextInput } from "flowbite-react";
import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
    const [activeLink, setActiveLink] = useState(() => {
        const activeStatus = localStorage.getItem('isActive');
        return activeStatus ? JSON.parse(activeStatus) : null;
      });
    useEffect(() => {
        localStorage.setItem('isActive', JSON.stringify(activeLink));
     }, [activeLink]);
  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl">
          BlogBlog
        </span>
      </Link>
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
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as = {'div'}>
          <Link
            className={
              activeLink === "Home"
                ? 'border-b-4 border-purple-400'
                : ""
            }
            onClick={() => setActiveLink("Home")}
            to="/"
          >
            Home
          </Link>
        </Navbar.Link>
        <Navbar.Link as = {'div'}>
          <Link
            className={
              activeLink === "About"
                ? 'border-b-4 border-purple-400'
                : ""
            }
            to="/about"
            onClick={() => setActiveLink("About")}
          >
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link  as = {'div'}>
          <Link
            className={
              activeLink === "Projects"
                ?'border-b-4 border-purple-400'
                : ""
            }
            to="/projects"
            onClick={() => setActiveLink("Projects")}
          >
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
