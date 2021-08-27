import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

export default function myacount() {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="My Account"
        breadCrumbParent="Dashboard"
        breadCrumbActive="My Account"
      />
      <Row>
        <Col sm="12">
          <h1>My Account</h1>
        </Col>
      </Row>
    </React.Fragment>
  );
}
