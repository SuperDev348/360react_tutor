import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

export default function payments() {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Payments"
        breadCrumbParent="Dashboard"
        breadCrumbActive="Payments"
      />
      <Row>
        <Col sm="12">
          <h1>payments</h1>
        </Col>
      </Row>
    </React.Fragment>
  );
}
