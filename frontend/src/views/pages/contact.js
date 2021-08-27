import React, { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb";
import axios from "axios";
import { url } from "../../360/utils/URL";
import imago from "../../assets/img/profile/user-uploads/user-03.jpg";
import { Form } from "react-bootstrap";
import { Formik, Field } from "formik";
import {
  Check,
  User,
  Mail,
  Key,
  Smartphone,
  Lock,
  FileText,
  Type,
  UploadCloud,
  CheckCircle,
  Send,
  Facebook,
  Twitter,
  HelpCircle,
} from "react-feather";
import {
  Card,
  CardBody,
  CardImg,
  Row,
  Container,
  Badge,
  Col,
  Button,
  Progress,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import * as yup from "yup";
const bookingFormSchema = yup.object({
  clientName: yup
    .string()
    .required("Client name is required")
    .min(7, "Too Short!")
    .max(25, "Too Long!"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email should have proper format"),
  notes: yup
    .string()
    .required("Notes is required")
    .min(10, "Too Short!")
    .max(500, "Too Long!"),
});

const signupSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must have proper format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Too Short!")
    .max(25, "Too Long!"),
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Too Short!")
    .max(10, "Too Long!"),
  name: yup.string(),
  bio: yup.string(),
  website: yup.string(),
  twitter: yup.string(),
  facebook: yup.string(),
  google: yup.string(),
  linkid: yup.string(),
  instagram: yup.string(),
});
export default function Contactus() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const bookNowHandler = (clientName, email, notes) => {
    setLoading(true);
    axios
      .post(`${url}/sendemail`, {
        clientName,
        email,
        notes,
        subject: "Customer query, from contact form",
      })
      .then((res) => {
        console.log(res);
        // showAlert({
        //   msg: `Dear customer, thank you for your Email, will contacty you soon`,
        //   type: "success",
        //   show: true,
        // });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        // showAlert({
        //   msg: `Dear customer, there is error, Please try again later`,
        //   type: "danger",
        //   show: true,
        // });
      });
  };

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbTitle="Contact us"
        breadCrumbParent="Dashboard"
        breadCrumbActive="Contact us"
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
      >
        <div>
          <Card className="p-3">
            <Row>
              <Col sm="12">
                <Formik
                  initialValues={{
                    clientName: "",

                    email: "",
                    notes: "",
                  }}
                  validationSchema={bookingFormSchema}
                  onSubmit={(values, actions) => {
                    console.log("clicked");
                    console.log(values);

                    bookNowHandler(
                      values.clientName,
                      values.email,
                      values.notes
                    );
                  }}
                >
                  {(formikProps) => (
                    <Form>
                      <Container>
                        <Row>
                          <Col className="pl-0 pr-0 mt-2">
                            <FormGroup className="has-icon-left form-label-group position-relative">
                              {/* <div
                              className="ttextfiedl"
                              noValidate
                              autoComplete="off"
                            > */}
                              <Field
                                className="input"
                                style={{ border: "1px solid black" }}
                                className="form-control"
                                maxLength={20}
                                required
                                type="text"
                                placeholder="YOUR NAME"
                                onChange={formikProps.handleChange(
                                  "clientName"
                                )}
                                value={formikProps.values.clientName}
                                onBlur={formikProps.handleBlur("clientName")}
                              />
                              <div className="form-control-position">
                                <Type size={20} />
                              </div>

                              <Label for="title">NAME</Label>
                              {/* </div> */}
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "10px",
                                  marginTop: "5px",
                                }}
                              >
                                {formikProps.touched.clientName &&
                                  formikProps.errors.clientName}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="pl-0 pr-0 mt-2">
                            <FormGroup className="has-icon-left form-label-group position-relative">
                              <Field
                                className="input"
                                style={{ border: "1px solid black" }}
                                className="form-control"
                                required
                                type="email"
                                placeholder="elias@hotamil.com"
                                onChange={formikProps.handleChange("email")}
                                value={formikProps.values.email}
                                onBlur={formikProps.handleBlur("email")}
                              />
                              <div className="form-control-position">
                                <Mail size={20} />
                              </div>

                              <Label for="title">EMAIL</Label>
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "10px",
                                  marginTop: "5px",
                                }}
                              >
                                {formikProps.touched.email &&
                                  formikProps.errors.email}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="pl-0 pr-0 mt-2">
                            <FormGroup className="has-icon-left form-label-group position-relative">
                              {/* <Form.Control
                              className="input"
                              as="textarea"
                              maxLength={250}
                              placeholder="clients want ..."
                              rows="2"
                              value={formikProps.values.notes}
                              onChange={formikProps.handleChange("notes")}
                              onBlur={formikProps.handleBlur("notes")}
                            /> */}

                              <Input
                                name="title"
                                type="textarea"
                                rows="5"
                                id="nameFloatingIcons"
                                placeholder="How to create 360 tour"
                                rows="2"
                                value={formikProps.values.notes}
                                onChange={formikProps.handleChange("notes")}
                                onBlur={formikProps.handleBlur("notes")}
                                style={{ border: "1px solid black" }}
                              />
                              <div className="form-control-position">
                                <FileText size={20} />
                              </div>

                              <Label for="title">Title</Label>
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "10px",
                                  marginTop: "5px",
                                }}
                              >
                                {formikProps.touched.notes &&
                                  formikProps.errors.notes}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="pl-0 pr-0 mt-2">
                            <button
                              className="mr-1 mb-1 bg-gradient-primary"
                              style={{
                                width: "100%",
                                border: "none",
                                backgroundColor: "#0ca8fd",
                                color: "white",
                                // position: "sticky",
                                bottom: "0px",
                                padding: "15px 10px",
                                // margin: "20px 0px",
                                zIndex: "4",
                                left: "1rem",
                                borderRadius: "5px",
                                outline: "none",
                              }}
                              size="lg"
                              // className="submit-btn"
                              // style={{ background: btnColor }}
                              onClick={formikProps.handleSubmit}
                            >
                              <h5
                                style={{
                                  color: "white",

                                  margin: "0 auto",
                                }}
                              >
                                SEND
                              </h5>
                            </button>
                          </Col>
                        </Row>
                      </Container>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Card>
        </div>

        <div>
          <Card className="p-4">
            <h1
              className="mb-2"
              style={{ textTransform: "uppercase", color: "#0ca8fd" }}
            >
              Need support{" "}
            </h1>
            <hr />
            <p className="mt-2 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              euismod quis massa at rutrum. Vivamus maximus velit id ex tempor
              euismod. Vivamus ac odio efficitur, placerat odio eu, tempus
              tortor. Vestibulum condimentum lobortis nisi, a semper ante
              ullamcorper quis. Nam porta tincidunt dignissim. Proin vehicula
              dui non pharetra laoreet. Donec eget egestas felis. Donec
              facilisis lacus vitae purus pulvinar, venenatis gravida dolor
              aliquam. Praesent turpis ipsum, blandit vel feugiat at, egestas id
              neque. Vivamus ultrices sem sit amet nisl ultricies, tempus
              pretium erat lobortis. Duis in mauris id nisl posuere tristique
              eget eget felis.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "10% 10% 10%",
                // border: "1px solid black",
                justifyItems: "start",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `https://www.facebook.com/Walkin360-105284791026132`;
                }}
              >
                <Facebook size={30} color="#0ca8fd" />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `https://twitter.com/`;
                }}
              >
                <Twitter size={30} color="#0ca8fd" />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/faq")}
              >
                <HelpCircle size={30} color="#0ca8fd" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}
