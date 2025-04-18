import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Slottime from "../Booking/slottime";
import BookingSlot from "../Booking/BookingSlot";
import Staticlayout from "../layout/StaticLayout";
import Contact from "../ContactPage/Contact";

const UserRoute = [
  {
    path: "/",
    element: <Login />,
  },
  // {
  //   path: "/home",
  //   element: (
  //     <Staticlayout>
  //       <Home />
  //     </Staticlayout>
  //   ),
  // },
  {
    path: "/slot",
    element: (
      <Staticlayout>
        <Slottime />
      </Staticlayout>
    ),
  },
  {
    path: "/booking",
    element: (
      <Staticlayout>
        <BookingSlot />
      </Staticlayout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Staticlayout>
        <Contact />
      </Staticlayout>
    ),
  },
];

export default UserRoute;
