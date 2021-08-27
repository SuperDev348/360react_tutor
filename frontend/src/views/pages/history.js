import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";

export default function history() {
  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="History"
        breadCrumbParent="Dashboard"
        breadCrumbActive="History"
      />
      <Row>
        <Col sm="12">
          <h1>history</h1>
        </Col>
      </Row>
    </React.Fragment>
  );
}
