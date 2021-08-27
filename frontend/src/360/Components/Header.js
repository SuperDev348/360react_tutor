import React from "react";
import { Link, useHistory } from "react-router-dom";
import LoginLink from "./LoginLink";
import { UserContext } from "../context/user";
import avatarImg from "../../assets/img/portrait/small/avatar-s-20.jpg";
import Logo from "../Assets/logo.png";
import { media } from "../styled";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { Facebook,Mail, Home } from "react-feather";

import styled from "styled-components";
export default function Header() {
  const {
    user,
    userLogin,
    userLogout,
    alert,
    showAlert,
    hideAlert,
  } = React.useContext(UserContext);
  const history = useHistory();
  return (
    <>
      <Whole>
        <div className="whole">
          <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
            <Navbar.Brand href="/">
              <img
                src={Logo}
                className="brandnew"
                style={{ width: "120px", padding: "0px 0px" }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              
                <Nav.Link
                  justify="false"
                  href="/alltours"
                  style={{
                    color: "white",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    paddingLeft: "5px",
                  }}
                >
                  EXPLORE 360
                </Nav.Link>
              </Nav>

              <Nav>
              

                {user.user && user.user.isEditor && (
                  <Nav.Link
                  className="btno"
                    style={{
                      color: "white",
                      fontSize: "15px",
                      textTransform: "uppercase",
                      marginRight:'5px'
                    }}
                    href="/pages/HomePage"
                    //   style={{ color: headerFontColor, fontFamily: headerFontFamily }}
                  >
                   <Home />
                  </Nav.Link>
                )}
                          <Nav.Link
                  justify="false"
                  className="btno"
                  href="/contactus"
                  style={{
                    color: "white",
                    fontSize: "13px",
                    textTransform: "uppercase",
           
                  }}
                >
                  <Mail/>
                </Nav.Link>
             <Nav.Link
                 className="btno"
                  href="/login"
                  // style={{ color: headerFontColor, fontFamily: headerFontFamily }}
                >
                  <LoginLink />
                </Nav.Link>
      
                {user.user && (
                  <div>
                    <img
                      src={user.user.image}
                      alt=""
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "30px",
                        marginLeft: "6px",
                        paddingLeft: "0px",
                        cursor: "pointer",
                        border: "0px solid white",
                      }}
                      onClick={() => history.push("/pages/HomePage")}
                    />
                  </div>
                )}
                {/* <Nav.Link
                href=""
                //   style={{ color: headerFontColor, fontFamily: headerFontFamily }}
              >
                <Facebook color="white" />
              </Nav.Link> */}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </Whole>
    </>
  );
}
const Whole = styled.div`
.btno:hover{
 width:auto;
 height:auto;
 background-color:rgba(0, 0, 0, 0.2);
 
 border-radius:50%;


}
  .navbar-dark .navbar-toggler {
    border: none !important;
  }
`;
