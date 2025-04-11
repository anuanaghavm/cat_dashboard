import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";
import { BiHome, BiGridAlt, BiBook, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { BsBarChart, BsInfoCircle, BsNewspaper, BsBookmark, BsBoxSeam, BsCardList, BsFolder } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openSections, setOpenSections] = useState({
    blog: false,
    form: false,
    preferredPrograms: false,
    seo: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const navItemStyle = (path) => ({
    fontSize: "15px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: location.pathname === path ? "600" : "400",
    backgroundColor: location.pathname === path ? "#ffffff" : "transparent",
    color: location.pathname === path ? "black" : "inherit",
    borderRadius: "8px",
    transition: "all 0.3s",
  });

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: "250px",
        backgroundColor: "#000046",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        padding: "20px 10px",
      }}
    >
      <div className="text-center mb-4">
        <img
          src={logoSrc}
          alt="Logo"
          className="img-fluid"
          style={{ height: "60px", borderRadius: "10px", background: "white", padding: "5px" }}
        />
      </div>

      <ul className="nav flex-column text-white">

        {/* Home */}
        <li className="nav-item">
          <div
            className="nav-link d-flex align-items-center gap-2"
            style={navItemStyle("/home")}
            onClick={() => navigate("/home")}
          >
            <BiHome size={18} />
            Home
          </div>
        </li>

        {/* Dashboard */}
        <li className="nav-item">
          <div
            className="nav-link d-flex  align-items-center gap-2"
            style={navItemStyle("/slot")}
            onClick={() => navigate("/slot")}
          >
            <BiGridAlt size={18} />
            Slot Time
          </div>
        </li>

        {/* About us */}
        <li className="nav-item">
          <div
            className="nav-link d-flex  align-items-center gap-2"
            style={navItemStyle("/booking")}
            onClick={() => navigate("/booking")}
          >
            <BsBoxSeam size={18} />
            Booking
          </div>
        </li>

        {/* Forms */}
        {/* <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between"
            style={navItemStyle("")}
            onClick={() => toggleSection("form")}
          >
            <div className="d-flex align-items-center gap-2">
              <BsNewspaper size={18} />
              Forms
            </div>
            {openSections.form ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openSections.form && (
            <ul className="list-unstyled ms-3">
              <li className="text-light" style={navItemStyle("/question")} onClick={() => navigate("/question")}>
                <BsFolder /> Question
              </li>
              <li className="text-light" style={navItemStyle("/blogcards")} onClick={() => navigate("/blogcards")}>
                <BsCardList /> Responses
              </li>
            </ul>
          )}
        </li> */}

        {/* Blogs */}
        {/* <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between"
            style={navItemStyle("")}
            onClick={() => toggleSection("blog")}
          >
            <div className="d-flex align-items-center gap-2">
              <BsNewspaper size={18} />
              Blogs
            </div>
            {openSections.blog ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openSections.blog && (
            <ul className="list-unstyled ms-3">
              <li className="text-light" style={navItemStyle("/blogcategories")} onClick={() => navigate("/blogcategories")}>
                <BsFolder /> Blog Categories
              </li>
              <li className="text-light" style={navItemStyle("/blogcards")} onClick={() => navigate("/blogcards")}>
                <BsCardList /> Blog Cards
              </li>
            </ul>
          )}
        </li> */}

        {/* Courses
        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between"
            style={navItemStyle("")}
            onClick={() => toggleSection("preferredPrograms")}
          >
            <div className="d-flex align-items-center gap-2">
              <BsBookmark size={18} />
              All Courses
            </div>
            {openSections.preferredPrograms ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openSections.preferredPrograms && (
            <ul className="list-unstyled ms-3">
              <li className="text-light" style={navItemStyle("/preferred")} onClick={() => navigate("/preferred")}>
                <FaChalkboardTeacher size={14} /> Preferred Programs
              </li>
              <li className="text-light" style={navItemStyle("/course")} onClick={() => navigate("/course")}>
                <BsBookmark size={14} /> All Courses
              </li>
            </ul>
          )}
        </li> */}

        {/* Contact */}
        <li className="nav-item">
          <div
            className="nav-link d-flex  align-items-center gap-2"
            style={navItemStyle("/contactus")}
            onClick={() => navigate("/contactus")}
          >
            <IoMdContact size={18} />
            Contact
          </div>
        </li>

        {/* SEO Pages */}
        {/* <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between"
            style={navItemStyle("")}
            onClick={() => toggleSection("seo")}
          >
            <div className="d-flex align-items-center gap-2">
              <BsBarChart size={18} />
              SEO Pages
            </div>
            {openSections.seo ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {openSections.seo && (
            <ul className="list-unstyled ms-3">
              <li className="text-light" style={navItemStyle("/homeseo")} onClick={() => navigate("/homeseo")}>
                <BiHome size={14} /> Home SEO
              </li>
              <li className="text-light" style={navItemStyle("/aboutusseo")} onClick={() => navigate("/aboutusseo")}>
                <BsInfoCircle size={14} /> AboutUs SEO
              </li>
              <li className="text-light" style={navItemStyle("/CoursesTagSeo")} onClick={() => navigate("/CoursesTagSeo")}>
                <BsBookmark size={14} /> Courses SEO
              </li>
              <li className="text-light" style={navItemStyle("/MetaTagsBlogForm")} onClick={() => navigate("/MetaTagsBlogForm")}>
                <BsNewspaper size={14} /> Blogs SEO
              </li>
              <li className="text-light" style={navItemStyle("/contactusseo")} onClick={() => navigate("/contactusseo")}>
                <IoMdContact size={14} /> ContactUs SEO
              </li> */}
            {/* </ul>
          )} */}
        {/* </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
