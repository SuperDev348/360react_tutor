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
import { Facebook } from "react-feather";

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
                  href="/contactus"
                  style={{
                    color: "white",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    paddingLeft: "25px",
                  }}
                >
                  Contact
                </Nav.Link>
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
  .whole {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .bg-dark {
    /* background-color: transparent !important; */
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
  .navbar-dark .navbar-toggler {
    border: none !important;
  }
`;
