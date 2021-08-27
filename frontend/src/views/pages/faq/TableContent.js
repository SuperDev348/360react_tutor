import React from "react";
import { Card, CardBody } from "reactstrap";
import img1 from "../../../assets/img/portrait/small/avatar-s-1.jpg";
import img2 from "../../../assets/img/portrait/small/avatar-s-2.jpg";
import img3 from "../../../assets/img/portrait/small/avatar-s-3.jpg";
import img4 from "../../../assets/img/portrait/small/avatar-s-4.jpg";
import img5 from "../../../assets/img/portrait/small/avatar-s-5.jpg";

class TableContent extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <h4>Table of Content</h4>

          <h4 className="mt-3">Supporters</h4>
          <div className="supporter-details mt-2">
            <div className="supporter-img d-inline-block">
              <img className="rounded-circle" src={img1} alt="Avatar" />
            </div>
            <div className="supporter-info d-inline-block">
              <div className="font-weight-bold">Boyce Shene</div>
              <small>Web Developer</small>
            </div>
          </div>
          <div className="supporter-details mt-2">
            <div className="supporter-img d-inline-block">
              <img className="rounded-circle" src={img2} alt="Avatar" />
            </div>
            <div className="supporter-info d-inline-block">
              <div className="font-weight-bold">Margie Sevy</div>
              <small>Web Designer</small>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default TableContent;
