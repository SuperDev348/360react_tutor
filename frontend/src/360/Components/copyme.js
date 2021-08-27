import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumpVirtualTour";
import ExtensionsHeader from "./extensionsHeader";
import { ProductContext } from "../context/products";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Input,
} from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/plugins/extensions/toastr.scss";

export default function Copyme() {
  const { products } = React.useContext(ProductContext);
  const location = useLocation();
  const { prooduct } = location.state;
  // const id = prooduct.filter((item) => item.id);
  console.log(prooduct.id);

  // console.log(id);
  const [value, setValue] = useState(
    `http://localhost:3000/places/${prooduct.id}`
  );
  const [value1, setValue1] = useState(
    `<a target="_blank" rel="noopener" href="http://localhost:3000/places/${prooduct.id}">Visit, ${prooduct.title} 360 Virtual Tour </a>`
  );

  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState([]);

  const handleCopy = ({ target: { value } }) => {
    setCopied(false);
  };

  const onCopy = () => {
    setCopied(true);
    toast.success("Text Copied Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <div>
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle={prooduct.title}
          breadCrumbParent="Virtual Tours"
          breadCrumbActive={prooduct.title}
        />

        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Short Url</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="2" sm="12" className="pr-md-0 mb-1">
                    <Input value={value} onChange={handleCopy} />
                  </Col>
                  <Col md="2" sm="12" className="mb-1">
                    <CopyToClipboard onCopy={onCopy} text={value}>
                      <Button.Ripple color="primary">
                        COPY URL LINK
                      </Button.Ripple>
                    </CopyToClipboard>
                    <ToastContainer />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Html Link</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="2" sm="12" className="pr-md-0 mb-1">
                    <Input value={value1} onChange={handleCopy} />
                  </Col>
                  <Col md="2" sm="12" className="mb-1">
                    <CopyToClipboard onCopy={onCopy} text={value1}>
                      <Button.Ripple color="primary">
                        COPY URL LINK
                      </Button.Ripple>
                    </CopyToClipboard>
                    <ToastContainer />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* SIZE */}

        {/* SIZE */}
      </React.Fragment>
    </div>
  );
}
