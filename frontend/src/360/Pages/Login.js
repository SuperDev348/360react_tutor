import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// import { SettingContext } from '../context/setting';
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import { url } from "../utils/URL";
import Frame from "../Pages/FrameLoginHomePage";
import imaga from "../Assets/360i.jpg";
import Loading from "../Pages/Loading";
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
  Badge,
  Col,
  Button,
  Progress,
  FormGroup,
  Label,
} from "reactstrap";
// import Settings from '../Dashboard/Setting';

import { setFont, media, setButtonColor } from "../styled.js";

//handle user
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Container } from "@material-ui/core";
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Email must have proper format"),
  password: yup.string().required("Password is required"),
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
  const [loader, setLoader] = useState(false);
  const [isEditor, setIsEditor] = useState(true);

  const togelMemeber1 = () => {
    setIsMember(!isMember);
  };

  const handleSubmit = async (
    email,
    password,
    username,
    name,
    bio,
    website,
    twitter,
    facebook,
    google,
    linkid,
    instagram,
    isEditor
  ) => {
    if (isMember) {
      // response = await loginUser({ email, password });
      axios
        .post("http://localhost:5000/api/users/login", {
          email,
          password,
        })
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);
            const { token, user } = res.data;
            console.log(token);
            const newUser1 = { token, user };
            userLogin(newUser1);
            swal("Good job!", "Enjoy your time!", "success", {
              button: "OK",
              timer: 1000,
            });
            history.push("/pages/HomePage");
          } else {
            swal(
              "Error!",
              "There is Error, Please try again! Either your login email or password is incorrect",
              "error",
              {
                button: "OK!",
                timer: 6000,
              }
            );
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post("http://localhost:5000/api/users/signup", {
          email,
          password,
          username,
          name,
          bio,
          website,
          twitter,
          facebook,
          google,
          linkid,
          instagram,
          isEditor,
        })
        .then((res) => {
          console.log("response", res);
          const { token, user } = res.data;
          swal(
            "Good job!",
            "Welcome to Walking, Please Login in and enjoy your time!",
            "success",
            {
              button: "Done",
              timer: 6000,
            }
          );
          const newUser1 = { token, user };
          userLogin(newUser1);

          history.push("/");
        })
        .catch((error) => console.log(error));
    }
    // }
  };

  React.useEffect(() => {
    setLoader(true);
    setInterval(() => {
      setLoader(false);
    }, 500);
  }, []);
  if (loader) {
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
                CREATE YOUR OWN TOUR TODAY
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
              <div className="title1">
                {isMember ? <h1>SIGN IN</h1> : <h1>REGISTER</h1>}
              </div>
              <p className="register-linko">
                {isMember ? "Need to register  " : " ALREDY MEMEBER"}
                <button
                  type="button"
                  onClick={togelMemeber1}
                  style={{ color: "#0ca8fd", outline: "none" }}
                >
                  click here
                </button>
              </p>
              <Formik
                initialValues={
                  isMember
                    ? { email: "", password: "" }
                    : { email: "", password: "", username: "" }
                }
                validationSchema={isMember ? loginSchema : signupSchema}
                onSubmit={(values, actions) => {
                  console.log("clicked");
                  console.log(values);
                  handleSubmit(
                    values.email,
                    values.password,
                    values.username,
                    (values.name = ""),
                    (values.bio = ""),
                    (values.website = ""),
                    (values.twitter = ""),
                    (values.facebook = ""),
                    (values.google = ""),
                    (values.linkid = ""),
                    (values.instagram = ""),
                    (values.isEditor = "true")
                  );
                }}
              >
                {(formikProps) => (
                  <div>
                    <Container>
                      <Row>
                        <Col className="pl-0 pr-0 mt-2">
                          <div className="form1">
                            <br />

                            <FormGroup className="has-icon-left form-label-group position-relative">
                              <Field
                                style={{ border: "1px solid black" }}
                                type="email"
                                id="nameFloatingIcons"
                                placeholder="Insert your mail"
                                value={formikProps.values.email}
                                className="input"
                                onChange={formikProps.handleChange("email")}
                                onBlur={formikProps.handleBlur("email")}
                                className="form-control"
                              />
                              <div className="form-control-position">
                                <Mail size={20} />
                              </div>

                              <Label for="title">Mail</Label>

                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "5px",
                                }}
                              >
                                {formikProps.touched.email &&
                                  formikProps.errors.email}
                              </div>
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pl-0 pr-0 mt-1">
                          <div className="form1">
                            <br />
                            <FormGroup className="has-icon-left form-label-group position-relative">
                              <Field
                                style={{ border: "1px solid black" }}
                                type="password"
                                id="nameFloatingIcons"
                                placeholder="Insert your Password"
                                value={formikProps.values.password}
                                onChange={formikProps.handleChange("password")}
                                onBlur={formikProps.handleBlur("password")}
                                className="form-control"
                              />
                              <div className="form-control-position">
                                <Lock size={20} />
                              </div>

                              <Label for="title">Password</Label>
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  marginTop: "5px",
                                }}
                              >
                                {formikProps.touched.password &&
                                  formikProps.errors.password}
                              </div>
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                    {!isMember && (
                      <div className="form1">
                        <br />
                        <Container>
                          <Row>
                            <Col className="pl-0 pr-0 mt-2">
                              <FormGroup className="has-icon-left form-label-group position-relative">
                                <Field
                                  style={{ border: "1px solid black" }}
                                  type="username"
                                  id="nameFloatingIcons"
                                  placeholder="Insert your Username"
                                  value={formikProps.values.username}
                                  onChange={formikProps.handleChange(
                                    "username"
                                  )}
                                  onBlur={formikProps.handleBlur("username")}
                                  className="form-control"
                                />
                                <div className="form-control-position">
                                  <User size={20} />
                                </div>

                                <Label for="title">Username</Label>
                                <div style={{ color: "red", fontSize: "12px" }}>
                                  {formikProps.touched.username &&
                                    formikProps.errors.username}
                                </div>
                                <span
                                  style={{
                                    padding: "2rem 0rem",
                                    fontSize: "9px",
                                    textAlign: "center",
                                  }}
                                >
                                  the username will be your main name
                                </span>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    )}

                    <div className="button-submit">
                      <Container>
                        <Row>
                          <Col className="pl-0 pr-0 mt-1">
                            <div className="btn-full-width">
                              <button
                                className="mr-1 mb-1 bg-gradient-primary"
                                color="primary"
                                size="lg"
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
                                onClick={formikProps.handleSubmit}
                              >
                                SUBMIT{" "}
                                <Send
                                  size={15}
                                  style={{ marginLeft: "10px" }}
                                ></Send>
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
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
