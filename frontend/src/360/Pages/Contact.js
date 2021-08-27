import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import { SettingContext } from '../context/setting';
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import { url } from "../utils/URL";
import Frame from "../Pages/FrameLoginHomePage";
import imaga from "../Assets/shutterstock_571310962.jpg";
import Loading from "../Pages/Loading";
import { Form } from "react-bootstrap";
import swal from "sweetalert";
import style360 from "../style360.css";
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
// import Settings from '../Dashboard/Setting';

import { setFont, media, setButtonColor } from "../styled.js";

//handle user
import { Formik, Field } from "formik";
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

export default function Login() {
  const history = useHistory();

  const { user, userLogin, userLogout, showAlert } = React.useContext(
    UserContext
  );

  const [isMember, setIsMember] = React.useState(true);
  const [admin, setAdmin] = useState("");
  const [loading, setLoading] = useState(false);

  const togelMemeber1 = () => {
    setIsMember(!isMember);
  };

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
        showAlert({
          msg: `Dear customer, thank you for your Email, will contacty you soon`,
          type: "success",
          show: true,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showAlert({
          msg: `Dear customer, there is error, Please try again later`,
          type: "danger",
          show: true,
        });
      });
  };

  React.useEffect(() => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 500);
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Login1>
        <div className="container1">
          <div className="image1">
            <Frame
              image={imaga}
              animation={`property: rotation; from:0 0 0; to: 180 360 0; loop: true; dur: 40000;`}
              zoom="1"
              fov="80"
            />

            <div className="cover1"></div>
            <div className="cover-text">
              <h1
                style={{
                  color: "white",
                }}
              >
                "I am happy to answer any questions."
              </h1>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "10% 10% 10%",
                  // border: "1px solid black",
                  justifyItems: "center",
                  marginTop: "3rem",
                  padding: "1rem",
                  // position: "fixed",
                  // width: "100%",
                  gap: "20px",
                  bottom: "0px",
                  left: "0px",
                  // backgroundColor: "rgba(0, 0, 0, 0.3)",

                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    justifySelf: "center",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `https://www.facebook.com/Walkin360-105284791026132`;
                  }}
                >
                  <Facebook size={40} color="white" />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    justifySelf: "center",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `https://twitter.com/`;
                  }}
                >
                  <Twitter size={40} color="white" />
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    justifySelf: "center",
                  }}
                  onClick={() => history.push("/faq")}
                >
                  <HelpCircle size={40} color="white" />
                </div>
              </div>
            </div>
          </div>

          <div className="login">
            <div className="login-back">
              <div className="title1" style={{ marginTop: "1rem" }}>
                <h1
                //   style={{
                //     color: fontColorpicker,
                //     fontFamily: titleFontFamily,
                //   }}
                >
                  CONTACT US
                </h1>
              </div>

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

                  bookNowHandler(values.clientName, values.email, values.notes);
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
                              onChange={formikProps.handleChange("clientName")}
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
                              rows="3"
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
                      {/* <Row>
                        <Col>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "10% 10% 10%",
                              // border: "1px solid black",
                              justifyItems: "center",
                              marginTop: "3rem",
                              // padding: "rem",
                              // position: "fixed",
                              // width: "100%",
                              gap: "20px",
                              bottom: "0px",
                              left: "0px",
                              backgroundColor: "white",
                              justifyContent: "center",
                            }}
                          >
                            <div
                              style={{
                                cursor: "pointer",
                                justifySelf: "end",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `https://www.facebook.com/Walkin360-105284791026132`;
                              }}
                            >
                              <Facebook size={25} color="#0ca8fd" />
                            </div>
                            <div
                              style={{
                                cursor: "pointer",
                                justifySelf: "center",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = `https://twitter.com/`;
                              }}
                            >
                              <Twitter size={25} color="#0ca8fd" />
                            </div>
                            <div
                              style={{
                                cursor: "pointer",
                                justifySelf: "center",
                              }}
                              onClick={() => history.push("/faq")}
                            >
                              <HelpCircle size={25} color="#0ca8fd" />
                            </div>
                          </div>
                        </Col>
                      </Row> */}
                    </Container>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Login1>
    </>
  );
}

const Login1 = styled.div`
  .container1 {
    margin: 0px;
    display: grid;

    height: 100vh;
    max-width: 100vw;
  }
  .login1 {
    margin-top: 40px;
  }
  .cover1 {
    background: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    opacity: 0.6;
    z-index: 10;
  }
  .cover-text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 30%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 10;
  }
  .cover-text h1 {
    font-size: 40px;
    text-transform: uppercase;
  }
  img {
    height: calc(100vh - 60px);
  }
  .login {
    padding: 1rem 0rem;
    position: relative;
    width: 100%;
    margin-bottom: 0rem;
    background: #e5e5e5;
    height: auto;
  }

  .title1 {
    text-align: center;
  }
  .form1 {
    margin: 1px 0px;
  }
  .form1 h5 {
    ${setFont.slanted};
  }
  .input {
    width: 100%;
    border: 1px solid black;
  }
  input:focus {
    border: 1px solid black;
  }
  label {
    font-size: 20px;
  }
  .text-down {
    white-space: nowrap;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* .button-submit {
    position:absolute;
    bottom:1rem;
    left:50%;
    transform: translate(-50%, -50%);
    text-align: center;
    width:100%;
  } */
  .button-submit {
    text-align: center;
    width: 100%;
    margin-top: 2rem;
  }
  .register-linko {
    white-space: nowrap;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    position: absolute;
    top: 6rem;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .register-link {
    margin-bottom: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .register-linko button {
    background: transparent;
    border: none;
    color: var(--primaryColor);
    text-transform: capitalize;
    font-size: inherit;
    display: inline-block;
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .submit-btn {
    border: none;
    background: ${setButtonColor.black};
    color: white;
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0.5rem;
  }
  ${media.phone`
  .container1{
     grid-template-columns: repeat(1, 1fr);

  }
  .image1{
    position: relative;
    z-index:11111;
    height:100vh;
  }
  .login{
    padding: 1rem 0rem;
    height:auto;
    width: 100%;
    margin-bottom:0.5rem;

  }
     .login-back {
      background: white;
    text-transform: uppercase;
    position: relative;
    left: 50%;
    top: 50%;
    width: 90%;
    height: auto;
    transform: translate(-50%, -50%);
    padding: 2rem;
    margin-bottom:2rem;

  }
  .input {
margin: 1rem 0rem;
padding: 0.5rem;
}
.cover-text{
  position: absolute;
    top:50%;
    left:50%;
    width:90%;

    transform: translate(-50%, -50%);
   color:white;
   text-align:center;

}
  `}
  ${media.tablet`
  .container1{
     grid-template-columns:1fr;
    }
     .input {
    margin: 0.2rem 0rem;
    padding: 7px;
    margin:0.5rem 0rem;

  .login {
    padding: 1rem 0rem;
    position: relative;
    height:auto;
    width: 100%;
    margin-bottom:0rem;

  }
  .image1{
    position: relative;
    z-index:11111;
    height:100vh;
  }
  .cover-text{
  position: absolute;
    top:50%;
    left:50%;
    width:80%;
    transform: translate(-50%, -50%);
   color:white;
   text-align:center;

}
  .login-back {
    background: white;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    height: auto;
    transform: translate(-50%, -50%);
    padding: 2rem;
    margin-bottom:2rem;
  }
  `}
  ${media.desktop`
  .container1{
     grid-template-columns:1fr 1fr;
     .login-back {
    background: white;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    height: 70%;
    transform: translate(-50%, -50%);
    padding: 2rem;
  }
  .image1{
    position: relative;
    z-index:11111;
    height: calc(99vh - 56px);
  }
  .login{
    padding: 3rem 0rem;
    position: relative;
    width: 100%;
    height:auto;
    margin-bottom:0rem;

  }
  .cover-text{
  position: absolute;
    top:50%;
    left:50%;
    width:60%;
    height:30%;
    transform: translate(-50%, -50%);
   color:white;
   text-align:center;

}
  .input {
margin: 1rem 0rem;
padding: 7px;
}
  `}
  ${media.large`
  .container1{
     grid-template-columns:2fr 1fr;
     .login-back {
    background: white;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 80%;
    height: 70%;
    transform: translate(-50%, -50%);
    padding: 2rem;
  }
  .image1{
    position: relative;
    z-index:11111;
    height: calc(99vh - 56px);

  }
  .login{
    padding: 3rem 0rem;
    position: relative;
    width: 100%;
    height:auto;
    margin-bottom:0rem;

  }
  .input {
margin: 0.9rem 0rem;
padding: 7px;
margin:0.5rem 0rem;
}
  `}
`;
