import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

export default function subscription() {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Subscription"
        breadCrumbParent="Dashboard"
        breadCrumbActive="Subscription"
      />
      <Row>
        <Col sm="12">
          <h1>Subscription</h1>
        </Col>
      </Row>
    </React.Fragment>
  );
}
