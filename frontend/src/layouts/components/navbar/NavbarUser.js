import React from "react";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Media,
  Badge,
  Button,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import * as Icon from "react-feather";
import classnames from "classnames";
import Autocomplete from "../../../components/@vuexy/autoComplete/AutoCompleteComponent";
import { history } from "../../../history";
import { UserContext } from "../../../360/context/user";
import styled from "styled-components";
const UserDropdown = (props) => {
  const { user, userLogin, userLogout } = React.useContext(UserContext);

  console.log(user);
  return (
    <Nav>
      <DropdownMenu right>
        <div className="edit">
          <DropdownItem
            tag="a"
            href="#"
            onClick={() => {
              history.push("/myacount");
            }}
          >
            <Icon.User size={14} className="mr-50" />
            <span className="align-middle">Edit Profile</span>
          </DropdownItem>
        </div>
        <DropdownItem divider />
        <DropdownItem
          onClick={() => {
            history.push("/");
            userLogout();
          }}
        >
          <Icon.Power size={14} className="mr-50" />
          <span className="align-middle">Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Nav>
  );
};

class NavbarUser extends React.PureComponent {
  state = {
    navbarSearch: false,
    suggestions: [],
  };

  componentDidMount() {
    axios.get("/api/main-search/data").then(({ data }) => {
      this.setState({ suggestions: data.searchResult });
    });
  }

  handleNavbarSearch = () => {
    this.setState({
      navbarSearch: !this.state.navbarSearch,
    });
  };

  render() {
    return (
      <ul className="nav navbar-nav navbar-nav-user float-right">
        <UncontrolledDropdown
          tag="li"
          className="dropdown-notification nav-item"
        ></UncontrolledDropdown>
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
          <DropdownToggle tag="a" className="nav-link dropdown-user-link">
            <div className="user-nav d-sm-flex d-none">
              <span
                className="user-name text-bold-600"
                style={{ textTransform: "capitalize" }}
              >
                {this.props.userName}
              </span>
              <span className="user-status">Available</span>
            </div>
            <span data-tour="user">
              <img
                src={this.props.userImg}
                className="round"
                height="40"
                width="40"
                alt="avatar"
              />
            </span>
          </DropdownToggle>
          <UserDropdown {...this.props} />
        </UncontrolledDropdown>
      </ul>
    );
  }
}

export default NavbarUser;

const Nav = styled.div`
  .edit {
  }
  .edit:hover {
  }
`;
