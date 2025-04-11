import React, { Children } from "react";
import { Col, Row } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

function Staticlayout({ children }) {
  return (
    <div className="">
      <Row>
        <Col md={2}>
          <Sidebar />
        </Col>

        <Col md={10}>{children}</Col>
      </Row>
      {/* <Sidebar/>
      <div className="">{children}</div> */}
    </div>
  );
}

export default Staticlayout;
