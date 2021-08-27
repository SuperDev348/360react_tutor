import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../../360/context/user";
import {
  Button,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { Edit2, Settings, Menu, X } from "react-feather";
import coverImg from "../../../assets/img/profile/user-uploads/cover.jpg";
import profileImg from "../../../assets/img/profile/user-uploads/user-13.jpg";

export default function ProfileHeader({ image, userName }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = React.useContext(UserContext);
  // const [username, setUsername] = useState(user.user.username);
  const toggle = () => {
    isOpen(!isOpen);
  };
  const { id } = useParams();
  return (
    <div className="profile-header mb-2">
      <div className="position-relative">
        <div className="cover-container">
          <img
            src={image}
            alt="CoverImg"
            className="img-fluid bg-cover w-100 rounded-0"
            style={{ height: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="profile-img-container d-flex align-items-center justify-content-between">
          <img
            src={image}
            alt="porfileImg"
            className="img-fluid img-border rounded-circle box-shadow-1"
          />
          <h1
            style={{
              position: "absolute",
              left: "0.4rem",
              bottom: "7rem",
              color: "white",
              size: "25px",
              textTransform: "capitalize",
              textShadow: "4px 4px 2px rgba(0, 0, 0, 0.4)",
            }}
          >
            {userName}
          </h1>
        </div>
      </div>
      <div className="d-flex justify-content-end align-items-center profile-header-nav">
        <Navbar expand="sm" className="w-100 pr-0">
          <NavbarToggler onClick={toggle}>
            {isOpen ? <X size={20} /> : <Menu />}
          </NavbarToggler>
        </Navbar>
      </div>
    </div>
  );
}
